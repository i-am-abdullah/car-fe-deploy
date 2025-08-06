'use client';

import { useState, useEffect } from 'react';
import { Container } from '@mantine/core';
import { DataTable } from '@/components/DataTable/DataTable';
import { CreateModal } from '@/components/modals/CreateModal';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import { get, post, del } from '@/utils/api';
import toast from 'react-hot-toast';

interface RegistrationCity {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
}

export default function RegistrationCitiesPage() {
    const [cities, setCities] = useState<RegistrationCity[]>([]);
    const [loading, setLoading] = useState(true);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState<{ open: boolean; item: RegistrationCity | null }>({
        open: false,
        item: null,
    });
    const [submitting, setSubmitting] = useState(false);

    const loadCities = async () => {
        try {
            setLoading(true);
            const data = await get<RegistrationCity[]>('/registration-cities');
            setCities(data);
        } catch (error) {
            toast.error(`Failed to load registration cities: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCities();
    }, []);

    const handleCreate = async (data: any, isBulk: boolean) => {
        try {
            setSubmitting(true);
            if (isBulk) {
                const { bulkItems } = data;

                // Filter out empty items and ensure they have names
                const validCities = bulkItems
                    .filter((item: any) => item.name && item.name.trim())
                    .map((item: any) => ({
                        name: item.name.trim()
                    }));

                if (validCities.length === 0) {
                    toast.error('Please provide at least one city name');
                    return;
                }

                // Create cities one by one since there's no bulk endpoint
                const createPromises = validCities.map((city: any) =>
                    post('/registration-cities', { data: city })
                );

                await Promise.all(createPromises);
                toast.success(`${validCities.length} registration cities created successfully`);
            } else {
                // Single creation
                if (!data.name || !data.name.trim()) {
                    toast.error('Please provide a city name');
                    return;
                }

                await post('/registration-cities', {
                    data: {
                        name: data.name.trim()
                    }
                });
                toast.success('Registration city created successfully');
            }
            await loadCities();
        } catch (error) {
            console.error('Create registration city error:', error);
            toast.error('Failed to create registration city/cities');
            throw error;
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteModal.item) return;

        try {
            setSubmitting(true);
            await del(`/registration-cities/${deleteModal.item.id}`);
            toast.success('Registration city deleted successfully');
            await loadCities();
            setDeleteModal({ open: false, item: null });
        } catch (error) {
            toast.error(`Failed to delete registration city: ${error}`);
        } finally {
            setSubmitting(false);
        }
    };

    const columns = [
        { key: 'name', label: 'City Name' },
        {
            key: 'created_at',
            label: 'Created At',
            render: (item: RegistrationCity) => new Date(item.created_at).toLocaleDateString()
        },
    ];

    return (
        <Container size="xl" py="md">
            <DataTable
                data={cities}
                columns={columns}
                title="Registration Cities"
                loading={loading}
                onCreate={() => setCreateModalOpen(true)}
                onDelete={(item) => setDeleteModal({ open: true, item })}
            />

            <CreateModal
                opened={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                title="Create Registration City"
                entityType="city"
                onSubmit={handleCreate}
                loading={submitting}
            />

            <ConfirmModal
                opened={deleteModal.open}
                onClose={() => setDeleteModal({ open: false, item: null })}
                onConfirm={handleDelete}
                title="Delete Registration City"
                message={`Are you sure you want to delete "${deleteModal.item?.name}"? This action cannot be undone.`}
                loading={submitting}
            />
        </Container>
    );
}
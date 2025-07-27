'use client';

import { useState, useEffect } from 'react';
import { Container } from '@mantine/core';
import { DataTable } from '@/components/DataTable/DataTable';
import { CreateModal } from '@/components/modals/CreateModal';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import { useCarApi } from '@/hooks/userCarApi';
import { CarMake } from '@/types/car';
import toast from 'react-hot-toast';

export default function MakesPage() {
  const [makes, setMakes] = useState<CarMake[]>([]);
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; item: CarMake | null }>({
    open: false,
    item: null,
  });
  const [submitting, setSubmitting] = useState(false);

  const api = useCarApi();

  const loadMakes = async () => {
    try {
      setLoading(true);
      const data = await api.fetchMakes();
      setMakes(data);
    } catch (error) {
      toast.error('Failed to load makes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMakes();
  }, []);

  const handleCreate = async (data: any, isBulk: boolean) => {
    try {
      setSubmitting(true);
      if (isBulk) {
        // Fixed: Handle bulk data structure correctly
        const { bulkItems } = data;
        
        // Filter out empty items and ensure they have names
        const validMakes = bulkItems
          .filter((item: any) => item.name && item.name.trim())
          .map((item: any) => item.name.trim());
        
        if (validMakes.length === 0) {
          toast.error('Please provide at least one make name');
          return;
        }

        await api.bulkCreateMakes(validMakes);
        toast.success(`${validMakes.length} makes created successfully`);
      } else {
        // Single creation
        if (!data.name || !data.name.trim()) {
          toast.error('Please provide a make name');
          return;
        }
        
        await api.createMake(data);
        toast.success('Make created successfully');
      }
      await loadMakes();
    } catch (error) {
      console.error('Create make error:', error);
      toast.error('Failed to create make(s)');
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.item) return;

    try {
      setSubmitting(true);
      await api.deleteMake(deleteModal.item.id);
      toast.success('Make deleted successfully');
      await loadMakes();
      setDeleteModal({ open: false, item: null });
    } catch (error) {
      toast.error('Failed to delete make');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { 
      key: 'created_at', 
      label: 'Created At',
      render: (item: CarMake) => new Date(item.created_at).toLocaleDateString()
    },
  ];

  return (
    <Container size="xl" py="md">
      <DataTable
        data={makes}
        columns={columns}
        title="Car Makes"
        loading={loading}
        onCreate={() => setCreateModalOpen(true)}
        onDelete={(item) => setDeleteModal({ open: true, item })}
      />

      <CreateModal
        opened={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Create Car Make"
        entityType="make"
        onSubmit={handleCreate}
        loading={submitting}
      />

      <ConfirmModal
        opened={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, item: null })}
        onConfirm={handleDelete}
        title="Delete Make"
        message={`Are you sure you want to delete "${deleteModal.item?.name}"? This action cannot be undone.`}
        loading={submitting}
      />
    </Container>
  );
}
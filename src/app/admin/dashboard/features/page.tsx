'use client';

import { useState, useEffect } from 'react';
import { Container } from '@mantine/core';
import { DataTable } from '@/components/DataTable/DataTable';
import { CreateModal } from '@/components/modals/CreateModal';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import { get, post, del } from '@/utils/api';
import toast from 'react-hot-toast';

interface Feature {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function FeaturesPage() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; item: Feature | null }>({
    open: false,
    item: null,
  });
  const [submitting, setSubmitting] = useState(false);

  const loadFeatures = async () => {
    try {
      setLoading(true);
      const data = await get<Feature[]>('/features');
      setFeatures(data);
    } catch (error) {
      toast.error(`Failed to load features: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeatures();
  }, []);

  const handleCreate = async (data: any, isBulk: boolean) => {
    try {
      setSubmitting(true);
      if (isBulk) {
        const { bulkItems } = data;
        
        // Filter out empty items and ensure they have names
        const validFeatures = bulkItems
          .filter((item: any) => item.name && item.name.trim())
          .map((item: any) => ({
            name: item.name.trim(),
            is_active: item.is_active !== undefined ? item.is_active : true
          }));
        
        if (validFeatures.length === 0) {
          toast.error('Please provide at least one feature name');
          return;
        }

        await post('/features/bulk', { data: validFeatures });
        toast.success(`${validFeatures.length} features created successfully`);
      } else {
        // Single creation
        if (!data.name || !data.name.trim()) {
          toast.error('Please provide a feature name');
          return;
        }
        
        await post('/features', { 
          data: {
            name: data.name.trim(),
            is_active: data.is_active !== undefined ? data.is_active : true
          }
        });
        toast.success('Feature created successfully');
      }
      await loadFeatures();
    } catch (error) {
      console.error('Create feature error:', error);
      toast.error('Failed to create feature(s)');
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.item) return;

    try {
      setSubmitting(true);
      await del(`/features/${deleteModal.item.id}`);
      toast.success('Feature deleted successfully');
      await loadFeatures();
      setDeleteModal({ open: false, item: null });
    } catch (error) {
      toast.error(`Failed to delete feature: ${error}`);
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { 
      key: 'is_active', 
      label: 'Status',
      render: (item: Feature) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.is_active 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {item.is_active ? 'Active' : 'Inactive'}
        </span>
      )
    },
    { 
      key: 'created_at', 
      label: 'Created At',
      render: (item: Feature) => new Date(item.created_at).toLocaleDateString()
    },
  ];

  return (
    <Container size="xl" py="md">
      <DataTable
        data={features}
        columns={columns}
        title="Car Features"
        loading={loading}
        onCreate={() => setCreateModalOpen(true)}
        onDelete={(item) => setDeleteModal({ open: true, item })}
      />

      <CreateModal
        opened={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Create Car Feature"
        entityType="feature"
        onSubmit={handleCreate}
        loading={submitting}
      />

      <ConfirmModal
        opened={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, item: null })}
        onConfirm={handleDelete}
        title="Delete Feature"
        message={`Are you sure you want to delete "${deleteModal.item?.name}"? This action cannot be undone.`}
        loading={submitting}
      />
    </Container>
  );
}
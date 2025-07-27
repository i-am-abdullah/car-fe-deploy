'use client';

import { useState, useEffect } from 'react';
import { Container } from '@mantine/core';
import { DataTable } from '@/components/DataTable/DataTable';
import { CreateModal } from '@/components/modals/CreateModal';
import { FilterModal } from '@/components/modals/FilterModal';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import { useCarApi } from '@/hooks/userCarApi';
import toast from 'react-hot-toast';
import { CarMake, CarModel } from '@/types/car';

export default function ModelsPage() {
  const [models, setModels] = useState<CarModel[]>([]);
  const [makes, setMakes] = useState<CarMake[]>([]);
  const [filteredModels, setFilteredModels] = useState<CarModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; item: CarModel | null }>({
    open: false,
    item: null,
  });
  const [submitting, setSubmitting] = useState(false);

  const api = useCarApi();

  const loadData = async () => {
    try {
      setLoading(true);
      const [modelsData, makesData] = await Promise.all([
        api.fetchModels(),
        api.fetchMakes(),
      ]);
      setModels(modelsData);
      setMakes(makesData);
      setFilteredModels(modelsData);
    } catch (error) {
      toast.error(`Failed to load data: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (data: any, isBulk: boolean) => {
    try {
      setSubmitting(true);
      if (isBulk) {
        // Fixed: Handle bulk data structure correctly
        const { makeId, bulkItems } = data;
        
        // Filter out empty items and ensure they have names
        const validModels = bulkItems.filter((item: any) => item.name && item.name.trim());
        
        if (validModels.length === 0) {
          toast.error('Please provide at least one model name');
          return;
        }

        if (!makeId) {
          toast.error('Please select a make for bulk creation');
          return;
        }

        await api.bulkCreateModels(makeId, validModels);
        toast.success(`${validModels.length} models created successfully`);
      } else {
        // Single creation
        if (!data.name || !data.name.trim()) {
          toast.error('Please provide a model name');
          return;
        }
        if (!data.makeId) {
          toast.error('Please select a make');
          return;
        }
        
        await api.createModel(data);
        toast.success('Model created successfully');
      }
      await loadData();
    } catch (error) {
      console.error('Create model error:', error);
      toast.error('Failed to create model(s)');
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.item) return;

    try {
      setSubmitting(true);
      await api.deleteModel(deleteModal.item.id);
      toast.success('Model deleted successfully');
      await loadData();
      setDeleteModal({ open: false, item: null });
    } catch (error) {
      toast.error(`Failed to delete model: ${error}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFilter = async (filters: any) => {
    try {
      if (filters.makeId) {
        const filtered = await api.fetchModelsByMake(filters.makeId);
        setFilteredModels(filtered);
      } else {
        setFilteredModels(models);
      }
    } catch (error) {
      toast.error(`Failed to apply filters: ${error}`);
    }
  };

  const makeOptions = makes.map((make) => ({
    value: make.id,
    label: make.name,
  }));

  const columns = [
    { key: 'name', label: 'Name' },
    { 
      key: 'make', 
      label: 'Make',
      render: (item: CarModel) => item.make.name
    },
    { 
      key: 'created_at', 
      label: 'Created At',
      render: (item: CarModel) => new Date(item.created_at).toLocaleDateString()
    },
  ];

  return (
    <Container size="xl" py="md">
      <DataTable
        data={filteredModels}
        columns={columns}
        title="Car Models"
        loading={loading}
        hasFilters={true}
        onCreate={() => setCreateModalOpen(true)}
        onFilter={() => setFilterModalOpen(true)}
        onDelete={(item) => setDeleteModal({ open: true, item })}
      />

      <CreateModal
        opened={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Create Car Model"
        entityType="model"
        onSubmit={handleCreate}
        makeOptions={makeOptions}
        loading={submitting}
      />

      <FilterModal
        opened={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApply={handleFilter}
        filterType="model"
        makeOptions={makeOptions}
      />

      <ConfirmModal
        opened={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, item: null })}
        onConfirm={handleDelete}
        title="Delete Model"
        message={`Are you sure you want to delete "${deleteModal.item?.name}"? This action cannot be undone.`}
        loading={submitting}
      />
    </Container>
  );
}
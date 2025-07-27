'use client';

import { useState, useEffect } from 'react';
import { Container } from '@mantine/core';
import { DataTable } from '@/components/DataTable/DataTable';
import { CreateModal } from '@/components/modals/CreateModal';
import { FilterModal } from '@/components/modals/FilterModal';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import { useCarApi } from '@/hooks/userCarApi';
import toast from 'react-hot-toast';
import { CarMake, CarModel, CarYear } from '@/types/car';

export default function YearsPage() {
  const [years, setYears] = useState<CarYear[]>([]);
  const [makes, setMakes] = useState<CarMake[]>([]);
  const [filteredYears, setFilteredYears] = useState<CarYear[]>([]);
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; item: CarYear | null }>({
    open: false,
    item: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<any>({});
  
  // Separate states for create modal
  const [createModels, setCreateModels] = useState<CarModel[]>([]);
  const [createMakeSelected, setCreateMakeSelected] = useState<string>('');
  const [loadingCreateModels, setLoadingCreateModels] = useState(false);

  // Separate states for filter modal
  const [filterModels, setFilterModels] = useState<CarModel[]>([]);
  const [filterLoadingModels, setFilterLoadingModels] = useState(false);

  const api = useCarApi();

  const loadData = async () => {
    try {
      setLoading(true);
      const [yearsData, makesData] = await Promise.all([
        api.fetchYears(),
        api.fetchMakes(),
      ]);
      setYears(yearsData);
      setMakes(makesData);
      setFilteredYears(yearsData);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Function to fetch models for create modal when make is selected
  const handleCreateMakeChange = async (makeId: string) => {
    setCreateMakeSelected(makeId);
    setCreateModels([]); // Clear previous models
    
    if (!makeId) {
      return;
    }

    try {
      setLoadingCreateModels(true);
      const modelsData = await api.fetchModelsByMake(makeId);
      setCreateModels(modelsData);
    } catch (error) {
      toast.error('Failed to load models for selected make');
      setCreateModels([]);
    } finally {
      setLoadingCreateModels(false);
    }
  };

  // Function to fetch models for filter modal when make is selected
  const handleFilterMakeChange = async (makeId: string) => {
    setFilterModels([]); // Clear previous models
    
    if (!makeId) {
      return;
    }

    try {
      setFilterLoadingModels(true);
      const modelsData = await api.fetchModelsByMake(makeId);
      setFilterModels(modelsData);
    } catch (error) {
      toast.error('Failed to load models for filter');
      setFilterModels([]);
    } finally {
      setFilterLoadingModels(false);
    }
  };

  const handleCreate = async (data: any, isBulk: boolean) => {
    try {
      setSubmitting(true);
      if (isBulk) {
        // For bulk creation, data structure should be:
        // { makeId, modelId, bulkItems: [...] }
        const { makeId, modelId, bulkItems } = data;
        const yearNumbers = bulkItems
          .filter((item: any) => item.year)
          .map((item: any) => item.year);
        
        await api.bulkCreateYears(makeId, modelId, yearNumbers);
        toast.success(`${yearNumbers.length} years created successfully`);
      } else {
        await api.createYear(data);
        toast.success('Year created successfully');
      }
      await loadData();
    } catch (error) {
      toast.error('Failed to create year(s)');
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.item) return;

    try {
      setSubmitting(true);
      await api.deleteYear(deleteModal.item.id);
      toast.success('Year deleted successfully');
      await loadData();
      setDeleteModal({ open: false, item: null });
    } catch (error) {
      toast.error('Failed to delete year');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFilter = async (filters: any) => {
    try {
      setCurrentFilters(filters);
      if (filters.makeId && filters.modelId) {
        const filtered = await api.fetchYearsByMakeAndModel(filters.makeId, filters.modelId);
        setFilteredYears(filtered);
      } else {
        setFilteredYears(years);
      }
    } catch (error) {
      toast.error('Failed to apply filters');
    }
  };

  // Reset create modal states when modal opens
  const handleCreateModalOpen = () => {
    setCreateMakeSelected('');
    setCreateModels([]);
    setCreateModalOpen(true);
  };

  // Reset create modal states when modal closes
  const handleCreateModalClose = () => {
    setCreateMakeSelected('');
    setCreateModels([]);
    setCreateModalOpen(false);
  };

  // Reset filter modal states when modal closes
  const handleFilterModalClose = () => {
    setFilterModalOpen(false);
    setFilterModels([]);
  };

  const makeOptions = makes.map((make) => ({
    value: make.id,
    label: make.name,
  }));

  // Create model options from dynamically fetched models
  const createModelOptions = createModels.map((model) => ({
    value: model.id,
    label: model.name,
  }));

  // Filter model options from dynamically fetched models
  const filterModelOptions = filterModels.map((model) => ({
    value: model.id,
    label: model.name,
  }));

  const columns = [
    { key: 'year', label: 'Year' },
    { 
      key: 'make', 
      label: 'Make',
      render: (item: CarYear) => item.make.name
    },
    { 
      key: 'model', 
      label: 'Model',
      render: (item: CarYear) => item.model.name
    },
    { 
      key: 'created_at', 
      label: 'Created At',
      render: (item: CarYear) => new Date(item.created_at).toLocaleDateString()
    },
  ];

  return (
    <Container size="xl" py="md">
      <DataTable
        data={filteredYears}
        columns={columns}
        title="Car Years"
        loading={loading}
        hasFilters={true}
        onCreate={handleCreateModalOpen}
        onFilter={() => setFilterModalOpen(true)}
        onDelete={(item) => setDeleteModal({ open: true, item })}
      />

      <CreateModal
        opened={createModalOpen}
        onClose={handleCreateModalClose}
        title="Create Car Year"
        entityType="year"
        onSubmit={handleCreate}
        makeOptions={makeOptions}
        modelOptions={createModelOptions}
        loading={submitting}
        onMakeChange={handleCreateMakeChange}
        loadingModels={loadingCreateModels}
        selectedMakeId={createMakeSelected}
      />

      <FilterModal
        opened={filterModalOpen}
        onClose={handleFilterModalClose}
        onApply={handleFilter}
        filterType="year"
        makeOptions={makeOptions}
        modelOptions={filterModelOptions}
        onMakeChange={handleFilterMakeChange}
        loadingModels={filterLoadingModels}
      />

      <ConfirmModal
        opened={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, item: null })}
        onConfirm={handleDelete}
        title="Delete Year"
        message={`Are you sure you want to delete "${deleteModal.item?.year}"? This action cannot be undone.`}
        loading={submitting}
      />
    </Container>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { Container } from '@mantine/core';
import { DataTable } from '@/components/DataTable/DataTable';
import { CreateModal } from '@/components/modals/CreateModal';
import { FilterModal } from '@/components/modals/FilterModal';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import { useCarApi } from '@/hooks/userCarApi';
import toast from 'react-hot-toast';
import { CarMake, CarModel, CarVariant, CarYear } from '@/types/car';

export default function VariantsPage() {
  const [variants, setVariants] = useState<CarVariant[]>([]);
  const [makes, setMakes] = useState<CarMake[]>([]);
  const [filteredVariants, setFilteredVariants] = useState<CarVariant[]>([]);
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; item: CarVariant | null }>({
    open: false,
    item: null,
  });
  const [submitting, setSubmitting] = useState(false);

  // Create modal specific states
  const [createModels, setCreateModels] = useState<CarModel[]>([]);
  const [createYears, setCreateYears] = useState<CarYear[]>([]);
  const [loadingModels, setLoadingModels] = useState(false);
  const [loadingYears, setLoadingYears] = useState(false);
  const [selectedMakeId, setSelectedMakeId] = useState('');
  const [selectedModelId, setSelectedModelId] = useState('');

  // Filter modal specific states
  const [filterModels, setFilterModels] = useState<CarModel[]>([]);
  const [filterYears, setFilterYears] = useState<CarYear[]>([]);
  const [filterLoadingModels, setFilterLoadingModels] = useState(false);
  const [filterLoadingYears, setFilterLoadingYears] = useState(false);

  const api = useCarApi();

  const loadData = async () => {
    try {
      setLoading(true);
      const [variantsData, makesData] = await Promise.all([
        api.fetchVariants(),
        api.fetchMakes(),
      ]);
      setVariants(variantsData);
      setMakes(makesData);
      setFilteredVariants(variantsData);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handle make selection for create modal
  const handleCreateMakeChange = async (makeId: string) => {
    if (!makeId) {
      setCreateModels([]);
      setCreateYears([]);
      setSelectedMakeId('');
      setSelectedModelId('');
      return;
    }

    try {
      setLoadingModels(true);
      setSelectedMakeId(makeId);
      setSelectedModelId(''); // Reset model selection
      setCreateYears([]); // Reset years when make changes
      
      const models = await api.fetchModelsByMake(makeId);
      setCreateModels(models);
    } catch (error) {
      toast.error('Failed to load models');
      setCreateModels([]);
    } finally {
      setLoadingModels(false);
    }
  };

  // Handle model selection for create modal
  const handleCreateModelChange = async (modelId: string) => {
    if (!modelId || !selectedMakeId) {
      setCreateYears([]);
      setSelectedModelId('');
      return;
    }

    try {
      setLoadingYears(true);
      setSelectedModelId(modelId);
      
      const years = await api.fetchYearsByMakeAndModel(selectedMakeId, modelId);
      setCreateYears(years);
    } catch (error) {
      toast.error('Failed to load years');
      setCreateYears([]);
    } finally {
      setLoadingYears(false);
    }
  };

  // Handle make selection for filter modal
  const handleFilterMakeChange = async (makeId: string) => {
    if (!makeId) {
      setFilterModels([]);
      setFilterYears([]);
      return;
    }

    try {
      setFilterLoadingModels(true);
      const models = await api.fetchModelsByMake(makeId);
      setFilterModels(models);
      setFilterYears([]); // Reset years when make changes
    } catch (error) {
      toast.error('Failed to load models for filter');
      setFilterModels([]);
    } finally {
      setFilterLoadingModels(false);
    }
  };

  // Handle model selection for filter modal
  const handleFilterModelChange = async (makeId: string, modelId: string) => {
    if (!makeId || !modelId) {
      setFilterYears([]);
      return;
    }

    try {
      setFilterLoadingYears(true);
      const years = await api.fetchYearsByMakeAndModel(makeId, modelId);
      setFilterYears(years);
    } catch (error) {
      toast.error('Failed to load years for filter');
      setFilterYears([]);
    } finally {
      setFilterLoadingYears(false);
    }
  };

  const handleCreate = async (data: any, isBulk: boolean) => {
    try {
      setSubmitting(true);
      if (isBulk) {
        // Handle bulk creation with new data structure
        const { makeId, modelId, yearId, bulkItems } = data;
        
        // Validate required fields
        if (!makeId || !modelId || !yearId) {
          toast.error('Please select make, model, and year for bulk creation');
          return;
        }

        // Filter out empty items and ensure they have names
        const validVariants = bulkItems.filter((item: any) => item.name && item.name.trim());
        
        if (validVariants.length === 0) {
          toast.error('Please provide at least one variant name');
          return;
        }

        await api.bulkCreateVariants(makeId, modelId, yearId, validVariants);
        toast.success(`${validVariants.length} variants created successfully`);
      } else {
        // Single creation
        if (!data.name || !data.name.trim()) {
          toast.error('Please provide a variant name');
          return;
        }
        if (!data.makeId || !data.modelId || !data.yearId) {
          toast.error('Please select make, model, and year');
          return;
        }
        
        await api.createVariant(data);
        toast.success('Variant created successfully');
      }
      await loadData();
      
      // Reset create modal states
      setCreateModels([]);
      setCreateYears([]);
      setSelectedMakeId('');
      setSelectedModelId('');
    } catch (error) {
      console.error('Create variant error:', error);
      toast.error('Failed to create variant(s)');
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.item) return;

    try {
      setSubmitting(true);
      await api.deleteVariant(deleteModal.item.id);
      toast.success('Variant deleted successfully');
      await loadData();
      setDeleteModal({ open: false, item: null });
    } catch (error) {
      toast.error('Failed to delete variant');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFilter = async (filters: any) => {
    try {
      if (filters.makeId && filters.modelId && filters.yearId) {
        const filtered = await api.fetchVariantsByMakeModelYear(
          filters.makeId, 
          filters.modelId, 
          filters.yearId
        );
        setFilteredVariants(filtered);
      } else {
        setFilteredVariants(variants);
      }
    } catch (error) {
      toast.error('Failed to apply filters');
    }
  };

  // Reset create modal states when modal closes
  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
    setCreateModels([]);
    setCreateYears([]);
    setSelectedMakeId('');
    setSelectedModelId('');
  };

  // Reset filter modal states when modal closes
  const handleFilterModalClose = () => {
    setFilterModalOpen(false);
    setFilterModels([]);
    setFilterYears([]);
  };

  const makeOptions = makes.map((make) => ({
    value: make.id,
    label: make.name,
  }));

  const createModelOptions = createModels.map((model) => ({
    value: model.id,
    label: model.name,
  }));

  const createYearOptions = createYears.map((year) => ({
    value: year.id,
    label: year.year.toString(),
  }));

  const filterModelOptions = filterModels.map((model) => ({
    value: model.id,
    label: model.name,
  }));

  const filterYearOptions = filterYears.map((year) => ({
    value: year.id,
    label: year.year.toString(),
  }));

  const columns = [
    { key: 'name', label: 'Name' },
    { 
      key: 'description', 
      label: 'Description',
      render: (item: CarVariant) => item.description || '-'
    },
    { 
      key: 'make', 
      label: 'Make',
      render: (item: CarVariant) => item.make.name
    },
    { 
      key: 'model', 
      label: 'Model',
      render: (item: CarVariant) => item.model.name
    },
    { 
      key: 'year', 
      label: 'Year',
      render: (item: CarVariant) => item.year.year
    },
    { 
      key: 'created_at', 
      label: 'Created At',
      render: (item: CarVariant) => new Date(item.created_at).toLocaleDateString()
    },
  ];

  return (
    <Container size="xl" py="md">
      <DataTable
        data={filteredVariants}
        columns={columns}
        title="Car Variants"
        loading={loading}
        hasFilters={true}
        onCreate={() => setCreateModalOpen(true)}
        onFilter={() => setFilterModalOpen(true)}
        onDelete={(item) => setDeleteModal({ open: true, item })}
      />

      <CreateModal
        opened={createModalOpen}
        onClose={handleCreateModalClose}
        title="Create Car Variant"
        entityType="variant"
        onSubmit={handleCreate}
        makeOptions={makeOptions}
        modelOptions={createModelOptions}
        yearOptions={createYearOptions}
        loading={submitting}
        onMakeChange={handleCreateMakeChange}
        loadingModels={loadingModels}
        selectedMakeId={selectedMakeId}
        onModelChange={handleCreateModelChange}
        loadingYears={loadingYears}
        selectedModelId={selectedModelId}
      />

      <FilterModal
        opened={filterModalOpen}
        onClose={handleFilterModalClose}
        onApply={handleFilter}
        filterType="variant"
        makeOptions={makeOptions}
        modelOptions={filterModelOptions}
        yearOptions={filterYearOptions}
        onMakeChange={handleFilterMakeChange}
        onModelChange={handleFilterModelChange}
        loadingModels={filterLoadingModels}
        loadingYears={filterLoadingYears}
      />

      <ConfirmModal
        opened={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, item: null })}
        onConfirm={handleDelete}
        title="Delete Variant"
        message={`Are you sure you want to delete "${deleteModal.item?.name}"? This action cannot be undone.`}
        loading={submitting}
      />
    </Container>
  );
}
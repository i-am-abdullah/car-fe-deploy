'use client';

import { Modal, Button, Group, Stack, Loader } from '@mantine/core';
import { useState } from 'react';
import { SelectField } from '../SelectField/SelectField';

interface FilterModalProps {
  opened: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  filterType: 'model' | 'year' | 'variant';
  makeOptions: { value: string; label: string }[];
  modelOptions?: { value: string; label: string }[];
  yearOptions?: { value: string; label: string }[];
  // Dynamic loading props
  onMakeChange?: (makeId: string) => void;
  onModelChange?: (makeId: string, modelId: string) => void;
  loadingModels?: boolean;
  loadingYears?: boolean;
}

export function FilterModal({
  opened,
  onClose,
  onApply,
  filterType,
  makeOptions,
  modelOptions = [],
  yearOptions = [],
  onMakeChange,
  onModelChange,
  loadingModels = false,
  loadingYears = false,
}: FilterModalProps) {
  const [filters, setFilters] = useState<any>({});

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({});
  };

  const handleClose = () => {
    // Reset filters when closing
    setFilters({});
    onClose();
  };

  // Handle make selection
  const handleMakeSelect = (makeId: string) => {
    // Reset model and year when make changes
    setFilters({ 
      ...filters, 
      makeId, 
      modelId: '', 
      yearId: '' 
    });
    
    if (onMakeChange) {
      onMakeChange(makeId);
    }
  };

  // Handle model selection
  const handleModelSelect = (modelId: string) => {
    // Reset year when model changes
    setFilters({ 
      ...filters, 
      modelId, 
      yearId: '' 
    });
    
    if (onModelChange && filters.makeId) {
      onModelChange(filters.makeId, modelId);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title="Filter Results"
      size="md"
    >
      <Stack>
        <SelectField
          label="Make"
          placeholder="Select make"
          options={makeOptions}
          value={filters.makeId || ''}
          onChange={handleMakeSelect}
        />

        {(filterType === 'year' || filterType === 'variant') && (
          <div style={{ position: 'relative' }}>
            <SelectField
              label="Model"
              placeholder={
                !filters.makeId 
                  ? "Please select a make first" 
                  : loadingModels 
                  ? "Loading models..." 
                  : "Select model"
              }
              options={modelOptions}
              value={filters.modelId || ''}
              onChange={handleModelSelect}
              disabled={!filters.makeId || loadingModels}
            />
            {loadingModels && (
              <div style={{ 
                position: 'absolute', 
                right: '10px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                zIndex: 10
              }}>
                <Loader size="xs" />
              </div>
            )}
          </div>
        )}

        {filterType === 'variant' && (
          <div style={{ position: 'relative' }}>
            <SelectField
              label="Year"
              placeholder={
                !filters.makeId || !filters.modelId 
                  ? "Please select make and model first" 
                  : loadingYears 
                  ? "Loading years..." 
                  : "Select year"
              }
              options={yearOptions}
              value={filters.yearId || ''}
              onChange={(val) => setFilters({ ...filters, yearId: val })}
              disabled={!filters.makeId || !filters.modelId || loadingYears}
            />
            {loadingYears && (
              <div style={{ 
                position: 'absolute', 
                right: '10px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                zIndex: 10
              }}>
                <Loader size="xs" />
              </div>
            )}
          </div>
        )}

        <Group justify="space-between">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Group>
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleApply}>
              Apply Filters
            </Button>
          </Group>
        </Group>
      </Stack>
    </Modal>
  );
}
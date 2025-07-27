'use client';

import { Modal, Button, Group, Switch, Stack, NumberInput, Loader } from '@mantine/core';
import { useState } from 'react';
import { InputField } from '../Input/Input';
import { SelectField } from '../SelectField/SelectField';
import { IconPlus, IconTrash } from '@tabler/icons-react';

interface CreateModalProps {
  opened: boolean;
  onClose: () => void;
  title: string;
  entityType: 'make' | 'model' | 'year' | 'variant';
  onSubmit: (data: any, isBulk: boolean) => Promise<void>;
  makeOptions?: { value: string; label: string }[];
  modelOptions?: { value: string; label: string }[];
  yearOptions?: { value: string; label: string }[];
  loading?: boolean;
  // Dynamic loading props
  onMakeChange?: (makeId: string) => void;
  onModelChange?: (modelId: string) => void;
  loadingModels?: boolean;
  loadingYears?: boolean;
  selectedMakeId?: string;
  selectedModelId?: string;
}

export function CreateModal({
  opened,
  onClose,
  title,
  entityType,
  onSubmit,
  makeOptions = [],
  modelOptions = [],
  yearOptions = [],
  loading = false,
  onMakeChange,
  onModelChange,
  loadingModels = false,
  loadingYears = false,
  selectedMakeId = '',
  selectedModelId = '',
}: CreateModalProps) {
  const [isBulk, setIsBulk] = useState(false);
  const [singleData, setSingleData] = useState<any>({});
  const [bulkData, setBulkData] = useState<any[]>([]);

  const resetForm = () => {
    setSingleData({});
    setBulkData([]);
    setIsBulk(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    try {
      let submitData;
      
      if (isBulk) {
        // For bulk creation, structure the data to include parent IDs and bulkItems
        submitData = {
          makeId: singleData.makeId,
          modelId: singleData.modelId,
          yearId: singleData.yearId, // for variants
          bulkItems: bulkData
        };
      } else {
        submitData = singleData;
      }
      
      await onSubmit(submitData, isBulk);
      handleClose();
    } catch (error) {
      console.error('Create failed:', error, selectedMakeId, selectedModelId);
    }
  };

  const addBulkItem = () => {
    setBulkData([...bulkData, getEmptyItem()]);
  };

  const updateBulkItem = (index: number, field: string, value: any) => {
    const updated = [...bulkData];
    updated[index] = { ...updated[index], [field]: value };
    setBulkData(updated);
  };

  const removeBulkItem = (index: number) => {
    setBulkData(bulkData.filter((_, i) => i !== index));
  };

  const getEmptyItem = () => {
    switch (entityType) {
      case 'make':
        return { name: '' };
      case 'model':
        return { name: '' };
      case 'year':
        return { year: new Date().getFullYear() };
      case 'variant':
        return { name: '', description: '' };
      default:
        return {};
    }
  };

  // Handle make selection
  const handleMakeSelect = (makeId: string) => {
    setSingleData({ ...singleData, makeId, modelId: '', yearId: '' });
    
    if (onMakeChange) {
      onMakeChange(makeId);
    }
  };

  // Handle model selection
  const handleModelSelect = (modelId: string) => {
    setSingleData({ ...singleData, modelId, yearId: '' });
    
    if (onModelChange && singleData.makeId) {
      onModelChange(modelId);
    }
  };

  // Handle bulk make selection
  const handleBulkMakeSelect = (makeId: string) => {
    setSingleData({ ...singleData, makeId, modelId: '', yearId: '' });
    
    if (onMakeChange) {
      onMakeChange(makeId);
    }
  };

  // Handle bulk model selection
  const handleBulkModelSelect = (modelId: string) => {
    setSingleData({ ...singleData, modelId, yearId: '' });
    
    if (onModelChange && singleData.makeId) {
      onModelChange(modelId);
    }
  };

  const renderSingleForm = () => {
    switch (entityType) {
      case 'make':
        return (
          <InputField
            label="Make Name"
            placeholder="Enter make name"
            value={singleData.name || ''}
            onChange={(val) => setSingleData({ ...singleData, name: val })}
            required
          />
        );

      case 'model':
        return (
          <Stack>
            <SelectField
              label="Make"
              placeholder="Select make"
              options={makeOptions}
              value={singleData.makeId || ''}
              onChange={(val) => setSingleData({ ...singleData, makeId: val })}
              required
            />
            <InputField
              label="Model Name"
              placeholder="Enter model name"
              value={singleData.name || ''}
              onChange={(val) => setSingleData({ ...singleData, name: val })}
              required
            />
          </Stack>
        );

      case 'year':
        return (
          <Stack>
            <SelectField
              label="Make"
              placeholder="Select make"
              options={makeOptions}
              value={singleData.makeId || ''}
              onChange={handleMakeSelect}
              required
            />
            <div style={{ position: 'relative' }}>
              <SelectField
                label="Model"
                placeholder={
                  !singleData.makeId 
                    ? "Please select a make first" 
                    : loadingModels 
                    ? "Loading models..." 
                    : "Select model"
                }
                options={modelOptions}
                value={singleData.modelId || ''}
                onChange={(val) => setSingleData({ ...singleData, modelId: val })}
                disabled={!singleData.makeId || loadingModels}
                required
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
            <NumberInput
              label="Year"
              placeholder="Enter year"
              value={singleData.year || new Date().getFullYear()}
              onChange={(val) => setSingleData({ ...singleData, year: val })}
              min={1900}
              max={new Date().getFullYear() + 2}
              required
            />
          </Stack>
        );

      case 'variant':
        return (
          <Stack>
            <SelectField
              label="Make"
              placeholder="Select make"
              options={makeOptions}
              value={singleData.makeId || ''}
              onChange={handleMakeSelect}
              required
            />
            <div style={{ position: 'relative' }}>
              <SelectField
                label="Model"
                placeholder={
                  !singleData.makeId 
                    ? "Please select a make first" 
                    : loadingModels 
                    ? "Loading models..." 
                    : "Select model"
                }
                options={modelOptions}
                value={singleData.modelId || ''}
                onChange={handleModelSelect}
                disabled={!singleData.makeId || loadingModels}
                required
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
            <div style={{ position: 'relative' }}>
              <SelectField
                label="Year"
                placeholder={
                  !singleData.makeId || !singleData.modelId 
                    ? "Please select make and model first" 
                    : loadingYears 
                    ? "Loading years..." 
                    : "Select year"
                }
                options={yearOptions}
                value={singleData.yearId || ''}
                onChange={(val) => setSingleData({ ...singleData, yearId: val })}
                disabled={!singleData.makeId || !singleData.modelId || loadingYears}
                required
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
            <InputField
              label="Variant Name"
              placeholder="Enter variant name"
              value={singleData.name || ''}
              onChange={(val) => setSingleData({ ...singleData, name: val })}
              required
            />
            <InputField
              label="Description"
              placeholder="Enter description (optional)"
              type="textarea"
              value={singleData.description || ''}
              onChange={(val) => setSingleData({ ...singleData, description: val })}
            />
          </Stack>
        );

      default:
        return null;
    }
  };

  const renderBulkForm = () => {
    return (
      <Stack>
        <Group justify="space-between">
          <span>Bulk Items ({bulkData.length})</span>
          <Button
            size="xs"
            leftSection={<IconPlus size={14} />}
            onClick={addBulkItem}
          >
            Add Item
          </Button>
        </Group>

        {entityType !== 'make' && (
          <Stack>
            {entityType === 'model' && (
              <SelectField
                label="Make (for all models)"
                placeholder="Select make"
                options={makeOptions}
                value={singleData.makeId || ''}
                onChange={(val) => setSingleData({ ...singleData, makeId: val })}
                required
              />
            )}
            {(entityType === 'year' || entityType === 'variant') && (
              <>
                <SelectField
                  label="Make (for all items)"
                  placeholder="Select make"
                  options={makeOptions}
                  value={singleData.makeId || ''}
                  onChange={handleBulkMakeSelect}
                  required
                />
                <div style={{ position: 'relative' }}>
                  <SelectField
                    label="Model (for all items)"
                    placeholder={
                      !singleData.makeId 
                        ? "Please select a make first" 
                        : loadingModels 
                        ? "Loading models..." 
                        : "Select model"
                    }
                    options={modelOptions}
                    value={singleData.modelId || ''}
                    onChange={handleBulkModelSelect}
                    disabled={!singleData.makeId || loadingModels}
                    required
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
              </>
            )}
            {entityType === 'variant' && (
              <div style={{ position: 'relative' }}>
                <SelectField
                  label="Year (for all variants)"
                  placeholder={
                    !singleData.makeId || !singleData.modelId 
                      ? "Please select make and model first" 
                      : loadingYears 
                      ? "Loading years..." 
                      : "Select year"
                  }
                  options={yearOptions}
                  value={singleData.yearId || ''}
                  onChange={(val) => setSingleData({ ...singleData, yearId: val })}
                  disabled={!singleData.makeId || !singleData.modelId || loadingYears}
                  required
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
          </Stack>
        )}

        {bulkData.map((item, index) => (
          <Group key={index} align="flex-end">
            <div className="flex-1">
              {entityType === 'make' && (
                <InputField
                  label={`Make ${index + 1}`}
                  placeholder="Enter make name"
                  value={item.name || ''}
                  onChange={(val) => updateBulkItem(index, 'name', val)}
                />
              )}
              {entityType === 'model' && (
                <InputField
                  label={`Model ${index + 1}`}
                  placeholder="Enter model name"
                  value={item.name || ''}
                  onChange={(val) => updateBulkItem(index, 'name', val)}
                />
              )}
              {entityType === 'year' && (
                <NumberInput
                  label={`Year ${index + 1}`}
                  placeholder="Enter year"
                  value={item.year || new Date().getFullYear()}
                  onChange={(val) => updateBulkItem(index, 'year', val)}
                  min={1900}
                  max={new Date().getFullYear() + 2}
                />
              )}
              {entityType === 'variant' && (
                <Stack gap="xs">
                  <InputField
                    label={`Variant ${index + 1} Name`}
                    placeholder="Enter variant name"
                    value={item.name || ''}
                    onChange={(val) => updateBulkItem(index, 'name', val)}
                  />
                  <InputField
                    label="Description"
                    placeholder="Enter description (optional)"
                    value={item.description || ''}
                    onChange={(val) => updateBulkItem(index, 'description', val)}
                  />
                </Stack>
              )}
            </div>
            <Button
              color="red"
              variant="subtle"
              onClick={() => removeBulkItem(index)}
            >
              <IconTrash size={16} />
            </Button>
          </Group>
        ))}
      </Stack>
    );
  };

  // Check if form is valid for submission
  const isFormValid = () => {
    if (entityType === 'year') {
      if (isBulk) {
        return singleData.makeId && singleData.modelId && bulkData.length > 0 && 
               bulkData.every(item => item.year);
      } else {
        return singleData.makeId && singleData.modelId && singleData.year;
      }
    }
    if (entityType === 'model') {
      if (isBulk) {
        return singleData.makeId && bulkData.length > 0 && 
               bulkData.every(item => item.name?.trim());
      } else {
        return singleData.makeId && singleData.name?.trim();
      }
    }
    if (entityType === 'variant') {
      if (isBulk) {
        return singleData.makeId && singleData.modelId && singleData.yearId && 
               bulkData.length > 0 && bulkData.every(item => item.name?.trim());
      } else {
        return singleData.makeId && singleData.modelId && singleData.yearId && singleData.name?.trim();
      }
    }
    if (entityType === 'make') {
      if (isBulk) {
        return bulkData.length > 0 && bulkData.every(item => item.name?.trim());
      } else {
        return singleData.name?.trim();
      }
    }
    return true;
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={title}
      size="lg"
    >
      <Stack>
        <Switch
          label="Bulk Create"
          checked={isBulk}
          onChange={(event) => setIsBulk(event.currentTarget.checked)}
        />

        {isBulk ? renderBulkForm() : renderSingleForm()}

        <Group justify="flex-end">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            loading={loading}
            disabled={!isFormValid()}
          >
            Create
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
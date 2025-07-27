// components/CarListingModal/CarListingModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { Modal, Button, Group, Tabs, LoadingOverlay } from '@mantine/core';
import { useForm } from '@mantine/form';
import { CarListing } from '@/services/carListingAdminServices';
import { BasicInformationForm } from './Tabs/BasicInformationForm';
import { ImagesSection } from './Tabs/ImagesSection';
import { DetailsForm } from './Tabs/DetailsForm';
import { SpecificationsForm } from './Tabs/SpecificationsForm';
import { getInitialValues, createCarData } from '@/utils/carFormUtils';
import { createCarListing, updateCarListing } from '@/services/carListingServices';
import toast from 'react-hot-toast';

interface CarListingModalProps {
  opened: boolean;
  onClose: () => void;
  initialData?: CarListing | null;
  onSuccess: () => void;
}

// Define tab structure for navigation
const TABS = [
  { value: 'basic', label: 'Basic Information' },
  { value: 'details', label: 'Details' },
  { value: 'specifications', label: 'Specifications' },
  { value: 'images', label: 'Images' }
];

export function CarListingModal({ 
  opened, 
  onClose, 
  initialData, 
  onSuccess 
}: CarListingModalProps) {
  const [activeTab, setActiveTab] = useState<string | null>('basic');
  const [submitting, setSubmitting] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const isEditing = Boolean(initialData?.id);
  
  const form = useForm<any>({
    initialValues: getInitialValues(initialData!),
  });

  // All required fields for the entire form
  const requiredFields = [
    'make_id',
    'model_id', 
    'year_id',
    'variant_id',
    'price',
    'meter_reading',
    'color',
    'location',
    'registration_city_id'
  ];

  // Validation rules
  const validationRules = {
    make_id: (value: any) => !value ? 'Car make is required' : null,
    model_id: (value: any) => !value ? 'Car model is required' : null,
    year_id: (value: any) => !value ? 'Year is required' : null,
    variant_id: (value: any) => !value ? 'Variant is required' : null,
    price: (value: any) => {
      if (!value || value <= 0) return 'Price must be greater than 0';
      return null;
    },
    meter_reading: (value: any) => {
      if (value === undefined || value === null || value === '') return 'Meter reading is required';
      if (value < 0) return 'Meter reading cannot be negative';
      return null;
    },
    color: (value: any) => !value ? 'Color is required' : null,
    location: (value: any) => !value ? 'Location is required' : null,
    registration_city_id: (value: any) => !value ? 'Registration city is required' : null,
  };

  // Check if all required fields are filled
  const validateAllFields = () => {
    const errors: Record<string, string> = {};
    const values = form.values;
    
    requiredFields.forEach(field => {
      const validator = validationRules[field as keyof typeof validationRules];
      if (validator) {
        const error = validator(values[field]);
        if (error) {
          errors[field] = error;
        }
      }
    });

    return { hasErrors: Object.keys(errors).length > 0, errors };
  };

  // Reset form when modal opens
  useEffect(() => {
    if (opened) {
      const initialValues = getInitialValues(initialData!);
      form.setValues(initialValues);
      form.resetDirty(initialValues);
      form.clearErrors();
      setIsFormComplete(false);
      
      console.log('Setting form values:', initialValues);
    }
  }, [initialData, opened]);

  useEffect(() => {
    if (initialData?.features && initialData.features.length > 0) {
      form.setFieldValue(
        'features',
        initialData.features.map((f: any) => f.id)
      );
    }
  }, [initialData, opened]);

  // Check if form is complete whenever form values change
  useEffect(() => {
    const validation = validateAllFields();
    setIsFormComplete(!validation.hasErrors);
  }, [form.values]);

  const handleSubmit = async (values: any) => {
    // Validate all fields before submission
    const validation = validateAllFields();
    
    if (validation.hasErrors) {
      form.setErrors(validation.errors);
      
      // Create a user-friendly error message
      const fieldLabels: Record<string, string> = {
        make_id: 'Car Make',
        model_id: 'Car Model', 
        year_id: 'Year',
        variant_id: 'Variant',
        price: 'Price',
        meter_reading: 'Meter Reading',
        color: 'Color',
        location: 'Location',
        registration_city_id: 'Registration City'
      };
      
      const missingFields = Object.keys(validation.errors).map(field => 
        fieldLabels[field] || field
      );
      
      toast.error(`Please fill all required fields: ${missingFields.join(', ')}`);
      
      // Navigate to the first tab that has errors
      const tabFieldMapping = {
        basic: ['make_id', 'model_id', 'year_id', 'variant_id', 'price'],
        details: ['meter_reading', 'color', 'location'],
        specifications: ['registration_city_id'],
        images: []
      };
      
      for (const [tabName, fields] of Object.entries(tabFieldMapping)) {
        if (fields.some(field => validation.errors[field])) {
          setActiveTab(tabName);
          break;
        }
      }
      
      return;
    }

    setSubmitting(true);
    try {
      const carData = createCarData(values);
      
      if (initialData?.id) {
        await updateCarListing(initialData.id, carData);
        toast.success('Car listing updated successfully');
      } else {
        await createCarListing(carData);
        toast.success('Car listing created successfully');
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error submitting car listing:', error);
      toast.error('Failed to save car listing. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Move to the next tab
  const moveToNextTab = (e: React.MouseEvent) => {
    e.preventDefault();
    const currentTabIndex = TABS.findIndex(tab => tab.value === activeTab);
    if (currentTabIndex < TABS.length - 1) {
      setActiveTab(TABS[currentTabIndex + 1].value);
    }
  };

  // Move to the previous tab
  const moveToPrevTab = (e: React.MouseEvent) => {
    e.preventDefault();
    const currentTabIndex = TABS.findIndex(tab => tab.value === activeTab);
    if (currentTabIndex > 0) {
      setActiveTab(TABS[currentTabIndex - 1].value);
    }
  };

  const currentTabIndex = TABS.findIndex(tab => tab.value === activeTab);
  const isLastTab = currentTabIndex === TABS.length - 1;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={initialData ? 'Edit Car Listing' : 'Create Car Listing'}
      size="xl"
    >
      <LoadingOverlay visible={submitting} />
      
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(form.values);
      }}>
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            {TABS.map((tab) => (
              <Tabs.Tab key={tab.value} value={tab.value}>
                {tab.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <Tabs.Panel value="basic" pt="md">
            <BasicInformationForm 
              form={form} 
              isEditing={isEditing}
            />
          </Tabs.Panel>

          <Tabs.Panel value="details" pt="md">
            <DetailsForm 
              form={form}
            />
          </Tabs.Panel>

          <Tabs.Panel value="specifications" pt="md">
            <SpecificationsForm 
              form={form}
            />
          </Tabs.Panel>

          <Tabs.Panel value="images" pt="md">
            <ImagesSection
              images={form.values.images}
              onChange={(images) => {
                form.setFieldValue('images', images);
              }}
            />
          </Tabs.Panel>
        </Tabs>

        <Group justify="space-between" mt="xl">
          <Button 
            variant="outline" 
            onClick={moveToPrevTab} 
            disabled={activeTab === 'basic' || submitting}
            type="button"
          >
            Previous
          </Button>
          
          <Group>
            <Button variant="outline" onClick={onClose} type="button" disabled={submitting}>
              Cancel
            </Button>
            
            {!isLastTab ? (
              <Button 
                onClick={moveToNextTab} 
                type="button" 
                disabled={submitting}
              >
                Next
              </Button>
            ) : (
              <Button 
                type="submit" 
                loading={submitting} 
                disabled={!isFormComplete || submitting}
                title={!isFormComplete ? "Please fill all required fields to create the listing" : ""}
                color={isFormComplete ? 'blue' : 'gray'}
              >
                {initialData ? 'Update' : 'Create'} Listing
              </Button>
            )}
          </Group>
        </Group>
      </form>
    </Modal>
  );
}
// components/CarListingModal/CarListingModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { Modal, Button, Group, Tabs, LoadingOverlay } from '@mantine/core';
import { useForm } from '@mantine/form';
import { CarListing, CarFormValues } from '@/types/car';
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

// Define tab structure for sequential navigation
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
  
  const form = useForm<CarFormValues>({
    initialValues: getInitialValues(initialData),
    validate: {
      make_id: (value) => !value ? 'Car make is required' : null,
      model_id: (value) => !value ? 'Car model is required' : null,
      year_id: (value) => !value ? 'Year is required' : null,
      variant_id: (value) => !value ? 'Variant is required' : null,
      price: (value) => value <= 0 ? 'Price must be greater than 0' : null,
      meter_reading: (value) => value < 0 ? 'Meter reading cannot be negative' : null,
      color: (value) => !value ? 'Color is required' : null,
      location: (value) => !value ? 'Location is required' : null,
      registration_city_id: (value) => !value ? 'Registration city is required' : null,
    },
  });

  // Reset form when modal opens with initialData
  useEffect(() => {
    if (opened) {
      const initialValues = getInitialValues(initialData);
      form.setValues(initialValues);
      form.resetDirty(initialValues);
      
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

  // Check if form is complete
  useEffect(() => {
    checkFormCompleteness();
  }, [form.values]);

  const checkFormCompleteness = () => {
    // Validate all form fields
    const validation = form.validate();
    setIsFormComplete(!validation.hasErrors);
  };

  const handleSubmit = async (values: CarFormValues) => {
    setSubmitting(true);
    try {
      const carData = createCarData(values);
      
      if (initialData?.id) {
        // Update existing listing
        await updateCarListing(initialData.id, carData);
        toast.success('Car listing updated successfully');
      } else {
        // Create new listing
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
    e.preventDefault(); // Prevent form submission
    const currentTabIndex = TABS.findIndex(tab => tab.value === activeTab);
    if (currentTabIndex < TABS.length - 1) {
      // Validate current tab fields before moving to next
      let hasErrors = false;
      
      switch (activeTab) {
        case 'basic':
          hasErrors = !!form.validateField('make_id').error || 
                     !!form.validateField('model_id').error ||
                     !!form.validateField('year_id').error ||
                     !!form.validateField('variant_id').error ||
                     !!form.validateField('price').error;
          break;
        case 'details':
          hasErrors = !!form.validateField('meter_reading').error ||
                     !!form.validateField('color').error ||
                     !!form.validateField('location').error;
          break;
        case 'specifications':
          hasErrors = !!form.validateField('registration_city_id').error;
          break;
      }
      
      if (!hasErrors) {
        setActiveTab(TABS[currentTabIndex + 1].value);
      } else {
        toast.error('Please fill all required fields before proceeding');
      }
    }
  };

  // Move to the previous tab
  const moveToPrevTab = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    const currentTabIndex = TABS.findIndex(tab => tab.value === activeTab);
    if (currentTabIndex > 0) {
      setActiveTab(TABS[currentTabIndex - 1].value);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={initialData ? 'Edit Car Listing' : 'Create Car Listing'}
      size="xl"
    >
      <LoadingOverlay visible={submitting} />
      
      <form onSubmit={(e) => {
        // Only allow form submission when the submit button is clicked explicitly
        // if (!e.nativeEvent.submitter || 
        //     e.nativeEvent.submitter.getAttribute('type') !== 'submit') {
        //   e.preventDefault();
        //   return;
        // }
        form.onSubmit(handleSubmit)(e);
      }}>
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            {TABS.map((tab) => (
              <Tabs.Tab key={tab.value} value={tab.value}>{tab.label}</Tabs.Tab>
            ))}
          </Tabs.List>

          <Tabs.Panel value="basic" pt="md">
            <BasicInformationForm form={form} isEditing={isEditing} />
          </Tabs.Panel>

          <Tabs.Panel value="details" pt="md">
            <DetailsForm form={form} />
          </Tabs.Panel>

          <Tabs.Panel value="specifications" pt="md">
            <SpecificationsForm form={form} />
          </Tabs.Panel>

          <Tabs.Panel value="images" pt="md">
            <ImagesSection
              images={form.values.images}
              onChange={(images) => form.setFieldValue('images', images)}
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
            
            {activeTab !== TABS[TABS.length - 1].value ? (
              <Button onClick={moveToNextTab} type="button" disabled={submitting}>
                Next
              </Button>
            ) : (
              <Button 
                type="submit" 
                loading={submitting} 
                disabled={!isFormComplete || submitting}
                title={!isFormComplete ? "Please complete all required fields" : ""}
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
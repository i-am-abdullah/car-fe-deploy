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
  const [hasUploadingImages, setHasUploadingImages] = useState(false);
  const isEditing = Boolean(initialData?.id);

  const form = useForm<any>({
    initialValues: getInitialValues(initialData!),
  });

  // All required fields for the entire form (excluding accident_history which defaults to false)
  const requiredFields = [
    'make_id',
    'model_id',
    'year_id',
    'variant_id',
    'price',
    'meter_reading',
    'color',
    'location',
    'registration_city_id',
    // Additional details
    'engine_type',
    'engine_capacity',
    'transmission',
    'assembly',
    'fuel_type',
    // General details
    'description',
    'reason_for_selling',
    'ownership_status',
    'registration_year',
    'registration_number',
    // Images (now required)
    'images'
  ];

  // Field labels for better user experience
  const fieldLabels: Record<string, string> = {
    make_id: 'Car Make',
    model_id: 'Car Model',
    year_id: 'Year',
    variant_id: 'Variant',
    price: 'Price',
    meter_reading: 'Meter Reading',
    color: 'Color',
    location: 'Location',
    registration_city_id: 'Registration City',
    // Additional details
    engine_type: 'Engine Type',
    engine_capacity: 'Engine Capacity',
    transmission: 'Transmission',
    assembly: 'Assembly',
    fuel_type: 'Fuel Type',
    // General details
    description: 'Description',
    reason_for_selling: 'Reason for Selling',
    ownership_status: 'Ownership Status',
    registration_year: 'Registration Year',
    registration_number: 'Registration Number',
    // Images
    images: 'Car Images'
  };

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
    // Additional details validations
    engine_type: (value: any) => !value ? 'Engine type is required' : null,
    engine_capacity: (value: any) => !value ? 'Engine capacity is required' : null,
    transmission: (value: any) => !value ? 'Transmission is required' : null,
    assembly: (value: any) => !value ? 'Assembly is required' : null,
    fuel_type: (value: any) => !value ? 'Fuel type is required' : null,
    // General details validations
    description: (value: any) => !value ? 'Description is required' : null,
    reason_for_selling: (value: any) => !value ? 'Reason for selling is required' : null,
    ownership_status: (value: any) => !value ? 'Ownership status is required' : null,
    registration_year: (value: any) => !value ? 'Registration year is required' : null,
    registration_number: (value: any) => !value ? 'Registration number is required' : null,
    // Images validation - at least one image required
    images: (value: any) => {
      if (!value || !Array.isArray(value) || value.length === 0) {
        return 'At least one car image is required';
      }
      return null;
    },
  };

  // Check if all required fields are filled and get missing fields
  const validateAllFields = () => {
    const errors: Record<string, string> = {};
    const missingFields: string[] = [];
    const values = form.values;

    requiredFields.forEach(field => {
      const validator = validationRules[field as keyof typeof validationRules];
      if (validator) {
        const error = validator(values[field]);
        if (error) {
          errors[field] = error;
          missingFields.push(fieldLabels[field] || field);
        }
      }
    });

    // Additional check for uploading images
    if (hasUploadingImages) {
      errors['images'] = 'Please wait for all images to finish uploading';
      missingFields.push('Image uploads in progress');
    }

    return {
      hasErrors: Object.keys(errors).length > 0,
      errors,
      missingFields
    };
  };

  // Reset form when modal opens
  useEffect(() => {
    if (opened) {
      const initialValues = getInitialValues(initialData!);
      form.setValues(initialValues);
      form.resetDirty(initialValues);
      form.clearErrors();
      setIsFormComplete(false);
      setHasUploadingImages(false);

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
  }, [form.values, hasUploadingImages]);

  const handleSubmit = async (values: any) => {
    // Validate all fields before submission
    const validation = validateAllFields();

    if (validation.hasErrors) {
      form.setErrors(validation.errors);

      // Show first 5 missing fields (or all if less than 5)
      const fieldsToShow = validation.missingFields.slice(0, 5);
      const remainingCount = validation.missingFields.length - fieldsToShow.length;

      let errorMessage = `Please fill the following required fields: ${fieldsToShow.join(', ')}`;

      if (remainingCount > 0) {
        errorMessage += ` and ${remainingCount} more field${remainingCount > 1 ? 's' : ''}`;
      }

      toast.error(errorMessage);

      // Navigate to the first tab that has errors
      const tabFieldMapping = {
        basic: ['make_id', 'model_id', 'year_id', 'variant_id', 'price'],
        details: ['meter_reading', 'color', 'location', 'description', 'reason_for_selling', 'ownership_status', 'registration_year', 'registration_number'],
        specifications: ['registration_city_id', 'engine_type', 'engine_capacity', 'transmission', 'assembly', 'fuel_type'],
        images: ['images']
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

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(form.values);
        }}
      >
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
              onUploadStatusChange={setHasUploadingImages}
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
                disabled={submitting || hasUploadingImages}
                color={isFormComplete ? 'blue' : 'red'}
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
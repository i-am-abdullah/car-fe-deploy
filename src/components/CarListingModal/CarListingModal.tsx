'use client';

import { useState, useEffect } from 'react';
import { Modal, Button, Group, Tabs } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Car } from '@/types/car';
import { BasicInformationForm } from './Tabs/BasicInformationForm';
import { ImagesSection } from './Tabs/ImagesSection';
import { SpecificationsForm } from './Tabs/SpecificationsForm';
import { PerformanceForm } from './Tabs/PerformanceForm';
import { FAQManager } from './Tabs/FAQManager';
import { ContactInfoForm } from './Tabs/ContactInfoForm';
import { getInitialValues, createCarData } from '@/utils/carFormUtils';

interface CarListingModalProps {
  opened: boolean;
  onClose: () => void;
  initialData?: Car | null;
  onSave: (car: Car) => void;
}

export function CarListingModal({ opened, onClose, initialData, onSave }: CarListingModalProps) {
  const [activeTab, setActiveTab] = useState<string | null>('basic');
  const form = useForm({
    initialValues: getInitialValues(initialData),
    validate: {
      model: (value) => (value ? null : 'Model is required'),
      make: (value) => (value ? null : 'Make is required'),
      price: (value) => (value > 0 ? null : 'Price must be greater than 0'),
      year: (value) => (/^\d{4}$/.test(value) ? null : 'Year must be a 4-digit number'),
    },
  });

  useEffect(() => {
    if (initialData && opened) {
      form.setValues(getInitialValues(initialData));
    }
  }, [initialData, opened]);

  const handleSubmit = form.onSubmit((values) => {
    const carData = createCarData(values);
    onSave(carData);
    onClose();
  });

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={initialData ? 'Edit Car Listing' : 'Add New Car Listing'}
      size="xl"
    >
      <form onSubmit={handleSubmit}>
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="basic">Basic Information</Tabs.Tab>
            <Tabs.Tab value="images">Images</Tabs.Tab>
            <Tabs.Tab value="details">Specifications</Tabs.Tab>
            <Tabs.Tab value="performance">Performance</Tabs.Tab>
            <Tabs.Tab value="faqs">FAQs</Tabs.Tab>
            <Tabs.Tab value="contact">Contact Info</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="basic" pt="md">
            <BasicInformationForm form={form} />
          </Tabs.Panel>

          <Tabs.Panel value="images" pt="md">
            <ImagesSection 
              images={form.values.images} 
              onChange={(images) => form.setFieldValue('images', images)} 
            />
          </Tabs.Panel>

          <Tabs.Panel value="details" pt="md">
            <SpecificationsForm 
              specifications={form.values.specifications} 
              onChange={(specs) => form.setFieldValue('specifications', specs)} 
            />
          </Tabs.Panel>

          <Tabs.Panel value="performance" pt="md">
            <PerformanceForm 
              enginePerformance={form.values.enginePerformance} 
              onChange={(performance) => form.setFieldValue('enginePerformance', performance)} 
            />
          </Tabs.Panel>

          <Tabs.Panel value="faqs" pt="md">
            <FAQManager 
              faqs={form.values.faqs} 
              onChange={(faqs) => form.setFieldValue('faqs', faqs)} 
            />
          </Tabs.Panel>

          <Tabs.Panel value="contact" pt="md">
            <ContactInfoForm form={form} />
          </Tabs.Panel>
        </Tabs>

        <Group justify="flex-end" mt="xl">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </Group>
      </form>
    </Modal>
  );
}
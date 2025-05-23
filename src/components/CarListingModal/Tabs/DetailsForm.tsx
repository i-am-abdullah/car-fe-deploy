// components/CarListingModal/Tabs/DetailsForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { UseFormReturnType } from '@mantine/form';
import { Grid, Select, NumberInput, TextInput, Textarea, Checkbox, Stack, MultiSelect } from '@mantine/core';
import { CarFormValues, RegistrationCity, Feature } from '@/types/car';
import { getRegistrationCities, getFeatures } from '@/services/carListingServices';

interface DetailsFormProps {
  form: UseFormReturnType<CarFormValues>;
}

export function DetailsForm({ form }: DetailsFormProps) {
  const [registrationCities, setRegistrationCities] = useState<RegistrationCity[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loadingCities, setLoadingCities] = useState(true);
  const [loadingFeatures, setLoadingFeatures] = useState(true);

  // Load registration cities and features on component mount
  useEffect(() => {
    async function loadData() {
      try {
        const [citiesData, featuresData] = await Promise.all([
          getRegistrationCities(),
          getFeatures()
        ]);
        
        setRegistrationCities(citiesData);
        setFeatures(featuresData);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoadingCities(false);
        setLoadingFeatures(false);
      }
    }
    
    loadData();
  }, []);

  return (
    <Stack>
      <Grid>
        <Grid.Col span={6}>
          <Select
            label="Registration City"
            placeholder="Select registration city"
            data={registrationCities.map((city) => ({ value: city.id, label: city.name }))}
            value={form.values.registration_city_id}
            onChange={(value) => form.setFieldValue('registration_city_id', value || '')}
            error={form.errors.registration_city_id}
            searchable
            required
          />
        </Grid.Col>
        
        <Grid.Col span={6}>
          <TextInput
            label="Registration Number"
            placeholder="Enter registration number"
            value={form.values.registration_number || ''}
            onChange={(e) => form.setFieldValue('registration_number', e.target.value)}
            error={form.errors.registration_number}
          />
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={6}>
          <NumberInput
            label="Registration Year"
            placeholder="Enter registration year"
            value={form.values.registration_year || undefined}
            onChange={(value) => form.setFieldValue('registration_year', typeof value === 'number' ? value : 0)}
            error={form.errors.registration_year}
            min={1900}
            max={new Date().getFullYear()}
          />
        </Grid.Col>
        
        <Grid.Col span={6}>
          <Select
            label="Ownership Status"
            placeholder="Select ownership status"
            data={[
              { value: 'first', label: 'First Owner' },
              { value: 'second', label: 'Second Owner' },
              { value: 'third+', label: 'Third Owner or More' }
            ]}
            value={form.values.ownership_status || ''}
            onChange={(value) => form.setFieldValue('ownership_status', value || '')}
            error={form.errors.ownership_status}
          />
        </Grid.Col>
      </Grid>

      <Textarea
        label="Description"
        placeholder="Enter car description"
        value={form.values.description || ''}
        onChange={(e) => form.setFieldValue('description', e.target.value)}
        error={form.errors.description}
        minRows={3}
      />

      <Textarea
        label="Reason for Selling"
        placeholder="Enter reason for selling"
        value={form.values.reason_for_selling || ''}
        onChange={(e) => form.setFieldValue('reason_for_selling', e.target.value)}
        error={form.errors.reason_for_selling}
        minRows={2}
      />

      <Checkbox
        label="Has accident history"
        checked={form.values.accident_history || false}
        onChange={(e) => form.setFieldValue('accident_history', e.target.checked)}
      />

      <MultiSelect
        label="Features"
        placeholder="Select features"
        data={features.map((feature) => ({ value: feature.id, label: feature.name }))}
        value={form.values.features || []}
        onChange={(values) => form.setFieldValue('features', values)}
        error={form.errors.features}
        searchable
      />
    </Stack>
  );
}
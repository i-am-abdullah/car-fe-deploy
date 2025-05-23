// components/CarListingModal/Tabs/SpecificationsForm.tsx
'use client';

import { UseFormReturnType } from '@mantine/form';
import { Grid, TextInput, Select, Stack } from '@mantine/core';
import { CarFormValues } from '@/types/car';

interface SpecificationsFormProps {
  form: UseFormReturnType<CarFormValues>;
}

export function SpecificationsForm({ form }: SpecificationsFormProps) {
  return (
    <Stack>
      <Grid>
        <Grid.Col span={6}>
          <TextInput
            label="Engine Type"
            placeholder="Enter engine type"
            value={form.values.engine_type || ''}
            onChange={(e) => form.setFieldValue('engine_type', e.target.value)}
            error={form.errors.engine_type}
          />
        </Grid.Col>
        
        <Grid.Col span={6}>
          <TextInput
            label="Engine Capacity"
            placeholder="e.g. 1800cc"
            value={form.values.engine_capacity || ''}
            onChange={(e) => form.setFieldValue('engine_capacity', e.target.value)}
            error={form.errors.engine_capacity}
          />
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={6}>
          <Select
            label="Transmission"
            placeholder="Select transmission type"
            data={[
              { value: 'automatic', label: 'Automatic' },
              { value: 'manual', label: 'Manual' },
              { value: 'cvt', label: 'CVT' },
              { value: 'semi-automatic', label: 'Semi-Automatic' },
            ]}
            value={form.values.transmission || ''}
            onChange={(value) => form.setFieldValue('transmission', value || '')}
            error={form.errors.transmission}
          />
        </Grid.Col>
        
        <Grid.Col span={6}>
          <Select
            label="Fuel Type"
            placeholder="Select fuel type"
            data={[
              { value: 'petrol', label: 'Petrol' },
              { value: 'diesel', label: 'Diesel' },
              { value: 'hybrid', label: 'Hybrid' },
              { value: 'electric', label: 'Electric' },
              { value: 'cng', label: 'CNG' },
              { value: 'lpg', label: 'LPG' },
            ]}
            value={form.values.fuel_type || ''}
            onChange={(value) => form.setFieldValue('fuel_type', value || '')}
            error={form.errors.fuel_type}
          />
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={12}>
          <Select
            label="Assembly"
            placeholder="Select assembly type"
            data={[
              { value: 'local', label: 'Local' },
              { value: 'imported', label: 'Imported' },
            ]}
            value={form.values.assembly || ''}
            onChange={(value) => form.setFieldValue('assembly', value || '')}
            error={form.errors.assembly}
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
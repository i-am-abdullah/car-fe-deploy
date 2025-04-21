import { Grid, TextInput, NumberInput, Select, Checkbox, Textarea, MultiSelect } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { UseFormReturnType } from '@mantine/form';
import { Car } from '@/types/car';
import { FUEL_TYPES, TRANSMISSION_TYPES, KEY_FEATURES_OPTIONS, STATUS_OPTIONS } from '@/constants';

interface BasicInformationFormProps {
  form: UseFormReturnType<Car>;
}

export function BasicInformationForm({ form }: BasicInformationFormProps) {
  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <TextInput
          label="Make"
          placeholder="e.g. BMW"
          required
          {...form.getInputProps('make')}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <TextInput
          label="Model"
          placeholder="e.g. M5"
          required
          {...form.getInputProps('model')}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <TextInput
          label="Year"
          placeholder="e.g. 2023"
          required
          {...form.getInputProps('year')}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <NumberInput
          label="Price"
          placeholder="e.g. 119850"
          required
          min={0}
          {...form.getInputProps('price')}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <NumberInput
          label="Mileage"
          placeholder="e.g. 3425"
          min={0}
          {...form.getInputProps('mileage')}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <TextInput
          label="Location"
          placeholder="e.g. Beverly Hills, CA"
          {...form.getInputProps('location')}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Select
          label="Fuel Type"
          placeholder="Select fuel type"
          data={FUEL_TYPES}
          {...form.getInputProps('fuelType')}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Select
          label="Transmission"
          placeholder="Select transmission type"
          data={TRANSMISSION_TYPES}
          {...form.getInputProps('transmission')}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <Checkbox
          label="Is Electric Vehicle"
          {...form.getInputProps('isElectric', { type: 'checkbox' })}
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <Textarea
          label="Description"
          placeholder="Enter detailed description"
          minRows={4}
          {...form.getInputProps('description')}
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <MultiSelect
          label="Key Features"
          placeholder="Select key features"
          data={KEY_FEATURES_OPTIONS}
          searchable
          {...form.getInputProps('keyFeatures')}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <NumberInput
          label="Rating"
          min={0}
          max={5}
          step={0.1}
          {...form.getInputProps('rating')}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <Select
          label="Status"
          data={STATUS_OPTIONS}
          {...form.getInputProps('status')}
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <DatePickerInput
          label="Request Date"
          placeholder="Pick date"
          {...form.getInputProps('requestDate')}
        />
      </Grid.Col>
    </Grid>
  );
}

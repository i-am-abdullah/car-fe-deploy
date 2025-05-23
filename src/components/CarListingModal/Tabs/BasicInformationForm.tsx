// components/CarListingModal/Tabs/BasicInformationForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { UseFormReturnType } from '@mantine/form';
import { Grid, Select, NumberInput, TextInput, Stack } from '@mantine/core';
import { CarFormValues, CarMake, CarModel, CarYear, CarVariant } from '@/types/car';
import { getCarMakes, getCarModelsByMakeId, getCarYearsByMakeAndModelIds, getCarVariantsByMakeModelAndYearIds } from '@/services/carListingServices';

interface BasicInformationFormProps {
  form: UseFormReturnType<CarFormValues>;
  isEditing?: boolean;
}

export function BasicInformationForm({ form, isEditing }: BasicInformationFormProps) {
  const [makes, setMakes] = useState<CarMake[]>([]);
  const [models, setModels] = useState<CarModel[]>([]);
  const [years, setYears] = useState<CarYear[]>([]);
  const [variants, setVariants] = useState<CarVariant[]>([]);

  const [loadingMakes, setLoadingMakes] = useState(true);
  const [loadingModels, setLoadingModels] = useState(false);
  const [loadingYears, setLoadingYears] = useState(false);
  const [loadingVariants, setLoadingVariants] = useState(false);

  // Load car makes on component mount
  useEffect(() => {
    async function loadMakes() {
      try {
        const data = await getCarMakes();
        setMakes(data);
        console.log(data);

      } catch (error) {
        console.error('Failed to load car makes:', error);
      } finally {
        setLoadingMakes(false);
      }
    }

    loadMakes();
  }, []);

  // Load models when make changes
  useEffect(() => {
    async function loadModels() {
      if (!form.values.make_id) return;

      setLoadingModels(true);
      try {
        const data = await getCarModelsByMakeId(form.values.make_id);
        setModels(data);

        if (!isEditing) {
          form.setFieldValue('model_id', '');
          form.setFieldValue('year_id', '');
          form.setFieldValue('variant_id', '');
        }
      } catch (error) {
        console.error('Failed to load car models:', error);
      } finally {
        setLoadingModels(false);
      }
    }
    loadModels();
  }, [form.values.make_id]);


  // Load years when model changes
  useEffect(() => {
    async function loadYears() {
      if (!form.values.make_id || !form.values.model_id) {
        setYears([]);
        form.setFieldValue('year_id', '');
        return;
      }

      setLoadingYears(true);
      try {
        const data = await getCarYearsByMakeAndModelIds(
          form.values.make_id,
          form.values.model_id
        );
        setYears(data);

        if (!isEditing) {
          form.setFieldValue('year_id', '');
          form.setFieldValue('variant_id', '');
        }
      } catch (error) {
        console.error('Failed to load car years:', error);
      } finally {
        setLoadingYears(false);
      }
    }

    loadYears();
  }, [form.values.make_id, form.values.model_id]);

  // Load variants when year changes
  useEffect(() => {
    async function loadVariants() {
      if (!form.values.make_id || !form.values.model_id || !form.values.year_id) {
        setVariants([]);
        form.setFieldValue('variant_id', '');
        return;
      }

      setLoadingVariants(true);
      try {
        const data = await getCarVariantsByMakeModelAndYearIds(
          form.values.make_id,
          form.values.model_id,
          form.values.year_id
        );
        setVariants(data);

        // Reset dependent field
        if (!isEditing) {
          form.setFieldValue('variant_id', '');
        }
      } catch (error) {
        console.error('Failed to load car variants:', error);
      } finally {
        setLoadingVariants(false);
      }
    }

    loadVariants();
  }, [form.values.make_id, form.values.model_id, form.values.year_id]);

  return (
    <Stack>
      <Grid>
        <Grid.Col span={6}>
          <Select
            label="Make"
            placeholder="Select make"
            data={makes.map((make) => ({ value: make.id, label: make.name }))}
            value={form.values.make_id}
            onChange={(value) => form.setFieldValue('make_id', value || '')}
            error={form.errors.make_id}
            searchable
            required
            disabled={isEditing}

          />
        </Grid.Col>

        <Grid.Col span={6}>
          <Select
            label="Model"
            placeholder="Select model"
            data={models.map((model) => ({ value: model.id, label: model.name }))}
            value={form.values.model_id}
            onChange={(value) => form.setFieldValue('model_id', value || '')}
            error={form.errors.model_id}
            searchable
            disabled={isEditing || !form.values.make_id || loadingModels}
            required
          />
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={6}>
          <Select
            label="Year"
            placeholder="Select year"
            data={years.map((year) => ({
              value: year.id,
              label: year.year.toString()
            }))}
            value={form.values.year_id}
            onChange={(value) => form.setFieldValue('year_id', value || '')}
            error={form.errors.year_id}
            searchable
            disabled={isEditing || !form.values.model_id || loadingYears}
            required
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <Select
            label="Variant"
            placeholder="Select variant"
            data={variants.map((variant) => ({ value: variant.id, label: variant.name }))}
            value={form.values.variant_id}
            onChange={(value) => form.setFieldValue('variant_id', value || '')}
            error={form.errors.variant_id}
            searchable
            disabled={isEditing || !form.values.year_id || loadingVariants}
            required
          />
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={6}>
          <NumberInput
            label="Price"
            placeholder="Enter price"
            value={form.values.price}
            onChange={(value) => form.setFieldValue('price', typeof value === 'number' ? value : 0)}
            error={form.errors.price}
            min={0}
            required
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <NumberInput
            label="Meter Reading (km)"
            placeholder="Enter meter reading"
            value={form.values.meter_reading}
            onChange={(value) => form.setFieldValue('meter_reading', typeof value === 'number' ? value : 0)}
            error={form.errors.meter_reading}
            min={0}
            required
          />
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={6}>
          <TextInput
            label="Color"
            placeholder="Enter color"
            value={form.values.color}
            onChange={(e) => form.setFieldValue('color', e.target.value)}
            error={form.errors.color}
            required
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <TextInput
            label="Location"
            placeholder="Enter location"
            value={form.values.location}
            onChange={(e) => form.setFieldValue('location', e.target.value)}
            error={form.errors.location}
            required
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
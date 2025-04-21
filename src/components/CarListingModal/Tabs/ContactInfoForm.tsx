import { SimpleGrid, TextInput, Select } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { Car } from '@/types/car';
import { SELLER_TYPES } from '@/constants';

interface ContactInfoFormProps {
  form: UseFormReturnType<Car>;
}

export function ContactInfoForm({ form }: ContactInfoFormProps) {
  return (
    <SimpleGrid cols={{ base: 1, md: 2 }}>
      <TextInput
        label="Dealer Name"
        placeholder="e.g. Premium Auto Group"
        {...form.getInputProps('contactInfo.dealerName')}
      />
      <TextInput
        label="Phone"
        placeholder="e.g. (555) 123-4567"
        {...form.getInputProps('contactInfo.phone')}
      />
      <TextInput
        label="Email"
        placeholder="e.g. sales@example.com"
        {...form.getInputProps('contactInfo.email')}
      />
      <TextInput
        label="Hours"
        placeholder="e.g. Mon-Sat: 9AM-8PM, Sun: 10AM-6PM"
        {...form.getInputProps('contactInfo.hours')}
      />
      <TextInput
        label="Address"
        placeholder="e.g. 123 Luxury Lane, Beverly Hills, CA 90210"
        {...form.getInputProps('contactInfo.address')}
      />
      <Select
        label="Seller Type"
        data={SELLER_TYPES}
        {...form.getInputProps('contactInfo.sellerType')}
      />
    </SimpleGrid>
  );
}

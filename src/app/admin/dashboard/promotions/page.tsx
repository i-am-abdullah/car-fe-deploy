// app/admin/promotions/page.tsx
'use client'

import React, { useState } from 'react';
import { 
  Container, 
  Title, 
  Group, 
  Text, 
  Stack, 
  Card, 
  Badge,
  Select
} from '@mantine/core';
import ReusableTable from '@/components/layout/DataTable';
import { mockAdminPromotions } from '@/constants';
import { Promotion } from '@/types/promotion';
import PromotionStatusBadge from '@/components/Promotions/PromotionStatusBadge';

export default function AdminPromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>(mockAdminPromotions);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  const filteredPromotions = statusFilter 
    ? promotions.filter(p => p.status === statusFilter)
    : promotions;

  const columns = [
    {
      key: 'user',
      header: 'User',
      render: (row: Promotion) => (
          <Text size="sm">{row.user?.name}</Text>
      ),
    },
    {
      key: 'car',
      header: 'Car Listing',
      render: (row: Promotion) => (
          <Text size="sm">{row.car?.title}</Text>
      ),
    },
    {
      key: 'planName',
      header: 'Plan',
    },
    {
        key: 'price',
        header: 'Price',
      },
    {
      key: 'startDate',
      header: 'Start Date',
      render: (row: Promotion) => new Date(row.startDate).toLocaleDateString(),
    },
    {
      key: 'endDate',
      header: 'End Date',
      render: (row: Promotion) => new Date(row.endDate).toLocaleDateString(),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row: Promotion) => <PromotionStatusBadge status={row.status} />,
    },
  ];
  
  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <Group justify="apart">
          <Title order={2}>Promotion Management</Title>
          
          <Select
            placeholder="Filter by status"
            value={statusFilter}
            onChange={setStatusFilter}
            clearable
            data={[
              { value: 'active', label: 'Active' },
              { value: 'expired', label: 'Expired' },
              { value: 'cancelled', label: 'Cancelled' },
            ]}
            style={{ width: 200 }}
          />
        </Group>
        
        <Card withBorder shadow="sm" p="md" radius="md">
          <Stack gap="xs">
            <Group justify="apart">
              <Text fw={500}>All Promotions</Text>
              <Group gap="xs">
                <Badge color="green" variant="light">
                  Active: {promotions.filter(p => p.status === 'active').length}
                </Badge>
                <Badge color="gray" variant="light">
                  Expired: {promotions.filter(p => p.status === 'expired').length}
                </Badge>
                <Badge color="red" variant="light">
                  Cancelled: {promotions.filter(p => p.status === 'cancelled').length}
                </Badge>
              </Group>
            </Group>
            
            <ReusableTable
              data={filteredPromotions}
              columns={columns}
              emptyMessage="No promotions found"
            />
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
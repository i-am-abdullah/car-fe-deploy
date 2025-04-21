// app/dashboard/promotions/page.tsx
'use client'

import React, { useState } from 'react';
import { Container, Title, Button, Group, Text, Stack, Card, Modal, Badge } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconCar } from '@tabler/icons-react';
import ReusableTable from '@/components/layout/DataTable';
import { mockPromotions, mockUserCars } from '@/constants';
import CreatePromotionForm from '@/components/Promotions/CreatePromotionForm';
import { Promotion } from '@/types/promotion';
import PromotionStatusBadge from '@/components/Promotions/PromotionStatusBadge';

export default function UserPromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions);
  const [opened, { open, close }] = useDisclosure(false);

  const handleCreatePromotion = (newPromotion: Promotion) => {
    setPromotions((prev) => [...prev, newPromotion]);
    close();
  };

  const handleCancelPromotion = (id: string) => {
    setPromotions((prev) =>
      prev.map((promo) =>
        promo.id === id ? { ...promo, status: 'cancelled' as const } : promo
      )
    );
  };

  const columns = [
    {
      key: 'car',
      header: 'Car Listing',
      render: (row: Promotion) => (
          <Text size="sm">{row.car?.title}</Text>
      ),
    },
    {
      key: 'planName',
      header: 'Promotion Plan',
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
    // {
    //   key: 'actions',
    //   header: 'Actions',
    //   render: (row: Promotion) => (
    //     <Group>
    //       {row.status === 'active' && (
    //         <Button
    //           variant="outline"
    //           color="red"
    //           size="xs"
    //           onClick={() => handleCancelPromotion(row.id)}
    //         >
    //           Cancel
    //         </Button>
    //       )}
    //     </Group>
    //   ),
    // },
  ];

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
      <Group justify="space-between">
        <Text size="xl" fw={700}>Promotions</Text>
        <Button leftSection={<IconPlus size="1rem" />} onClick={open}>
          Create Promotion
        </Button>
      </Group>

        <Card withBorder shadow="sm" p="md" radius="md">
          <ReusableTable
            data={promotions}
            columns={columns}
            emptyMessage="You don't have any promotions yet"
          />
        </Card>

        <Modal
          opened={opened}
          onClose={close}
          title="Create New Promotion"
          size="lg"
        >
          <CreatePromotionForm
            userCars={mockUserCars}
            onSubmit={handleCreatePromotion}
            onCancel={close}
          />
        </Modal>
      </Stack>
    </Container>
  );
}
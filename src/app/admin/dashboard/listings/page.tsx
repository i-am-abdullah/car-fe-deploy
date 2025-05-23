'use client';

import { useState } from 'react';
import { Button, Group, Text, Badge, ActionIcon, Box } from '@mantine/core';
import { IconEdit, IconTrash, IconPlus } from '@tabler/icons-react';
import ReusableTable from '@/components/layout/DataTable';
import { Car } from '@/types/car';
import { CarListingModal } from '@/components/CarListingModal/CarListingModal';

const initialData: Car[] = [
  {
    id: "1",
    price: 119850,
    model: "M5",
    year: "2023",
    location: "Beverly Hills, CA",
    mileage: 3425,
    fuelType: "Premium Gasoline",
    transmission: "8-Speed Automatic",
    isElectric: false,
    make: "BMW",
    rating: 4.8,
    status: 'pending',
    requestDate: new Date(2025, 2, 9), // March 9, 2025
    images: [
      { url: "/car.png", thumbnail: "/car.png" },
      { url: "/car.png", thumbnail: "/car.png" },
    ],
    description: "Experience unmatched driving performance with the 2023 BMW M5...",
    keyFeatures: [
      "4.4L V8 Engine",
      "617 Horsepower",
      "All-Wheel Drive",
    ],
    specifications: [
      { label: "Make", value: "BMW" },
      { label: "Model", value: "M5" },
      { label: "Year", value: "2023" },
    ],
    enginePerformance: [
      { label: "Engine Type", value: "4.4L Twin-Turbo V8" },
      { label: "Horsepower", value: "617 hp @ 6,000 rpm" },
    ],
    faqs: [
      {
        question: "What warranty comes with this BMW M5?",
        answer: "This BMW M5 comes with BMW's standard 4-year/50,000-mile New Vehicle Limited Warranty...",
      },
    ],
    contactInfo: {
      dealerName: "Premium Auto Group",
      phone: "(555) 123-4567",
      email: "sales@premiumautogroup.com",
      address: "123 Luxury Lane, Beverly Hills, CA 90210",
      hours: "Mon-Sat: 9AM-8PM, Sun: 10AM-6PM",
      sellerType: "dealer",
    },
  }
];

export default function CarListingsPage() {
  const [cars, setCars] = useState<Car[]>(initialData);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [modalOpened, setModalOpened] = useState(false);

  const handleAddCar = () => {
    setSelectedCar(null);
    setModalOpened(true);
  };

  const handleEditCar = (car: Car) => {
    setSelectedCar(car);
    setModalOpened(true);
  };

  const handleDeleteCar = (id: string) => {
    if (confirm("Are you sure you want to delete this listing?")) {
      setCars(cars.filter(car => car.id !== id));
    }
  };

  const handleSaveCar = (car: Car) => {
    if (car.id) {
      setCars(cars.map(c => c.id === car.id ? car : c));
    } else {
      const newCar = {
        ...car,
        id: Date.now().toString(),
      };
      setCars([...cars, newCar]);
    }
  };

  const columns = [
    {
      key: 'make',
      header: 'Make',
    },
    {
      key: 'model',
      header: 'Model',
    },
    {
      key: 'year',
      header: 'Year',
    },
    {
      key: 'price',
      header: 'Price',
      render: (car: Car) => `$${car.price.toLocaleString()}`,
    },
    {
      key: 'status',
      header: 'Status',
      render: (car: Car) => {
        const colorMap: Record<string, string> = {
          pending: 'yellow',
          approved: 'green',
          rejected: 'red',
        };
        return (
          <Badge color={colorMap[car.status]}>
            {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
          </Badge>
        );
      },
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (car: Car) => (
        <Group gap="xs">
          <ActionIcon onClick={() => handleEditCar(car)} color="blue">
            <IconEdit size="1rem" />
          </ActionIcon>
          <ActionIcon onClick={() => handleDeleteCar(car.id)} color="red">
            <IconTrash size="1rem" />
          </ActionIcon>
        </Group>
      ),
    },
  ];

  return (
    <Box p="md">
      <Group justify="space-between" mb="md">
        <Text size="xl" fw={700}>Car Listings</Text>
        <Button leftSection={<IconPlus size="1rem" />} onClick={handleAddCar}>
          Add New Listing
        </Button>
      </Group>

      <ReusableTable
        data={cars}
        columns={columns}
        emptyMessage="No car listings found. Click 'Add New Listing' to create one."
      />

      <CarListingModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        initialData={selectedCar}
        onSave={handleSaveCar}
      />
    </Box>
  );
}
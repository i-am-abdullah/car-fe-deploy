'use client';

import { useState, useEffect } from 'react';
import { Container, Title, Button, Group, Card, Text, SimpleGrid, LoadingOverlay } from '@mantine/core';
import { IconPlus, IconCar } from '@tabler/icons-react';
import { CarListingModal } from '@/components/CarListingModal/CarListingModal';
import { deleteCarListing, getUserCarListings,  } from '@/services/carListingServices';
import toast from 'react-hot-toast';
import CarCardManage from '@/components/ui/DashboardCard';
import { useAuth } from '@/hooks/useAuth';

export default function CarListingsPage() {
  const { loading: authLoading } = useAuth();
  const [carListings, setCarListings] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  // Load car listings on component mount
  useEffect(() => {
    if (!authLoading) {
      loadCarListings();
    }
  }, [authLoading]);

  async function loadCarListings() {
    setLoading(true);
    try {
      const data = await getUserCarListings();
      setCarListings(data);
      console.log('Loaded car listings:', data);
    } catch (error) {
      console.error('Failed to load car listings:', error);
      toast.error('Failed to load car listings');
    } finally {
      setLoading(false);
    }
  }

  function openCreateModal() {
    setSelectedCar(null);
    setModalOpened(true);
  }

  function handleEditCar(carId: string) {
    const carToEdit = carListings.items.find((car: any) => car.id === carId);
    if (carToEdit) {
      setSelectedCar(carToEdit);
      setModalOpened(true);
    }
  }

  async function handleDeleteCar(carId: string) {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        setDeleteLoading(carId);
        await deleteCarListing(carId);
        toast.success('Car listing deleted successfully');
        loadCarListings();
      } catch (error) {
        console.error('Failed to delete car listing:', error);
        toast.error('Failed to delete car listing');
      } finally {
        setDeleteLoading(null);
      }
    }
  }

  function handleModalClose() {
    setModalOpened(false);
  }

  function handleSuccess() {
    loadCarListings();
  }

  // Map API data to CarCardManage props
  function mapCarToCardProps(car: any) {
    const isElectric = car.additionalDetail?.fuel_type === 'electric';
    
    return {
      id: car.id,
      image: car.images?.[0]?.image_url || '/placeholder-car.jpg',
      price: parseFloat(car.price),
      location: car.location || 'Unknown',
      model: `${car.make?.name || 'Unknown'} ${car.model?.name || ''} ${car.variant?.name || ''}`.trim(),
      year: car.year?.year?.toString() || 'Unknown',
      mileage: car.meter_reading || 0,
      fuelType: car.additionalDetail?.fuel_type || 'Unknown',
      transmission: car.additionalDetail?.transmission || 'Unknown',
      isElectric,
      isFavorite: false,
      status: car.status || 'draft',
      onEdit: handleEditCar,
      onDelete: handleDeleteCar
    };
  }

  return (
    <Container size="xl" py="xl">
      {authLoading ? (
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <LoadingOverlay visible={true} />
        </div>
      ) : (
      <>
      <Group justify="space-between" mb="xl">
        <Title>My Car Listings</Title>
        <Button leftSection={<IconPlus size={18} />} onClick={openCreateModal}>
          Add New Listing
        </Button>
      </Group>

      <div style={{ position: 'relative', minHeight: '200px' }}>
        <LoadingOverlay visible={loading} />

        {!loading && (!carListings.items || carListings.items.length === 0) && (
          <Card withBorder p="xl" radius="md" style={{ textAlign: 'center' }}>
            <IconCar size={48} style={{ margin: 'auto' }} />
            <Text size="lg" fw={500} mt="md">
              No car listings yet
            </Text>
            <Text size="sm" color="dimmed" mt="sm">
              Create a new car listing to showcase your vehicle for sale.
            </Text>
            <Button mt="xl" onClick={openCreateModal}>
              Create First Listing
            </Button>
          </Card>
        )}

        {carListings?.items?.length > 0 && (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
            {carListings.items.map((car: any) => (
              <div key={car.id} className={deleteLoading === car.id ? "opacity-50 pointer-events-none" : ""}>
                <CarCardManage {...mapCarToCardProps(car)} />
              </div>
            ))}
          </SimpleGrid>
        )}
      </div>

      <CarListingModal
        opened={modalOpened}
        onClose={handleModalClose}
        initialData={selectedCar}
        onSuccess={handleSuccess}
      />
      </>
      )}
    </Container>
  );
}
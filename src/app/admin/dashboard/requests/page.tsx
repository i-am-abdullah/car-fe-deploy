'use client'

import React, { useState, useEffect } from 'react';
import { 
  Group, 
  Text, 
  ActionIcon, 
  Badge, 
  Modal, 
  ScrollArea,
  Title,
  Grid,
  Card,
  Image,
  List,
  Divider,
  Button,
  Box,
  LoadingOverlay,
  Container
} from '@mantine/core';
import { IconEye, IconCheck, IconX } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import toast from 'react-hot-toast';
import ReusableTable from '@/components/layout/DataTable';
import { getAllCarListings,  updateCarListingStatus, type CarListing, 
  type CarListingResponse  } from '@/services/carListingAdminServices';

const CarRequestsList = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedCar, setSelectedCar] = useState<CarListing | null>(null);
  const [carListings, setCarListings] = useState<CarListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    loadCarListings();
  }, []);

  const loadCarListings = async () => {
    try {
      setLoading(true);
      const response: CarListingResponse = await getAllCarListings();
      setCarListings(response.items);
    } catch (error) {
      console.error('Failed to load car listings:', error);
      toast.error('Failed to load car listings');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (car: CarListing) => {
    setSelectedCar(car);
    open();
  };

  const handleStatusUpdate = async (carId: string, status: 'active' | 'rejected') => {
    try {
      setActionLoading(carId);
      await updateCarListingStatus(carId, status);
      toast.success(`Listing ${status === 'active' ? 'approved' : 'rejected'} successfully`);
      loadCarListings(); // Reload the data
    } catch (error) {
      console.error('Failed to update listing status:', error);
      toast.error('Failed to update listing status');
    } finally {
      setActionLoading(null);
    }
  };

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return numPrice.toLocaleString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'rejected': return 'red';
      case 'pending': return 'yellow';
      case 'draft': return 'blue';
      case 'sold': return 'purple';
      case 'inactive': return 'gray';
      default: return 'blue';
    }
  };

  const columns = [
    { 
      key: 'id', 
      header: 'ID',
      render: (row: CarListing) => (
        <Text size="sm" style={{ fontFamily: 'monospace' }}>
          {row.id.substring(0, 8)}...
        </Text>
      )
    },
    { 
      key: 'makeModel', 
      header: 'Vehicle',
      render: (row: CarListing) => (
        <div>
          <Text fw={500}>{row.make.name} {row.model.name}</Text>
          <Text size="sm" c="dimmed">{row.variant.name} ({row.year.year})</Text>
        </div>
      )
    },
    { 
      key: 'price', 
      header: 'Price',
      render: (row: CarListing) => (
        <Text fw={500}>${formatPrice(row.price)}</Text>
      )
    },
    { 
      key: 'location', 
      header: 'Location',
      render: (row: CarListing) => (
        <Text>{row.location}</Text>
      )
    },
    { 
      key: 'mileage', 
      header: 'Mileage',
      render: (row: CarListing) => (
        <Text>{row.meter_reading.toLocaleString()} miles</Text>
      )
    },
    { 
      key: 'listingDate', 
      header: 'Listed Date',
      render: (row: CarListing) => (
        <Text size="sm">{formatDate(row.listing_date)}</Text>
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (row: CarListing) => (
        <Badge color={getStatusColor(row.status)} variant="filled">
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </Badge>
      )
    },
    { 
      key: 'actions', 
      header: 'Actions',
      render: (row: CarListing) => (
        <Group gap="xs">
          <ActionIcon 
            variant="subtle" 
            color="blue" 
            onClick={() => handleViewDetails(row)}
            title="View Details"
          >
            <IconEye size={18} />
          </ActionIcon>
          {row.status === 'draft' && (
            <>
              <ActionIcon 
                variant="subtle" 
                color="green"
                title="Approve Listing"
                loading={actionLoading === row.id}
                onClick={() => handleStatusUpdate(row.id, 'active')}
              >
                <IconCheck size={18} />
              </ActionIcon>
              <ActionIcon 
                variant="subtle" 
                color="red"
                title="Reject Listing"
                loading={actionLoading === row.id}
                onClick={() => handleStatusUpdate(row.id, 'rejected')}
              >
                <IconX size={18} />
              </ActionIcon>
            </>
          )}
        </Group>
      )
    },
  ];

  return (
    <Container size="xl" py="xl">
      <Title order={2} mb="md">Car Listing Requests</Title>
      
      <div style={{ position: 'relative', minHeight: '400px' }}>
        <LoadingOverlay visible={loading} />
        
        <ReusableTable
          data={carListings}
          columns={columns}
          tableProps={{
            striped: true,
            highlightOnHover: true,
          }}
          emptyMessage="No car listing requests found"
        />
      </div>

      {/* Details Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title={
          <Title order={3}>
            {selectedCar?.year.year} {selectedCar?.make.name} {selectedCar?.model.name} Details
          </Title>
        }
        size="xl"
      >
        {selectedCar && (
          <ScrollArea h={600} offsetScrollbars>
            <Grid>
              {/* Main details section */}
              <Grid.Col span={12}>
                <Card p="md" withBorder mb="md">
                  <Group mb="md" justify="space-between">
                    <div>
                      <Title order={4}>
                        {selectedCar.year.year} {selectedCar.make.name} {selectedCar.model.name}
                      </Title>
                      <Text c="dimmed">{selectedCar.variant.name} - {selectedCar.variant.description}</Text>
                    </div>
                    <Badge color={getStatusColor(selectedCar.status)} size="lg">
                      {selectedCar.status.charAt(0).toUpperCase() + selectedCar.status.slice(1)}
                    </Badge>
                  </Group>
                  <Group mb="md">
                    <Text fw={700} size="xl" c="blue">${formatPrice(selectedCar.price)}</Text>
                    <Badge color={selectedCar.additionalDetail.fuel_type === 'electric' ? 'teal' : 'orange'} variant="outline">
                      {selectedCar.additionalDetail.fuel_type}
                    </Badge>
                    <Text c="dimmed">{selectedCar.location}</Text>
                  </Group>
                  <Text>{selectedCar.generalDetail.description}</Text>
                </Card>
              </Grid.Col>

              {/* Images section */}
              <Grid.Col span={12}>
                <Card p="md" withBorder mb="md">
                  <Title order={5} mb="md">Images</Title>
                  <Grid>
                    {selectedCar.images.map((image, index) => (
                      <Grid.Col span={4} key={image.id}>
                        <Image
                          src={image.image_url}
                          alt={`${selectedCar.make.name} ${selectedCar.model.name} image ${index + 1}`}
                          radius="md"
                          fallbackSrc="/placeholder-car.jpg"
                        />
                      </Grid.Col>
                    ))}
                  </Grid>
                </Card>
              </Grid.Col>

              {/* Vehicle Details */}
              <Grid.Col span={6}>
                <Card p="md" withBorder mb="md" h="100%">
                  <Title order={5} mb="md">Vehicle Details</Title>
                  <Box>
                    <Group justify="space-between">
                      <Text fw={500}>Color:</Text>
                      <Text>{selectedCar.color}</Text>
                    </Group>
                    <Divider my="xs" />
                    <Group justify="space-between">
                      <Text fw={500}>Mileage:</Text>
                      <Text>{selectedCar.meter_reading.toLocaleString()} miles</Text>
                    </Group>
                    <Divider my="xs" />
                    <Group justify="space-between">
                      <Text fw={500}>Registration City:</Text>
                      <Text>{selectedCar.registrationCity.name}</Text>
                    </Group>
                    <Divider my="xs" />
                    <Group justify="space-between">
                      <Text fw={500}>Registration Year:</Text>
                      <Text>{selectedCar.generalDetail.registration_year}</Text>
                    </Group>
                    <Divider my="xs" />
                    <Group justify="space-between">
                      <Text fw={500}>Registration Number:</Text>
                      <Text>{selectedCar.generalDetail.registration_number}</Text>
                    </Group>
                    <Divider my="xs" />
                    <Group justify="space-between">
                      <Text fw={500}>Ownership:</Text>
                      <Text>{selectedCar.generalDetail.ownership_status}</Text>
                    </Group>
                    <Divider my="xs" />
                    <Group justify="space-between">
                      <Text fw={500}>Accident History:</Text>
                      <Badge color={selectedCar.generalDetail.accident_history ? 'red' : 'green'} size="sm">
                        {selectedCar.generalDetail.accident_history ? 'Yes' : 'No'}
                      </Badge>
                    </Group>
                  </Box>
                </Card>
              </Grid.Col>

              {/* Seller Information */}
              <Grid.Col span={6}>
                <Card p="md" withBorder mb="md" h="100%">
                  <Title order={5} mb="md">Seller Information</Title>
                  <Text fw={500}>Full Name: {selectedCar.user.first_name} {selectedCar.user.last_name}</Text>
                  <Text>Username: @{selectedCar.user.username}</Text>
                  <Text>Email: {selectedCar.user.email}</Text>
                  <Text>Phone: {selectedCar.user.phone_number}</Text>
                  <Badge color={selectedCar.user.is_verified ? 'green' : 'red'} size="sm" mt="xs">
                    {selectedCar.user.is_verified ? 'Verified' : 'Not Verified'}
                  </Badge>
                </Card>
              </Grid.Col>

              {/* Engine & Performance */}
              <Grid.Col span={6}>
                <Card p="md" withBorder mb="md">
                  <Title order={5} mb="md">Engine & Performance</Title>
                  <Box>
                    <Group justify="space-between">
                      <Text fw={500}>Engine Type:</Text>
                      <Text>{selectedCar.additionalDetail.engine_type}</Text>
                    </Group>
                    <Divider my="xs" />
                    <Group justify="space-between">
                      <Text fw={500}>Engine Capacity:</Text>
                      <Text>{selectedCar.additionalDetail.engine_capacity}</Text>
                    </Group>
                    <Divider my="xs" />
                    <Group justify="space-between">
                      <Text fw={500}>Transmission:</Text>
                      <Text>{selectedCar.additionalDetail.transmission}</Text>
                    </Group>
                    <Divider my="xs" />
                    <Group justify="space-between">
                      <Text fw={500}>Assembly:</Text>
                      <Text>{selectedCar.additionalDetail.assembly}</Text>
                    </Group>
                    <Divider my="xs" />
                    <Group justify="space-between">
                      <Text fw={500}>Fuel Type:</Text>
                      <Text>{selectedCar.additionalDetail.fuel_type}</Text>
                    </Group>
                  </Box>
                </Card>
              </Grid.Col>

              {/* Selling Information */}
              <Grid.Col span={6}>
                <Card p="md" withBorder mb="md">
                  <Title order={5} mb="md">Selling Information</Title>
                  <Box>
                    <Group justify="space-between">
                      <Text fw={500}>Reason for Selling:</Text>
                      <Text>{selectedCar.generalDetail.reason_for_selling}</Text>
                    </Group>
                    <Divider my="xs" />
                    <Group justify="space-between">
                      <Text fw={500}>Listed Date:</Text>
                      <Text>{formatDate(selectedCar.listing_date)}</Text>
                    </Group>
                    <Divider my="xs" />
                    <Group justify="space-between">
                      <Text fw={500}>Last Updated:</Text>
                      <Text>{formatDate(selectedCar.updated_at)}</Text>
                    </Group>
                    <Divider my="xs" />
                    <Group justify="space-between">
                      <Text fw={500}>Featured Until:</Text>
                      <Text>{selectedCar.featured_until ? formatDate(selectedCar.featured_until) : 'Not Featured'}</Text>
                    </Group>
                  </Box>
                </Card>
              </Grid.Col>
            </Grid>

            {/* Action buttons */}
            <Group justify="right" mt="xl">
              <Button variant="outline" color="gray" onClick={close}>Close</Button>
              {selectedCar.status === 'draft' && (
                <>
                  <Button 
                    variant="outline" 
                    color="red"
                    loading={actionLoading === selectedCar.id}
                    onClick={() => {
                      handleStatusUpdate(selectedCar.id, 'rejected');
                      close();
                    }}
                  >
                    Reject Listing
                  </Button>
                  <Button 
                    color="blue"
                    loading={actionLoading === selectedCar.id}
                    onClick={() => {
                      handleStatusUpdate(selectedCar.id, 'active');
                      close();
                    }}
                  >
                    Approve Listing
                  </Button>
                </>
              )}
            </Group>
          </ScrollArea>
        )}
      </Modal>
    </Container>
  );
};

export default CarRequestsList;
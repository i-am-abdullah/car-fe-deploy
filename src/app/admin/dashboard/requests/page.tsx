'use client'

import { useState } from 'react';
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
  Box
} from '@mantine/core';
import { IconEye, IconCheck, IconX } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import ReusableTable from '@/components/layout/DataTable';

interface Image {
  url: string;
  thumbnail: string;
}

interface Specification {
  label: string;
  value: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface ContactInfo {
  dealerName: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  sellerType: string;
}

interface Car {
  id: string;
  price: number;
  model: string;
  year: string;
  location: string;
  mileage: number;
  fuelType: string;
  transmission: string;
  isElectric: boolean;
  make: string;
  rating: number;
  images: Image[];
  description: string;
  keyFeatures: string[];
  specifications: Specification[];
  enginePerformance: Specification[];
  faqs: FAQ[];
  contactInfo: ContactInfo;
}

type RequestStatus = 'pending' | 'approved' | 'rejected';
interface CarRequestWithStatus extends Car {
  status: RequestStatus;
  requestDate: Date;
}

const carRequests: CarRequestWithStatus[] = [
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
      { url: "/car.png", thumbnail: "/car.png" },
      { url: "/car.png", thumbnail: "/car.png" },
      { url: "/car.png", thumbnail: "/car.png" },
    ],
    description:
      "Experience unmatched driving performance with the 2023 BMW M5. This luxury sedan combines elegant design with raw power. Featuring the latest M TwinPower Turbo technology, the M5 delivers exhilarating performance with precise handling. The interior boasts premium materials, cutting-edge technology, and exceptional comfort for both driver and passengers. With its distinctive styling and advanced safety features, the BMW M5 represents the perfect blend of luxury and high-performance engineering.",
    keyFeatures: [
      "4.4L V8 Engine",
      "617 Horsepower",
      "All-Wheel Drive",
      "8-Speed Automatic",
      "Premium Sound System",
      "Leather Interior",
      "Heated/Ventilated Seats",
      "Heads-Up Display",
      "Lane Departure Warning",
    ],
    specifications: [
      { label: "Make", value: "BMW" },
      { label: "Model", value: "M5" },
      { label: "Year", value: "2023" },
      { label: "Body Type", value: "Sedan" },
      { label: "Exterior Color", value: "Marina Bay Blue" },
      { label: "Interior Color", value: "Black" },
      { label: "Doors", value: "4" },
      { label: "Seats", value: "5" },
      { label: "VIN", value: "WBS83CD09MCF12345" },
      { label: "Fuel Type", value: "Premium Gasoline" },
      { label: "Transmission", value: "8-Speed Automatic" },
      { label: "Drive Type", value: "All-Wheel Drive" },
      { label: "Mileage", value: "3,425 miles" },
      { label: "Fuel Efficiency", value: "15 City / 21 Hwy" },
      { label: "Car Condition", value: "Excellent" },
    ],
    enginePerformance: [
      { label: "Engine Type", value: "4.4L Twin-Turbo V8" },
      { label: "Horsepower", value: "617 hp @ 6,000 rpm" },
      { label: "Torque", value: "553 lb-ft @ 1,800 rpm" },
      { label: "0-60 mph", value: "3.2 seconds" },
      { label: "Top Speed", value: "189 mph (limited)" },
      { label: "Transmission", value: "8-Speed Automatic" },
      { label: "Drive Type", value: "All-Wheel Drive" },
      { label: "Fuel System", value: "Direct Injection" },
      { label: "Engine Location", value: "Front" },
    ],
    faqs: [
      {
        question: "What warranty comes with this BMW M5?",
        answer:
          "This BMW M5 comes with BMW's standard 4-year/50,000-mile New Vehicle Limited Warranty, plus a 4-year/unlimited-mileage Roadside Assistance Program. Additionally, it includes a 12-year/unlimited-mileage Rust Perforation Limited Warranty and a 4-year/50,000-mile Federal Emissions Warranty.",
      },
      {
        question: "Is there an extended warranty available?",
        answer:
          "Yes, BMW offers an Extended Service Contract that can be purchased to cover your vehicle after the standard warranty expires. There are several coverage levels available with terms up to 7 years or 100,000 miles from the original in-service date.",
      },
      {
        question: "What does the maintenance schedule look like for the M5?",
        answer:
          "The BMW M5 uses condition-based servicing, which means the vehicle will alert you when service is needed based on actual driving conditions rather than a fixed schedule. However, typical service intervals include oil changes every 10,000 miles or 12 months, brake fluid every 2 years, and more comprehensive inspections at 30,000 and 60,000 miles.",
      },
      {
        question: "Are there any dealer incentives currently available?",
        answer:
          "We currently offer competitive financing rates starting at 2.9% APR for qualified buyers, as well as special lease terms. Additionally, we have a loyalty program that offers additional benefits for current BMW owners looking to upgrade their vehicle.",
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
  },
  {
    id: "2",
    price: 65000,
    model: "Model S",
    year: "2022",
    location: "San Francisco, CA",
    mileage: 12500,
    fuelType: "Electric",
    transmission: "Single-Speed",
    isElectric: true,
    make: "Tesla",
    rating: 4.6,
    status: 'approved',
    requestDate: new Date(2025, 2, 5), // March 5, 2025
    images: [
      { url: "/car.png", thumbnail: "/car.png" },
      { url: "/car.png", thumbnail: "/car.png" },
    ],
    description: "Tesla Model S with full self-driving capability...",
    keyFeatures: [
      "Dual Motor All-Wheel Drive",
      "Full Self-Driving Capability",
      "390 Mile Range",
      "0-60 mph in 3.1s",
    ],
    specifications: [
      { label: "Make", value: "Tesla" },
      { label: "Model", value: "Model S" },
      { label: "Year", value: "2022" },
    ],
    enginePerformance: [
      { label: "Motor Type", value: "Dual Electric Motors" },
      { label: "Horsepower", value: "670 hp" },
    ],
    faqs: [
      {
        question: "What's the charging time?",
        answer: "Approximately 15 minutes to 80% at a Supercharger station.",
      },
    ],
    contactInfo: {
      dealerName: "EV Direct",
      phone: "(555) 987-6543",
      email: "sales@evdirect.com",
      address: "456 Tech Drive, San Francisco, CA 94105",
      hours: "Mon-Fri: 9AM-7PM, Sat-Sun: 10AM-5PM",
      sellerType: "dealer",
    },
  },
  {
    id: "3",
    price: 42950,
    model: "Wrangler Rubicon",
    year: "2021",
    location: "Denver, CO",
    mileage: 18750,
    fuelType: "Gasoline",
    transmission: "8-Speed Automatic",
    isElectric: false,
    make: "Jeep",
    rating: 4.4,
    status: 'rejected',
    requestDate: new Date(2025, 2, 1), // March 1, 2025
    images: [
      { url: "/car.png", thumbnail: "/car.png" },
      { url: "/car.png", thumbnail: "/car.png" },
    ],
    description: "Off-road ready Jeep Wrangler with upgrades...",
    keyFeatures: [
      "3.6L V6 Engine",
      "Rock-Trac 4x4 System",
      "Electronic Front Sway Bar Disconnect",
      "Off-Road Package",
    ],
    specifications: [
      { label: "Make", value: "Jeep" },
      { label: "Model", value: "Wrangler Rubicon" },
      { label: "Year", value: "2021" },
    ],
    enginePerformance: [
      { label: "Engine Type", value: "3.6L V6" },
      { label: "Horsepower", value: "285 hp @ 6,400 rpm" },
    ],
    faqs: [
      {
        question: "Is this Wrangler trail-rated?",
        answer: "Yes, this Rubicon model has Jeep's Trail Rated badge, meaning it has passed tests for traction, water fording, maneuverability, articulation, and ground clearance.",
      },
    ],
    contactInfo: {
      dealerName: "Mountain Motors",
      phone: "(555) 456-7890",
      email: "info@mountainmotors.com",
      address: "789 High Trail, Denver, CO 80202",
      hours: "Mon-Sat: 8AM-7PM, Sun: Closed",
      sellerType: "dealer",
    },
  }
];

const CarRequestsList = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedCar, setSelectedCar] = useState<CarRequestWithStatus | null>(null);

  const handleViewDetails = (car: CarRequestWithStatus) => {
    setSelectedCar(car);
    open();
  };

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case 'approved': return 'green';
      case 'rejected': return 'red';
      default: return 'blue';
    }
  };

  const columns = [
    { 
      key: 'id', 
      header: 'ID' 
    },
    { 
      key: 'makeModel', 
      header: 'Make & Model',
      render: (row: CarRequestWithStatus) => (
        <>{row.make} {row.model}</>
      )
    },
    { 
      key: 'year', 
      header: 'Year' 
    },
    { 
      key: 'price', 
      header: 'Price',
      render: (row: CarRequestWithStatus) => (
        <>${formatPrice(row.price)}</>
      )
    },
    { 
      key: 'location', 
      header: 'Location' 
    },
    { 
      key: 'requestDate', 
      header: 'Request Date',
      render: (row: CarRequestWithStatus) => (
        <>{formatDate(row.requestDate)}</>
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (row: CarRequestWithStatus) => (
        <Badge color={getStatusColor(row.status)} variant="filled">
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </Badge>
      )
    },
    { 
      key: 'actions', 
      header: 'Actions',
      render: (row: CarRequestWithStatus) => (
        <Group >
          <ActionIcon 
            variant="subtle" 
            color="blue" 
            onClick={() => handleViewDetails(row)}
            title="View Details"
          >
            <IconEye size={18} />
          </ActionIcon>
          {row.status === 'pending' && (
            <>
              <ActionIcon 
                variant="subtle" 
                color="green"
                title="Approve Request"
              >
                <IconCheck size={18} />
              </ActionIcon>
              <ActionIcon 
                variant="subtle" 
                color="red"
                title="Reject Request"
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
    <>
      <Title order={2} mb="md">Car Listing Requests</Title>
      
      {/* Using the ReusableTable component */}
      <ReusableTable
        data={carRequests}
        columns={columns}
        tableProps={{
          striped: true,
          highlightOnHover: true,
        }}
        emptyMessage="No car listing requests found"
      />

      {/* Details Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title={<Title order={3}>{selectedCar?.make} {selectedCar?.model} Details</Title>}
        size="xl"
      >
        {selectedCar && (
          <ScrollArea h={600} offsetScrollbars>
            <Grid>
              {/* Main details section */}
              <Grid.Col span={12}>
                <Card p="md" withBorder mb="md">
                  <Group mb="md">
                    <Title order={4}>{selectedCar.year} {selectedCar.make} {selectedCar.model}</Title>
                    <Badge color={getStatusColor(selectedCar.status)} size="lg">
                      {selectedCar.status.charAt(0).toUpperCase() + selectedCar.status.slice(1)}
                    </Badge>
                  </Group>
                  <Group mb="md">
                    <Text fw={700} size="xl" color="blue">${formatPrice(selectedCar.price)}</Text>
                    <Badge color={selectedCar.isElectric ? 'teal' : 'orange'} variant="outline">
                      {selectedCar.isElectric ? 'Electric' : selectedCar.fuelType}
                    </Badge>
                    <Text color="dimmed">{selectedCar.location}</Text>
                  </Group>
                  <Text>{selectedCar.description}</Text>
                </Card>
              </Grid.Col>

              {/* Images section */}
              <Grid.Col span={12}>
                <Card p="md" withBorder mb="md">
                  <Title order={5} mb="md">Images</Title>
                  <Grid>
                    {selectedCar.images.map((image, index) => (
                      <Grid.Col span={4} key={index}>
                        <Image
                          src={image.url}
                          alt={`${selectedCar.make} ${selectedCar.model} image ${index + 1}`}
                          radius="md"
                        />
                      </Grid.Col>
                    ))}
                  </Grid>
                </Card>
              </Grid.Col>

              {/* Key Features */}
              <Grid.Col span={6}>
                <Card p="md" withBorder mb="md" h="100%">
                  <Title order={5} mb="md">Key Features</Title>
                  <List>
                    {selectedCar.keyFeatures.map((feature, index) => (
                      <List.Item key={index}>{feature}</List.Item>
                    ))}
                  </List>
                </Card>
              </Grid.Col>

              {/* Contact Info */}
              <Grid.Col span={6}>
                <Card p="md" withBorder mb="md" h="100%">
                  <Title order={5} mb="md">Seller Information</Title>
                  <Text fw={500}>{selectedCar.contactInfo.dealerName}</Text>
                  <Text>{selectedCar.contactInfo.address}</Text>
                  <Text>{selectedCar.contactInfo.phone}</Text>
                  <Text>{selectedCar.contactInfo.email}</Text>
                  <Text size="sm" mt="xs" color="dimmed">{selectedCar.contactInfo.hours}</Text>
                </Card>
              </Grid.Col>

              {/* Specifications */}
              <Grid.Col span={6}>
                <Card p="md" withBorder mb="md">
                  <Title order={5} mb="md">Specifications</Title>
                  <Box>
                    {selectedCar.specifications.map((spec, index) => (
                      <div key={index}>
                        <Group>
                          <Text fw={500}>{spec.label}:</Text>
                          <Text>{spec.value}</Text>
                        </Group>
                        {index < selectedCar.specifications.length - 1 && <Divider my="xs" />}
                      </div>
                    ))}
                  </Box>
                </Card>
              </Grid.Col>

              {/* Engine Performance */}
              <Grid.Col span={6}>
                <Card p="md" withBorder mb="md">
                  <Title order={5} mb="md">Engine & Performance</Title>
                  <Box>
                    {selectedCar.enginePerformance.map((spec, index) => (
                      <div key={index}>
                        <Group justify="apart">
                          <Text fw={500}>{spec.label}:</Text>
                          <Text>{spec.value}</Text>
                        </Group>
                        {index < selectedCar.enginePerformance.length - 1 && <Divider my="xs" />}
                      </div>
                    ))}
                  </Box>
                </Card>
              </Grid.Col>

              {/* FAQs */}
              <Grid.Col span={12}>
                <Card p="md" withBorder mb="md">
                  <Title order={5} mb="md">Frequently Asked Questions</Title>
                  {selectedCar.faqs.map((faq, index) => (
                    <div key={index}>
                      <Text fw={700} mb="xs">{faq.question}</Text>
                      <Text mb="lg">{faq.answer}</Text>
                      {index < selectedCar.faqs.length - 1 && <Divider my="md" />}
                    </div>
                  ))}
                </Card>
              </Grid.Col>
            </Grid>

            {/* Action buttons */}
            <Group justify="right" mt="xl">
              <Button variant="outline" color="gray" onClick={close}>Close</Button>
              {selectedCar.status === 'pending' && (
                <>
                  <Button variant="outline" color="red">Reject Listing</Button>
                  <Button color="blue">Approve Listing</Button>
                </>
              )}
            </Group>
          </ScrollArea>
        )}
      </Modal>
    </>
  );
};

export default CarRequestsList;
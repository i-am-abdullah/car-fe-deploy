'use client';

import { 
  Title, 
  SimpleGrid, 
  Container, 
} from '@mantine/core';
import { StatsCard } from '@/components/ui/StatsCard';
import { 
  IconListDetails,
  IconHeart,
  IconUser
} from '@tabler/icons-react';
import { StatsData } from '@/types/stats';
import { User, User2 } from 'lucide-react';

const data: StatsData[] = [
  { 
    title: 'Number of Users', 
    value: '28', 
    diff: 18.5, 
    icon: IconUser,
    color: 'blue'
  },
  { 
    title: 'Active Listings', 
    value: '17', 
    diff: 7.2, 
    icon: IconListDetails,
    color: 'green'
  },
  { 
    title: 'InActive Listings', 
    value: '11', 
    diff: -12.4, 
    icon: IconListDetails,
    color: 'yellow'
  },
  { 
    title: 'Saved Listings', 
    value: '10', 
    diff: 11.3, 
    icon: IconHeart,
    color: 'red'
  },
];


export default function DashboardPage() {
  const stats = data.map((stat) => (
    <StatsCard key={stat.title} {...stat} />
  ));

  return (
    <Container mt="xl" size="lg">
      <Title order={2} mb="xl">Dashboard Overview</Title>
      
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>
        {stats}
      </SimpleGrid>
{/*       
      <SimpleGrid cols={{ base: 1, md: 2 }} mt="xl">
        <Card withBorder padding="lg">
          <Title order={3} mb="md">Conversion Funnel</Title>
          <Group mt="md">
            <RingProgress
              size={170}
              thickness={14}
              sections={[
                { value: 80, color: 'blue' },
                { value: 45, color: 'teal' },
                { value: 15, color: 'orange' }
              ]}
              label={
                <Center>
                  <Text fw={700} size="xl">15%</Text>
                </Center>
              }
            />
            <div>
              <Text c="dimmed" mb="xs">Conversion stats</Text>
              <Group gap="xs" mb="xs">
                <div style={{ width: 10, height: 10, backgroundColor: 'blue', borderRadius: '50%' }}></div>
                <Text size="sm">Visitors: 12,452</Text>
              </Group>
              <Group gap="xs" mb="xs">
                <div style={{ width: 10, height: 10, backgroundColor: 'teal', borderRadius: '50%' }}></div>
                <Text size="sm">Leads: 5,641</Text>
              </Group>
              <Group gap="xs">
                <div style={{ width: 10, height: 10, backgroundColor: 'orange', borderRadius: '50%' }}></div>
                <Text size="sm">Purchases: 1,832</Text>
              </Group>
            </div>
          </Group>
        </Card>
        
        <Card withBorder padding="lg">
          <Title order={3} mb="md">Recent Activity</Title>
          <Text size="sm" c="dimmed" mb="md">Latest user actions from your platform</Text>
          
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Paper key={i} p="xs" mb="xs" withBorder>
                <Group>
                  <ThemeIcon 
                    size="lg" 
                    variant="light" 
                    color={['blue', 'green', 'orange', 'red', 'violet'][i % 5]}
                  >
                    <IconUsers size={16} />
                  </ThemeIcon>
                  <div>
                    <Text size="sm" fw={500}>User #{i + 1001} performed an action</Text>
                    <Text size="xs" c="dimmed">{30 - i * 5} minutes ago</Text>
                  </div>
                </Group>
              </Paper>
            ))}
        </Card>
      </SimpleGrid> */}
    </Container>
  );
}

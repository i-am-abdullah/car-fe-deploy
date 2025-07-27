import { 
    Text, 
    Group, 
    Paper, 
    ThemeIcon,
    rem
  } from '@mantine/core';
  import { StatsData } from '@/types/stats';

interface StatsCardProps extends StatsData {}

export function StatsCard({ title, value, diff, icon: Icon, color }: StatsCardProps) {
  
  return (
    <Paper withBorder p="md" radius="md">
      <Group justify="space-between">
        <div>
          <Text size="xs" color="dimmed">
            {title}
          </Text>
          <Text fw={700} size="xl">
            {value}
          </Text>
        </div>
        <ThemeIcon color={color} variant="light" size={38} radius="md">
          <Icon style={{ width: rem(24), height: rem(24) }} />
        </ThemeIcon>
      </Group>
      
      {/* <Group gap="xs" mt="md">
        <Text component="span" c={diff > 0 ? 'teal' : 'red'} fw={700}>
          {diff > 0 ? '+' : ''}{diff}%
        </Text>
        <Text component="span" size="sm" c="dimmed">
          compared to previous month
        </Text>
      </Group> */}
    </Paper>
  );
}

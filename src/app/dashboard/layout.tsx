'use client';

import { AppShell, Burger, Button, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavbarSimple } from '@/components/DashboardNav/NavBarDashboard';
import { User } from 'lucide-react';
import { useRouter } from 'next/navigation'; // ✅ import router

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();
  const router = useRouter(); // ✅ initialize router

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened }
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group justify='space-between'>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            {/* <User size={30} /> */}
            <Button variant="light" onClick={() => router.push('/')}>
              Go to Home
            </Button>

          </Group>
          <Button variant="light" onClick={() => router.push('/dashboard/edit-profile')}>
            Edit Profile
          </Button>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        <NavbarSimple />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

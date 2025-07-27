// app/signup/page.tsx
'use client';

import { useState } from 'react';
import {
  Container,
  Paper,
  Title,
  Group,
  Anchor,
  Button,
  Text,
} from '@mantine/core';
import { InputField } from '@/components/Input/Input';
import { signup } from '@/services/authService';
import Link from 'next/link';

export default function SignupPage() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (key: string, val: any) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async () => {
    await signup(form);
    // on success → router.push('/login') or so
  };

  return (
    <Container size={420} my={40}>
      <Title mb="sm">
        Create an Account!
      </Title>
      <Text color="dimmed" size="sm">
        Already have an account?{' '}
<Link href="/login" passHref legacyBehavior>
  <Anchor size="sm">Login</Anchor>
</Link>
      </Text>

      <Paper withBorder shadow="md" p="lg" mt="xl" radius="md">
        <InputField
          label="First Name"
          value={form.first_name}
          onChange={(v) => handleChange('first_name', v)}
        />
        <InputField
          label="Last Name"
          value={form.last_name}
          onChange={(v) => handleChange('last_name', v)}
          mt="md"
        />
        <InputField
          label="Phone Number"
          value={form.phone_number}
          onChange={(v) => handleChange('phone_number', v)}
          mt="md"
        />
        <InputField
          label="Username"
          value={form.username}
          onChange={(v) => handleChange('username', v)}
          mt="md"
        />
        <InputField
          label="Email"
          type="email"
          value={form.email}
          onChange={(v) => handleChange('email', v)}
          mt="md"
        />
        <InputField
          label="Password"
          type="password"
          value={form.password}
          onChange={(v) => handleChange('password', v)}
          mt="md"
        />

        <Group justify="right" mt="xl">
          <Button onClick={handleSubmit}>Sign Up</Button>
        </Group>
      </Paper>
    </Container>
  );
}

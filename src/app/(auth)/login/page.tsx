'use client';

import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  Text,
  Title,
} from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/services/authService';
import { InputField } from '@/components/Input/Input';
import classes from './style.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (key: string, val: any) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async () => {
    try {
      const user = await login(form);
      const routeTo = user.role == "admin" ? "/admin/dashboard" : "/dashboard"
      router.push(routeTo);
    } catch (err) {
      console.error(err)
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Link href="/signup" passHref legacyBehavior>
          <Anchor size="sm">Create account</Anchor>
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <InputField
          label="Email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(val) => handleChange('email', val)}
          type="email"
        />
        <InputField
          label="Password"
          placeholder="Your password"
          value={form.password}
          onChange={(val) => handleChange('password', val)}
          type="password"
          mt="md"
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" onClick={handleSubmit}>
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}

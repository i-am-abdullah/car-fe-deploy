import {
    Anchor,
    Button,
    Checkbox,
    Container,
    Group,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
  } from '@mantine/core';
  import classes from './style.module.css';
  
  export default function AuthenticationTitle() {
    return (
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Create an Account!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Alreay have an account?{' '}
          <Anchor size="sm" component="button">
            Login
          </Anchor>
        </Text>
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Email" placeholder="you@mantine.dev" required />
          <PasswordInput label="Password" placeholder="Your password" required mt="md" />
          <Group justify="space-between" mt="lg">
          </Group>
          <Button fullWidth mt="xl">
            Sign Up
          </Button>
        </Paper>
      </Container>
    );
  }
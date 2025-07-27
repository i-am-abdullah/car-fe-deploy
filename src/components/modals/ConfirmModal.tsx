'use client';

import { Modal, Button, Group, Text } from '@mantine/core';

interface ConfirmModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  loading?: boolean;
}

export function ConfirmModal({
  opened,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  loading = false,
}: ConfirmModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      size="sm"
    >
      <Text mb="md">{message}</Text>
      <Group justify="flex-end">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button color="red" onClick={onConfirm} loading={loading}>
          {confirmLabel}
        </Button>
      </Group>
    </Modal>
  );
}

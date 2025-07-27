'use client';

import { Table, Button, ActionIcon, Group, Text } from '@mantine/core';
import { IconEdit, IconTrash, IconFilter, IconPlus } from '@tabler/icons-react';

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onFilter?: () => void;
  onCreate?: () => void;
  onBulkCreate?: () => void;
  loading?: boolean;
  title: string;
  hasFilters?: boolean;
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  onEdit,
  onDelete,
  onFilter,
  onCreate,
  onBulkCreate,
  loading,
  title,
  hasFilters = false,
}: DataTableProps<T>) {
  const rows = data.map((item) => (
    <Table.Tr key={item.id}>
      {columns.map((column) => (
        <Table.Td key={String(column.key)}>
          {column.render ? column.render(item) : String(item[column.key as keyof T] || '')}
        </Table.Td>
      ))}
      <Table.Td>
        <Group gap="xs">
          {onEdit && (
            <ActionIcon
              variant="subtle"
              color="blue"
              onClick={() => onEdit(item)}
            >
              <IconEdit size={16} />
            </ActionIcon>
          )}
          {onDelete && (
            <ActionIcon
              variant="subtle"
              color="red"
              onClick={() => onDelete(item)}
            >
              <IconTrash size={16} />
            </ActionIcon>
          )}
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Text size="xl" fw={600}>{title}</Text>
        <Group>
          {hasFilters && onFilter && (
            <Button
              variant="outline"
              leftSection={<IconFilter size={16} />}
              onClick={onFilter}
            >
              Filter
            </Button>
          )}
          {onCreate && (
            <Button
              leftSection={<IconPlus size={16} />}
              onClick={onCreate}
            >
              Create One
            </Button>
          )}
          {onBulkCreate && (
            <Button
              variant="outline"
              leftSection={<IconPlus size={16} />}
              onClick={onBulkCreate}
            >
              Bulk Create
            </Button>
          )}
        </Group>
      </div>

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            {columns.map((column) => (
              <Table.Th key={String(column.key)}>{column.label}</Table.Th>
            ))}
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <Table.Tr>
              <Table.Td colSpan={columns.length + 1} className="text-center py-8">
                Loading...
              </Table.Td>
            </Table.Tr>
          ) : rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={columns.length + 1} className="text-center py-8">
                No data found
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </div>
  );
}
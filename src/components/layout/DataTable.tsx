'use client'

import React from 'react';
import { ScrollArea, Table, Text, TableProps } from '@mantine/core';

interface ColumnConfig<T> {
  key: string;
  header?: string;
  render?: (row: T) => React.ReactNode;
}

interface ReusableTableProps<T extends Record<string, any>> {
  data?: T[];
  columns?: ColumnConfig<T>[];
  tableProps?: Partial<TableProps>;
  showEmptyMessage?: boolean;
  emptyMessage?: string;
}

function ReusableTable<T extends Record<string, any>>({ 
  data = [], 
  columns = [], 
  tableProps = {}, 
  showEmptyMessage = true, 
  emptyMessage = "Nothing found" 
}: ReusableTableProps<T>): React.ReactElement {
  
  const defaultTableProps: Partial<TableProps> = {
    horizontalSpacing: "md",
    verticalSpacing: "xs",
    miw: 700,
    layout: "fixed",
    striped: true,
    withTableBorder: true,
    withColumnBorders: true,
    ...tableProps
  };

  const renderHeaders = (): React.ReactNode => (
    <Table.Tr>
      {columns.map((column) => (
        <Table.Th key={column.key}>
          {column.header || column.key}
        </Table.Th>
      ))}
    </Table.Tr>
  );

  const renderRows = (): React.ReactNode => {
    if (data.length === 0 && showEmptyMessage) {
      return (
        <Table.Tr>
          <Table.Td colSpan={columns.length}>
            <Text fw={500} ta="center">
              {emptyMessage}
            </Text>
          </Table.Td>
        </Table.Tr>
      );
    }

    return data.map((row, index) => (
      <Table.Tr key={index}>
        {columns.map((column) => (
          <Table.Td key={column.key}>
            {column.render ? column.render(row) : row[column.key as keyof T]}
          </Table.Td>
        ))}
      </Table.Tr>
    ));
  };

  return (
    <ScrollArea>
      <Table {...defaultTableProps}>
        <Table.Thead>
          {renderHeaders()}
        </Table.Thead>
        <Table.Tbody>
          {renderRows()}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}

export default ReusableTable;
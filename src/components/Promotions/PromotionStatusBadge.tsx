// components/promotions/PromotionStatusBadge.tsx
import React from 'react';
import { Badge } from '@mantine/core';
import { PromotionStatus } from '@/types/promotion';

interface PromotionStatusBadgeProps {
  status: PromotionStatus;
}

export default function PromotionStatusBadge({ status }: PromotionStatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'active':
        return { color: 'green', label: 'Active' };
      case 'expired':
        return { color: 'gray', label: 'Expired' };
      case 'cancelled':
        return { color: 'red', label: 'Cancelled' };
      default:
        return { color: 'blue', label: status };
    }
  };

  const { color, label } = getStatusConfig();

  return (
    <Badge color={color} variant="light">
      {label}
    </Badge>
  );
}
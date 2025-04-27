
import React from 'react';
import { OrderStatus } from '../types';
import { Badge } from '@/components/ui/badge';

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'Delivered':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      default:
        return '';
    }
  };

  return (
    <Badge className={`${getStatusStyles()} font-medium`} variant="outline">
      {status}
    </Badge>
  );
};

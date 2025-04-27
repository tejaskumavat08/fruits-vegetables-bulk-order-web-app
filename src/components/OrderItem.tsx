
import React, { useState } from 'react';
import { OrderItem as OrderItemType } from '../types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface OrderItemProps {
  item: OrderItemType;
  onUpdate: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

export const OrderItemRow: React.FC<OrderItemProps> = ({ item, onUpdate, onRemove }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      onUpdate(item.productId, newQuantity);
    }
  };

  return (
    <tr className="border-b">
      <td className="py-3 px-4">{item.productName}</td>
      <td className="py-3 px-4">₹{item.price.toFixed(2)}</td>
      <td className="py-3 px-4 w-24">
        <Input
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-20"
        />
      </td>
      <td className="py-3 px-4">₹{(item.price * quantity).toFixed(2)}</td>
      <td className="py-3 px-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onRemove(item.productId)}
          className="text-red-500 hover:text-red-700"
        >
          Remove
        </Button>
      </td>
    </tr>
  );
};

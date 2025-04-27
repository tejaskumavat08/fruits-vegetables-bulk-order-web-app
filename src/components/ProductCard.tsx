
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToOrder: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToOrder }) => {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-all hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-xs font-medium">
          {product.category}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
        <p className="text-lg font-bold mt-2">₹{product.price.toFixed(2)}/unit</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={() => onAddToOrder(product)} 
          className="w-full bg-fresh hover:bg-fresh-dark"
        >
          Add to Order
        </Button>
      </CardFooter>
    </Card>
  );
};

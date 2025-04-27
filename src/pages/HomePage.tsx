
import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import { Product } from '../types';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const HomePage = () => {
  const { toast } = useToast();
  const { addToCart, cartItems } = useCart();
  const [category, setCategory] = useState<'all' | 'vegetable' | 'fruit'>('all');

  const handleAddToOrder = (product: Product) => {
    addToCart(product);
    toast({
      title: 'Added to Order',
      description: `${product.name} has been added to your order.`,
    });
  };

  const filteredProducts = category === 'all' 
    ? products 
    : products.filter(product => product.category === category);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-fresh-dark">Fresh Produce Catalog</h1>
        <Link to="/order">
          <Button className="flex gap-2 items-center bg-fresh hover:bg-fresh-dark">
            <ShoppingCart className="h-4 w-4" />
            <span>View Order</span>
            {totalItems > 0 && (
              <span className="ml-1 bg-white text-fresh-dark rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {totalItems}
              </span>
            )}
          </Button>
        </Link>
      </div>
      
      <div className="flex gap-2 mb-6">
        <Button 
          variant={category === 'all' ? 'default' : 'outline'} 
          onClick={() => setCategory('all')}
        >
          All
        </Button>
        <Button 
          variant={category === 'vegetable' ? 'default' : 'outline'} 
          onClick={() => setCategory('vegetable')}
        >
          Vegetables
        </Button>
        <Button 
          variant={category === 'fruit' ? 'default' : 'outline'} 
          onClick={() => setCategory('fruit')}
        >
          Fruits
        </Button>
      </div>
      
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToOrder={handleAddToOrder}
          />
        ))}
      </div>
    </Layout>
  );
};

export default HomePage;

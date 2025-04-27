
import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { useCart } from '../hooks/useCart';
import { OrderItemRow } from '../components/OrderItem';
import { OrderSummary } from '../components/OrderSummary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DeliveryDetails } from '../types';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { orders } from '../data/orders';
import { v4 as uuidv4 } from 'uuid';

const OrderPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getTotal } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({
    name: '',
    contact: '',
    address: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDeliveryDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!deliveryDetails.name || !deliveryDetails.contact || !deliveryDetails.address) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all delivery details.',
        variant: 'destructive'
      });
      return;
    }

    if (cartItems.length === 0) {
      toast({
        title: 'Empty Order',
        description: 'Please add items to your order.',
        variant: 'destructive'
      });
      return;
    }

    // In a real application, this would be sent to the backend
    const newOrder = {
      id: `ORD${uuidv4().substring(0, 6)}`,
      items: cartItems,
      total: getTotal(),
      status: 'Pending' as const,
      delivery: deliveryDetails,
      createdAt: new Date().toISOString()
    };

    // For this demo, we'll just add it to the orders array
    orders.push(newOrder);
    
    clearCart();
    toast({
      title: 'Order Placed Successfully',
      description: `Your order #${newOrder.id} has been received.`
    });
    navigate('/track', { state: { orderId: newOrder.id } });
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8 text-fresh-dark">Place Your Order</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {cartItems.length > 0 ? (
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="py-3 px-4 text-left">Product</th>
                    <th className="py-3 px-4 text-left">Price</th>
                    <th className="py-3 px-4 text-left">Quantity</th>
                    <th className="py-3 px-4 text-left">Subtotal</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <OrderItemRow 
                      key={item.productId}
                      item={item}
                      onUpdate={updateQuantity}
                      onRemove={removeFromCart}
                    />
                  ))}
                </tbody>
              </table>
              <div className="p-4 flex justify-end">
                <Button variant="outline" onClick={clearCart}>
                  Clear Order
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border p-8 text-center">
              <h3 className="text-xl font-medium mb-2">Your order is empty</h3>
              <p className="text-muted-foreground mb-4">Add some products from our catalog to place an order.</p>
              <Button onClick={() => navigate('/')}>Browse Products</Button>
            </div>
          )}

          <form onSubmit={handleSubmitOrder} className="mt-8 bg-white rounded-lg border shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={deliveryDetails.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="contact">Contact Number</Label>
                <Input
                  id="contact"
                  name="contact"
                  value={deliveryDetails.contact}
                  onChange={handleInputChange}
                  placeholder="555-123-4567"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="address">Delivery Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={deliveryDetails.address}
                  onChange={handleInputChange}
                  placeholder="123 Main St, Anytown, CA 12345"
                  required
                  rows={3}
                />
              </div>
            </div>
          </form>
        </div>
        
        <div>
          <OrderSummary items={cartItems} />
          <Button 
            onClick={handleSubmitOrder}
            className="w-full mt-4 bg-fresh hover:bg-fresh-dark"
            disabled={cartItems.length === 0}
          >
            Place Order
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default OrderPage;

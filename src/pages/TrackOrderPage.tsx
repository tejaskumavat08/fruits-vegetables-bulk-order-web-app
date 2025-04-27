
import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { orders } from '../data/orders';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { OrderStatusBadge } from '../components/OrderStatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';

const TrackOrderPage = () => {
  const location = useLocation();
  const prefilledOrderId = location.state?.orderId || '';
  const [orderId, setOrderId] = useState(prefilledOrderId);
  const [searchedOrder, setSearchedOrder] = useState(prefilledOrderId ? 
    orders.find(order => order.id === prefilledOrderId) : null);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const order = orders.find(o => o.id === orderId);
    setSearchedOrder(order || null);
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8 text-fresh-dark">Track Your Order</h1>
      
      <form onSubmit={handleSearch} className="mb-8 flex gap-4">
        <div className="flex-1">
          <Input
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter your order ID (e.g., ORD001)"
          />
        </div>
        <Button type="submit" className="bg-fresh hover:bg-fresh-dark">
          <Search className="h-4 w-4 mr-2" /> Track Order
        </Button>
      </form>
      
      {searchedOrder ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Order #{searchedOrder.id}</CardTitle>
                <OrderStatusBadge status={searchedOrder.status} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  Ordered on {new Date(searchedOrder.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              <h3 className="font-medium mb-2">Items</h3>
              <div className="bg-muted/20 rounded-md p-4 mb-4">
                {searchedOrder.items.map((item) => (
                  <div key={item.productId} className="flex justify-between py-2 border-b last:border-0">
                    <div>
                      <span className="font-medium">{item.productName}</span>
                      <span className="text-sm text-muted-foreground ml-2">x{item.quantity}</span>
                    </div>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-4 font-medium">
                  <span>Total</span>
                  <span>₹{searchedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">Recipient</h3>
                  <p>{searchedOrder.delivery.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Contact</h3>
                  <p>{searchedOrder.delivery.contact}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Address</h3>
                  <p>{searchedOrder.delivery.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="flex justify-between mb-2">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${searchedOrder.status === "Pending" || searchedOrder.status === "In Progress" || searchedOrder.status === "Delivered" ? "bg-fresh" : "bg-gray-200"}`}>
                      <span className="text-white">1</span>
                    </div>
                    <span className="text-xs mt-1">Pending</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${searchedOrder.status === "In Progress" || searchedOrder.status === "Delivered" ? "bg-fresh" : "bg-gray-200"}`}>
                      <span className="text-white">2</span>
                    </div>
                    <span className="text-xs mt-1">In Progress</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${searchedOrder.status === "Delivered" ? "bg-fresh" : "bg-gray-200"}`}>
                      <span className="text-white">3</span>
                    </div>
                    <span className="text-xs mt-1">Delivered</span>
                  </div>
                </div>
                <div className="absolute top-4 left-8 right-8 h-0.5 bg-gray-200 -z-10"></div>
                <div 
                  className="absolute top-4 left-8 h-0.5 bg-fresh -z-10" 
                  style={{ 
                    width: searchedOrder.status === "Pending" ? "0%" : 
                           searchedOrder.status === "In Progress" ? "50%" : "100%" 
                  }}
                ></div>
              </div>
              
              <div className="mt-6">
                {searchedOrder.status === "Pending" && (
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <p>Your order has been received and is being prepared.</p>
                  </div>
                )}
                
                {searchedOrder.status === "In Progress" && (
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p>Your order is being processed and will be delivered soon.</p>
                  </div>
                )}
                
                {searchedOrder.status === "Delivered" && (
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p>Your order has been delivered successfully.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : orderId ? (
        <div className="text-center p-8 bg-muted/20 rounded-lg">
          <h3 className="text-xl font-medium mb-2">Order Not Found</h3>
          <p className="text-muted-foreground">We couldn't find an order with ID: {orderId}</p>
        </div>
      ) : (
        <div className="text-center p-8 bg-muted/20 rounded-lg">
          <h3 className="text-xl font-medium mb-2">Track Your Order</h3>
          <p className="text-muted-foreground">Enter your order ID above to track its status.</p>
        </div>
      )}
    </Layout>
  );
};

export default TrackOrderPage;

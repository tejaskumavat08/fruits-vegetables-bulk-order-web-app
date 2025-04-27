
import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { orders } from '../data/orders';
import { products } from '../data/products';
import { OrderStatus, Product } from '../types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OrderStatusBadge } from '../components/OrderStatusBadge';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Check, Package, Truck, ShoppingCart } from 'lucide-react';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const { toast } = useToast();

  const handleStatusUpdate = (orderId: string, newStatus: OrderStatus) => {
    const orderIndex = orders.findIndex(order => order.id === orderId);
    if (orderIndex >= 0) {
      orders[orderIndex].status = newStatus;
      toast({
        title: 'Order Status Updated',
        description: `Order ${orderId} is now ${newStatus}`,
      });
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8 text-fresh-dark">Admin Dashboard</h1>
      
      <Tabs defaultValue="orders" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="orders" className="flex gap-1 items-center">
            <ShoppingCart className="h-4 w-4" />
            <span>Orders</span>
          </TabsTrigger>
          <TabsTrigger value="products" className="flex gap-1 items-center">
            <Package className="h-4 w-4" />
            <span>Products</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders">
          <OrdersManagement 
            orders={orders} 
            onStatusUpdate={handleStatusUpdate} 
          />
        </TabsContent>
        
        <TabsContent value="products">
          <ProductsManagement products={products} />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

const OrdersManagement = ({ 
  orders, 
  onStatusUpdate 
}: { 
  orders: typeof orders, 
  onStatusUpdate: (orderId: string, newStatus: OrderStatus) => void 
}) => {
  return (
    <div>
      <div className="rounded-md border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="py-3 px-4 text-left">Order ID</th>
              <th className="py-3 px-4 text-left">Customer</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Total</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="py-4 px-4 font-medium">{order.id}</td>
                <td className="py-4 px-4">{order.delivery.name}</td>
                <td className="py-4 px-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="py-4 px-4">₹{order.total.toFixed(2)}</td>
                <td className="py-4 px-4">
                  <OrderStatusBadge status={order.status} />
                </td>
                <td className="py-4 px-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">Details</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Order {order.id}</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-medium mb-2">Order Items</h3>
                          <div className="space-y-2">
                            {order.items.map((item) => (
                              <div key={item.productId} className="flex justify-between">
                                <div>
                                  <span>{item.productName}</span>
                                  <span className="text-sm text-muted-foreground ml-1">x{item.quantity}</span>
                                </div>
                                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                            <div className="pt-2 border-t flex justify-between font-medium">
                              <span>Total</span>
                              <span>₹{order.total.toFixed(2)}</span>
                            </div>
                          </div>
                          
                          <h3 className="font-medium mt-6 mb-2">Delivery Information</h3>
                          <div className="space-y-2">
                            <p><span className="font-medium">Name:</span> {order.delivery.name}</p>
                            <p><span className="font-medium">Contact:</span> {order.delivery.contact}</p>
                            <p><span className="font-medium">Address:</span> {order.delivery.address}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-4">Update Status</h3>
                          <div className="space-y-4">
                            <Button 
                              onClick={() => onStatusUpdate(order.id, 'Pending')}
                              variant={order.status === 'Pending' ? 'default' : 'outline'}
                              className="w-full justify-start"
                              disabled={order.status === 'Pending'}
                            >
                              <div className={`w-6 h-6 rounded-full mr-2 flex items-center justify-center ${order.status === 'Pending' ? 'bg-primary text-white' : 'border'}`}>
                                {order.status === 'Pending' && <Check className="h-4 w-4" />}
                              </div>
                              Pending
                            </Button>
                            
                            <Button 
                              onClick={() => onStatusUpdate(order.id, 'In Progress')}
                              variant={order.status === 'In Progress' ? 'default' : 'outline'}
                              className="w-full justify-start"
                              disabled={order.status === 'In Progress'}
                            >
                              <div className={`w-6 h-6 rounded-full mr-2 flex items-center justify-center ${order.status === 'In Progress' ? 'bg-primary text-white' : 'border'}`}>
                                {order.status === 'In Progress' && <Check className="h-4 w-4" />}
                              </div>
                              In Progress
                            </Button>
                            
                            <Button 
                              onClick={() => onStatusUpdate(order.id, 'Delivered')}
                              variant={order.status === 'Delivered' ? 'default' : 'outline'}
                              className="w-full justify-start"
                              disabled={order.status === 'Delivered'}
                            >
                              <div className={`w-6 h-6 rounded-full mr-2 flex items-center justify-center ${order.status === 'Delivered' ? 'bg-primary text-white' : 'border'}`}>
                                {order.status === 'Delivered' && <Check className="h-4 w-4" />}
                              </div>
                              Delivered
                            </Button>
                          </div>
                        </div>
                      </div>
                      <DialogClose asChild>
                        <Button className="mt-4">Close</Button>
                      </DialogClose>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ProductsManagement = ({ products }: { products: typeof products }) => {
  const { toast } = useToast();
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    image: '',
    category: 'vegetable',
    description: '',
  });

  const handleEditProduct = (product: Product) => {
    setEditProduct({ ...product });
  };
  
  const handleSaveProduct = () => {
    // In a real app, this would update the database
    if (editProduct) {
      const productIndex = products.findIndex(p => p.id === editProduct.id);
      if (productIndex >= 0) {
        products[productIndex] = { ...editProduct };
        toast({
          title: 'Product Updated',
          description: `${editProduct.name} has been updated successfully.`,
        });
        setEditProduct(null);
      }
    }
  };
  
  const handleAddProduct = () => {
    // In a real app, this would update the database
    const newId = Math.max(...products.map(p => p.id)) + 1;
    const createdProduct = {
      id: newId,
      name: newProduct.name || 'New Product',
      price: newProduct.price || 0,
      image: newProduct.image || 'https://images.unsplash.com/photo-1610348725531-843dff563e2c',
      category: (newProduct.category as 'vegetable' | 'fruit') || 'vegetable',
      description: newProduct.description || 'Product description',
    };
    
    products.push(createdProduct);
    toast({
      title: 'Product Added',
      description: `${createdProduct.name} has been added to the catalog.`,
    });
    
    setNewProduct({
      name: '',
      price: 0,
      image: '',
      category: 'vegetable',
      description: '',
    });
  };
  
  const handleDeleteProduct = (productId: number) => {
    // In a real app, this would update the database
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex >= 0) {
      const productName = products[productIndex].name;
      products.splice(productIndex, 1);
      toast({
        title: 'Product Removed',
        description: `${productName} has been removed from the catalog.`,
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <div className="rounded-md border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {products.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="py-3 px-4">{product.id}</td>
                  <td className="py-3 px-4">{product.name}</td>
                  <td className="py-3 px-4">₹{product.price.toFixed(2)}</td>
                  <td className="py-3 px-4 capitalize">{product.category}</td>
                  <td className="py-3 px-4 flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleEditProduct(product)}
                    >
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="new-name">Product Name</Label>
                <Input
                  id="new-name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="Product name"
                />
              </div>
              
              <div>
                <Label htmlFor="new-price">Price</Label>
                <Input
                  id="new-price"
                  type="number"
                  step="0.01"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                  placeholder="0.00"
                />
              </div>
              
              <div>
                <Label htmlFor="new-category">Category</Label>
                <Select
                  value={newProduct.category}
                  onValueChange={(value) => setNewProduct({ ...newProduct, category: value as 'vegetable' | 'fruit' })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vegetable">Vegetable</SelectItem>
                    <SelectItem value="fruit">Fruit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="new-image">Image URL</Label>
                <Input
                  id="new-image"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div>
                <Label htmlFor="new-description">Description</Label>
                <Textarea
                  id="new-description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Product description"
                  rows={3}
                />
              </div>
              
              <Button 
                className="w-full bg-fresh hover:bg-fresh-dark"
                onClick={handleAddProduct}
                disabled={!newProduct.name}
              >
                Add Product
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {editProduct && (
        <Dialog open={!!editProduct} onOpenChange={(open) => !open && setEditProduct(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Product Name</Label>
                <Input
                  id="edit-name"
                  value={editProduct.name}
                  onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="edit-price">Price</Label>
                <Input
                  id="edit-price"
                  type="number"
                  step="0.01"
                  value={editProduct.price}
                  onChange={(e) => setEditProduct({ ...editProduct, price: parseFloat(e.target.value) })}
                />
              </div>
              
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={editProduct.category}
                  onValueChange={(value) => setEditProduct({ ...editProduct, category: value as 'vegetable' | 'fruit' })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vegetable">Vegetable</SelectItem>
                    <SelectItem value="fruit">Fruit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="edit-image">Image URL</Label>
                <Input
                  id="edit-image"
                  value={editProduct.image}
                  onChange={(e) => setEditProduct({ ...editProduct, image: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editProduct.description}
                  onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditProduct(null)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveProduct}>
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminPage;


export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: 'vegetable' | 'fruit';
  description: string;
}

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface DeliveryDetails {
  name: string;
  contact: string;
  address: string;
}

export type OrderStatus = 'Pending' | 'In Progress' | 'Delivered';

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  delivery: DeliveryDetails;
  createdAt: string;
}

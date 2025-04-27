
import { Order } from "../types";

export const orders: Order[] = [
  {
    id: "ORD001",
    items: [
      { productId: 1, productName: "Organic Apples", quantity: 20, price: 2.99 },
      { productId: 3, productName: "Carrots", quantity: 30, price: 1.29 }
    ],
    total: 98.50,
    status: "Pending",
    delivery: {
      name: "John Doe",
      contact: "555-123-4567",
      address: "123 Main St, Anytown, CA 12345"
    },
    createdAt: "2023-04-22T10:30:00Z"
  },
  {
    id: "ORD002",
    items: [
      { productId: 5, productName: "Tomatoes", quantity: 40, price: 2.49 },
      { productId: 2, productName: "Bananas", quantity: 25, price: 1.49 }
    ],
    total: 137.05,
    status: "In Progress",
    delivery: {
      name: "Jane Smith",
      contact: "555-987-6543",
      address: "456 Oak Ave, Somecity, CA 67890"
    },
    createdAt: "2023-04-21T14:45:00Z"
  },
  {
    id: "ORD003",
    items: [
      { productId: 6, productName: "Oranges", quantity: 50, price: 3.49 },
      { productId: 4, productName: "Potatoes", quantity: 100, price: 0.99 }
    ],
    total: 273.50,
    status: "Delivered",
    delivery: {
      name: "Bob Johnson",
      contact: "555-456-7890",
      address: "789 Pine Rd, Otherville, CA 54321"
    },
    createdAt: "2023-04-20T09:15:00Z"
  }
];

// Order Status
export type OrderStatus = 'pending' | 'received' | 'preparing' | 'ready' | 'completed' | 'cancelled';

// Order
export interface Order {
  id: string;
  tableNumber: number;
  items: OrderItem[];
  status: OrderStatus;
  totalPrice: number;
  tax: number;
  serviceCharge: number;
  finalPrice: number;
  paymentMethod?: 'cash' | 'card' | 'other';
  preparationTime: number; // estimated in minutes
  createdAt: string;
  completedAt?: string;
  notes?: string;
}
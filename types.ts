export type ProductStatus = 'available' | 'stock-end' | 'coming-soon';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  status: ProductStatus;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Review {
  productId: number;
  author: string;
  rating: number;
  text: string;
}

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered';

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  advancePaid: number;
  date: string;
  status: OrderStatus;
  city: string;
  deliveryCompany: string;
  fullName: string;
  phoneNumber: string;
  address: string;
}

export type UserStatus = 'pendingPayment' | 'pendingAdminVerification' | 'verified';

export interface User {
  name: string;
  email: string;
  password?: string;
  status: UserStatus;
  balance: number;
}
export interface MenuItem {
  id: string;
  name: string;
  briefDescription: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  tags: string[];
  ingredients: string[];
  relatedItems: string[];
  options?: MenuItemOption[];
  popular?: boolean;
  featured?: boolean;
}

export interface MenuItemOption {
  id: string;
  name: string;
  type: 'size' | 'addon' | 'choice';
  required: boolean;
  choices: MenuItemOptionChoice[];
}

export interface MenuItemOptionChoice {
  id: string;
  name: string;
  priceDelta: number;
  default?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  order: number;
}

export interface Deal {
  id: string;
  name: string;
  description: string;
  image: string;
  items: DealItem[];
  price: number;
  originalPrice: number;
  discount: number;
  savings: number;
  active: boolean;
  badge?: string;
}

export interface DealItem {
  menuItemId: string;
  quantity: number;
  note?: string;
}

export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedOptions: Record<string, string>;
  optionPrices: Record<string, number>;
  note?: string;
}

export interface Order {
  id: string;
  orderCode: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  confirmedBy?: string;
  createdAt: string;
  updatedAt: string;
  whatsappSent?: boolean;
}

export type OrderStatus = 'placed' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

export interface CheckoutFormData {
  name: string;
  phone: string;
  address: string;
  note?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface StaffUser {
  id: string;
  email: string;
  createdAt: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export const ORDER_STATUSES: { value: OrderStatus; label: string; color: string }[] = [
  { value: 'placed', label: 'Order Placed', color: 'badge-placed' },
  { value: 'confirmed', label: 'Confirmed', color: 'badge-confirmed' },
  { value: 'preparing', label: 'Preparing', color: 'badge-preparing' },
  { value: 'ready', label: 'Ready', color: 'badge-ready' },
  { value: 'delivered', label: 'Delivered', color: 'badge-delivered' },
  { value: 'cancelled', label: 'Cancelled', color: 'badge-cancelled' },
];

export const STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  placed: ['confirmed', 'cancelled'],
  confirmed: ['preparing', 'cancelled'],
  preparing: ['ready', 'cancelled'],
  ready: ['delivered'],
  delivered: [],
  cancelled: [],
};
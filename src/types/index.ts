export type ProductCategory =
  | 'Smartphones'
  | 'Laptops'
  | 'Chargers'
  | 'USB Cables'
  | 'Fans'
  | 'Bluetooth Speakers'
  | 'Headphones'
  | 'Phone Accessories'
  | 'Power Banks'
  | 'Storage Devices'
  | 'Other Electronics'
  | 'Repair Services';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number; // in NGN
  originalPrice?: number;
  stock: number;
  inStock: boolean;
  image: string;
  rating: number;
  reviewsCount: number;
  description: string;
  features: string[];
  specs: Record<string, string>;
  isFeatured?: boolean;
  isNew?: boolean;
  tag?: string;
  warranty?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface OrderItemSummary {
  id: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  whatsapp: string;
  deliveryAddress: string;
  deliveryTown: string;
  items: OrderItemSummary[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: 'WhatsApp Confirmation' | 'Pay on Pickup' | 'Bank Transfer';
  createdAt: string;
  notes?: string;
}

export type RepairStatus =
  | 'Ticket Created'
  | 'Diagnosing'
  | 'Awaiting Parts'
  | 'In Repair'
  | 'Ready for Pickup'
  | 'Completed'
  | 'Cancelled';

export interface RepairTimelineEvent {
  status: RepairStatus;
  timestamp: string;
  note: string;
}

export interface RepairTicket {
  id: string;
  ticketNumber: string; // e.g., IC-REP-9041
  customerName: string;
  phone: string;
  email?: string;
  deviceType: 'Smartphone' | 'Laptop' | 'Tablet' | 'Speaker' | 'Power Bank' | 'Other Device';
  brandModel: string;
  faultCategory: 'Screen Replacement' | 'Battery Replacement' | 'Charging Port' | 'Water Damage' | 'Motherboard Repair' | 'Software / Flashing' | 'Keyboard / Trackpad' | 'Other Fault';
  faultDescription: string;
  urgency: 'Standard (1-2 days)' | 'Express Same-Day' | 'Emergency Inspection';
  status: RepairStatus;
  estimatedCost: number; // 0 if pending diagnosis
  depositPaid: number;
  createdAt: string;
  updatedAt: string;
  assignedTechnician?: string;
  timeline: RepairTimelineEvent[];
}

export interface CustomerUser {
  id: string;
  name: string;
  phone: string;
  email: string;
  address?: string;
  createdAt: string;
}

export interface StoreAnnouncement {
  text: string;
  isActive: boolean;
  linkText?: string;
  actionTab?: 'home' | 'shop' | 'repairs' | 'track' | 'account' | 'admin' | 'deploy-guide';
}

export interface StoreInfo {
  name: string;
  location: string;
  landmark: string;
  state: string;
  country: string;
  whatsapp: string;
  whatsappLink: string;
  phoneCall: string;
  email: string;
  businessHours: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

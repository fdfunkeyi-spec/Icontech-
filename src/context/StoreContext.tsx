import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  ProductCategory,
  CartItem,
  CustomerOrder,
  RepairTicket,
  CustomerUser,
  StoreAnnouncement,
  StoreInfo,
  RepairStatus,
  OrderStatus
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_REPAIR_TICKETS,
  INITIAL_ORDERS,
  INITIAL_ANNOUNCEMENT,
  STORE_INFO
} from '../data/mockData';
import { generateId, generateOrderCode, generateTicketCode, formatDateTime } from '../utils/formatters';

interface StoreContextType {
  products: Product[];
  categories: ProductCategory[];
  orders: CustomerOrder[];
  repairs: RepairTicket[];
  cart: CartItem[];
  cartTotal: number;
  cartCount: number;
  currentUser: CustomerUser | null;
  isAdmin: boolean;
  activeTab: 'home' | 'shop' | 'repairs' | 'track' | 'account' | 'admin' | 'deploy-guide';
  selectedCategory: ProductCategory | 'All';
  searchQuery: string;
  selectedProduct: Product | null;
  isCartOpen: boolean;
  announcement: StoreAnnouncement;
  storeInfo: StoreInfo;

  // Actions
  setActiveTab: (tab: 'home' | 'shop' | 'repairs' | 'track' | 'account' | 'admin' | 'deploy-guide') => void;
  setSelectedCategory: (cat: ProductCategory | 'All') => void;
  setSearchQuery: (query: string) => void;
  setSelectedProduct: (prod: Product | null) => void;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  submitWhatsAppCartOrder: (details: {
    customerName: string;
    phone: string;
    deliveryAddress: string;
    deliveryTown: string;
    notes?: string;
  }) => { order: CustomerOrder; whatsappUrl: string };
  submitRepairEnquiry: (details: {
    customerName: string;
    phone: string;
    email?: string;
    deviceType: 'Smartphone' | 'Laptop' | 'Tablet' | 'Speaker' | 'Power Bank' | 'Other Device';
    brandModel: string;
    faultCategory: 'Screen Replacement' | 'Battery Replacement' | 'Charging Port' | 'Water Damage' | 'Motherboard Repair' | 'Software / Flashing' | 'Keyboard / Trackpad' | 'Other Fault';
    faultDescription: string;
    urgency: 'Standard (1-2 days)' | 'Express Same-Day' | 'Emergency Inspection';
  }) => { ticket: RepairTicket; whatsappUrl: string };
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateRepairTicket: (
    id: string,
    updates: {
      status?: RepairStatus;
      note?: string;
      estimatedCost?: number;
      depositPaid?: number;
      technician?: string;
    }
  ) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  loginCustomer: (name: string, phone: string, email: string, address?: string) => void;
  logoutCustomer: () => void;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  updateAnnouncement: (text: string, isActive: boolean) => void;
  resetToDefaultData: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const CATEGORIES_LIST: ProductCategory[] = [
  'Smartphones',
  'Laptops',
  'Chargers',
  'USB Cables',
  'Fans',
  'Bluetooth Speakers',
  'Headphones',
  'Phone Accessories',
  'Power Banks',
  'Storage Devices',
  'Other Electronics',
  'Repair Services'
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('icon_tech_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState<CustomerOrder[]>(() => {
    const saved = localStorage.getItem('icon_tech_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [repairs, setRepairs] = useState<RepairTicket[]>(() => {
    const saved = localStorage.getItem('icon_tech_repairs');
    return saved ? JSON.parse(saved) : INITIAL_REPAIR_TICKETS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('icon_tech_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState<CustomerUser | null>(() => {
    const saved = localStorage.getItem('icon_tech_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('icon_tech_admin') === 'true';
  });

  const [announcement, setAnnouncement] = useState<StoreAnnouncement>(() => {
    const saved = localStorage.getItem('icon_tech_announcement');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENT;
  });

  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'repairs' | 'track' | 'account' | 'admin' | 'deploy-guide'>('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync products
  useEffect(() => {
    localStorage.setItem('icon_tech_products', JSON.stringify(products));
  }, [products]);

  // Sync orders
  useEffect(() => {
    localStorage.setItem('icon_tech_orders', JSON.stringify(orders));
  }, [orders]);

  // Sync repairs
  useEffect(() => {
    localStorage.setItem('icon_tech_repairs', JSON.stringify(repairs));
  }, [repairs]);

  // Sync cart
  useEffect(() => {
    localStorage.setItem('icon_tech_cart', JSON.stringify(cart));
  }, [cart]);

  // Sync user
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('icon_tech_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('icon_tech_user');
    }
  }, [currentUser]);

  // Sync admin state
  useEffect(() => {
    localStorage.setItem('icon_tech_admin', isAdmin ? 'true' : 'false');
  }, [isAdmin]);

  // Sync announcement
  useEffect(() => {
    localStorage.setItem('icon_tech_announcement', JSON.stringify(announcement));
  }, [announcement]);

  // Cart calculations
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const submitWhatsAppCartOrder = (details: {
    customerName: string;
    phone: string;
    deliveryAddress: string;
    deliveryTown: string;
    notes?: string;
  }) => {
    const orderNumber = generateOrderCode();
    const orderItems = cart.map((item) => ({
      id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      subtotal: item.product.price * item.quantity
    }));

    const subtotal = cartTotal;
    const deliveryFee = subtotal >= 35000 ? 0 : 1500;
    const totalAmount = subtotal + deliveryFee;

    const newOrder: CustomerOrder = {
      id: generateId('ord'),
      orderNumber,
      customerName: details.customerName,
      phone: details.phone,
      whatsapp: details.phone.replace(/\D/g, ''),
      deliveryAddress: details.deliveryAddress,
      deliveryTown: details.deliveryTown,
      items: orderItems,
      subtotal,
      deliveryFee,
      totalAmount,
      status: 'Pending',
      paymentMethod: 'WhatsApp Confirmation',
      createdAt: formatDateTime(),
      notes: details.notes
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    // Compose formatted WhatsApp Message
    const itemsListText = orderItems
      .map((it, idx) => `${idx + 1}. ${it.name} (Qty: ${it.quantity}) - ₦${it.subtotal.toLocaleString()}`)
      .join('\n');

    const message = `*NEW ORDER FROM ICON TECH STORE*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `*Order ID:* ${orderNumber}\n` +
      `*Customer:* ${details.customerName}\n` +
      `*Phone:* ${details.phone}\n` +
      `*Location/Address:* ${details.deliveryAddress}, ${details.deliveryTown}\n\n` +
      `*SELECTED PRODUCTS:*\n${itemsListText}\n\n` +
      `*Subtotal:* ₦${subtotal.toLocaleString()}\n` +
      `*Delivery Fee:* ${deliveryFee === 0 ? 'FREE' : `₦${deliveryFee.toLocaleString()}`}\n` +
      `*Total Due:* ₦${totalAmount.toLocaleString()}\n` +
      (details.notes ? `*Customer Note:* ${details.notes}\n` : '') +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `Hello ICON TECH team! I just placed this order via your website. Please confirm availability and payment/delivery schedule.`;

    const whatsappUrl = `https://wa.me/2347039420600?text=${encodeURIComponent(message)}`;

    return { order: newOrder, whatsappUrl };
  };

  const submitRepairEnquiry = (details: {
    customerName: string;
    phone: string;
    email?: string;
    deviceType: 'Smartphone' | 'Laptop' | 'Tablet' | 'Speaker' | 'Power Bank' | 'Other Device';
    brandModel: string;
    faultCategory: 'Screen Replacement' | 'Battery Replacement' | 'Charging Port' | 'Water Damage' | 'Motherboard Repair' | 'Software / Flashing' | 'Keyboard / Trackpad' | 'Other Fault';
    faultDescription: string;
    urgency: 'Standard (1-2 days)' | 'Express Same-Day' | 'Emergency Inspection';
  }) => {
    const ticketNumber = generateTicketCode();
    const timestamp = formatDateTime();

    const newTicket: RepairTicket = {
      id: generateId('rep'),
      ticketNumber,
      customerName: details.customerName,
      phone: details.phone,
      email: details.email,
      deviceType: details.deviceType,
      brandModel: details.brandModel,
      faultCategory: details.faultCategory,
      faultDescription: details.faultDescription,
      urgency: details.urgency,
      status: 'Ticket Created',
      estimatedCost: 0,
      depositPaid: 0,
      createdAt: timestamp,
      updatedAt: timestamp,
      assignedTechnician: 'Technical Intake Lead',
      timeline: [
        {
          status: 'Ticket Created',
          timestamp,
          note: `Enquiry submitted online. Ticket ${ticketNumber} generated.`
        }
      ]
    };

    setRepairs((prev) => [newTicket, ...prev]);

    const message = `*NEW REPAIR ENQUIRY - ICON TECH*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `*Ticket Number:* ${ticketNumber}\n` +
      `*Customer Name:* ${details.customerName}\n` +
      `*Phone Number:* ${details.phone}\n` +
      `*Device Category:* ${details.deviceType}\n` +
      `*Brand & Model:* ${details.brandModel}\n` +
      `*Fault Category:* ${details.faultCategory}\n` +
      `*Urgency:* ${details.urgency}\n\n` +
      `*Fault Description:* ${details.faultDescription}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `Hello ICON TECH Repair Lab! I submitted this repair enquiry for my device. When can I bring it to your workshop opposite Adeyemi?`;

    const whatsappUrl = `https://wa.me/2347039420600?text=${encodeURIComponent(message)}`;

    return { ticket: newTicket, whatsappUrl };
  };

  const addProduct = (productData: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => {
    const newProduct: Product = {
      ...productData,
      id: generateId('prod'),
      rating: 5.0,
      reviewsCount: 1,
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateRepairTicket = (
    id: string,
    updates: {
      status?: RepairStatus;
      note?: string;
      estimatedCost?: number;
      depositPaid?: number;
      technician?: string;
    }
  ) => {
    const now = formatDateTime();
    setRepairs((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const newTimeline = [...r.timeline];
        if (updates.status && updates.status !== r.status) {
          newTimeline.push({
            status: updates.status,
            timestamp: now,
            note: updates.note || `Status updated to ${updates.status}`
          });
        }
        return {
          ...r,
          status: updates.status || r.status,
          estimatedCost: updates.estimatedCost !== undefined ? updates.estimatedCost : r.estimatedCost,
          depositPaid: updates.depositPaid !== undefined ? updates.depositPaid : r.depositPaid,
          assignedTechnician: updates.technician || r.assignedTechnician,
          updatedAt: now,
          timeline: newTimeline
        };
      })
    );
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === id ? { ...ord, status } : ord))
    );
  };

  const loginCustomer = (name: string, phone: string, email: string, address?: string) => {
    const user: CustomerUser = {
      id: generateId('cust'),
      name,
      phone,
      email,
      address,
      createdAt: formatDateTime()
    };
    setCurrentUser(user);
  };

  const logoutCustomer = () => {
    setCurrentUser(null);
  };

  const loginAdmin = (password: string) => {
    if (password === 'admin123' || password === 'icon2026' || password === '07039420600') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
  };

  const updateAnnouncement = (text: string, isActive: boolean) => {
    setAnnouncement({ text, isActive });
  };

  const resetToDefaultData = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setRepairs(INITIAL_REPAIR_TICKETS);
    setAnnouncement(INITIAL_ANNOUNCEMENT);
    localStorage.removeItem('icon_tech_products');
    localStorage.removeItem('icon_tech_orders');
    localStorage.removeItem('icon_tech_repairs');
    localStorage.removeItem('icon_tech_announcement');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories: CATEGORIES_LIST,
        orders,
        repairs,
        cart,
        cartTotal,
        cartCount,
        currentUser,
        isAdmin,
        activeTab,
        selectedCategory,
        searchQuery,
        selectedProduct,
        isCartOpen,
        announcement,
        storeInfo: STORE_INFO,
        setActiveTab,
        setSelectedCategory,
        setSearchQuery,
        setSelectedProduct,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        submitWhatsAppCartOrder,
        submitRepairEnquiry,
        addProduct,
        updateProduct,
        deleteProduct,
        updateRepairTicket,
        updateOrderStatus,
        loginCustomer,
        logoutCustomer,
        loginAdmin,
        logoutAdmin,
        updateAnnouncement,
        resetToDefaultData
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

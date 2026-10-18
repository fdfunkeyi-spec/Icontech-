import { Product, RepairTicket, StoreInfo, StoreAnnouncement, CustomerOrder } from '../types';

export const STORE_INFO: StoreInfo = {
  name: 'ICON TECH',
  location: 'Opposite Adeyemi College / Main Campus Road',
  landmark: 'Opposite Adeyemi',
  state: 'Ondo State',
  country: 'Nigeria',
  whatsapp: '0703 942 0600',
  whatsappLink: 'https://wa.me/2347039420600',
  phoneCall: '+234 703 942 0600',
  email: 'contact@icontechondo.ng',
  businessHours: 'Monday – Saturday: 8:00 AM – 7:00 PM | Sunday: Closed',
  bankName: 'Moniepoint MFB / Zenith Bank',
  accountNumber: '8102948291',
  accountName: 'ICON TECH ENTERPRISES',
};

export const INITIAL_ANNOUNCEMENT: StoreAnnouncement = {
  text: 'Free delivery on accessories orders above ₦35,000 within Ondo Town! Walk-in repairs available opposite Adeyemi.',
  isActive: true,
  linkText: 'Book a Repair',
  actionTab: 'repairs',
};

export const INITIAL_PRODUCTS: Product[] = [
  // 1. Smartphones
  {
    id: 'prod-sp-01',
    name: 'Apple iPhone 14 Pro Max 256GB (Space Black)',
    category: 'Smartphones',
    price: 880000,
    originalPrice: 920000,
    stock: 4,
    inStock: true,
    image: '/src/assets/images/smartphones_flagship_1792330408572.jpg',
    rating: 4.9,
    reviewsCount: 38,
    description: 'Direct UK-used grade A++ pristine condition with 100% battery health, dynamic island, and A16 Bionic chipset. Tested and certified by ICON TECH engineers.',
    features: ['Super Retina XDR OLED', '48MP Main Camera', 'Dynamic Island', 'A16 Bionic processor', 'Face ID verified'],
    specs: {
      'Storage': '256GB',
      'Battery Health': '96% - 100%',
      'Condition': 'Grade A++ Pristine',
      'Warranty': '90 Days Store Guarantee'
    },
    isFeatured: true,
    tag: 'Flagship Deal',
    warranty: '90 Days ICON TECH Warranty'
  },
  {
    id: 'prod-sp-02',
    name: 'Samsung Galaxy S24 Ultra 512GB (Titanium Black)',
    category: 'Smartphones',
    price: 1350000,
    originalPrice: 1420000,
    stock: 3,
    inStock: true,
    image: '/src/assets/images/smartphones_flagship_1792330408572.jpg',
    rating: 5.0,
    reviewsCount: 22,
    description: 'The pinnacle of Android engineering. Featuring built-in S-Pen, titanium frame, Galaxy AI live translate, and revolutionary 200MP camera system.',
    features: ['Snapdragon 8 Gen 3 for Galaxy', 'Built-in S-Pen', '200MP Quad Camera', '5000mAh Battery', '7 Years OS Updates'],
    specs: {
      'RAM & Storage': '12GB / 512GB',
      'Screen': '6.8" Dynamic AMOLED 2X 120Hz',
      'Network': '5G Global Dual SIM',
      'Status': 'Brand New Boxed'
    },
    isFeatured: true,
    isNew: true,
    tag: 'New Arrival',
    warranty: '1 Year Manufacturer Warranty'
  },
  {
    id: 'prod-sp-03',
    name: 'Redmi Note 13 Pro 8GB/256GB',
    category: 'Smartphones',
    price: 295000,
    originalPrice: 315000,
    stock: 9,
    inStock: true,
    image: '/src/assets/images/smartphones_flagship_1792330408572.jpg',
    rating: 4.8,
    reviewsCount: 45,
    description: 'Outstanding value mid-range performer with a stunning 200MP ultra-clear camera with OIS and 67W turbo charging.',
    features: ['200MP OIS Camera', '67W Turbo Charge', '120Hz AMOLED Display', 'In-screen Fingerprint'],
    specs: {
      'RAM': '8GB + Extended RAM',
      'Storage': '256GB',
      'Battery': '5000mAh',
      'Charging': '67W fast charger included'
    },
    isFeatured: false,
    tag: 'Best Seller',
    warranty: '12 Months Warranty'
  },

  // 2. Laptops
  {
    id: 'prod-lp-01',
    name: 'Apple MacBook Pro 14" M2 Pro (16GB RAM / 512GB SSD)',
    category: 'Laptops',
    price: 1450000,
    originalPrice: 1550000,
    stock: 2,
    inStock: true,
    image: '/src/assets/images/hero_tech_storefront_1792330408198.jpg',
    rating: 4.95,
    reviewsCount: 19,
    description: 'Pro performance machine for developers, graphic designers, audio engineers and content creators. Liquid Retina XDR display with incredible battery life.',
    features: ['Apple M2 Pro chip 10-core CPU', '16-core GPU', 'Liquid Retina XDR screen', 'MagSafe 3 Fast Charging', 'Studio-quality mics'],
    specs: {
      'Processor': 'Apple M2 Pro',
      'Memory': '16GB Unified Memory',
      'Storage': '512GB Ultra-fast SSD',
      'Condition': 'Foreign Used Clean (Open Box)'
    },
    isFeatured: true,
    tag: 'High Performance',
    warranty: '6 Months ICON Guarantee'
  },
  {
    id: 'prod-lp-02',
    name: 'HP EliteBook 840 G8 Core i7 11th Gen (16GB / 512GB SSD)',
    category: 'Laptops',
    price: 495000,
    originalPrice: 530000,
    stock: 5,
    inStock: true,
    image: '/src/assets/images/hero_tech_storefront_1792330408198.jpg',
    rating: 4.85,
    reviewsCount: 31,
    description: 'Corporate rugged aluminum ultrabook, ultra-fast NVMe storage, backlit keyboard, fingerprint sensor, and Bang & Olufsen premium audio.',
    features: ['Intel Core i7-1165G7', 'Full HD Anti-Glare Screen', 'Backlit Spill-Resistant Keyboard', 'Thunderbolt 4 support'],
    specs: {
      'CPU': 'Intel Core i7 11th Gen',
      'RAM': '16GB DDR4 (Expandable)',
      'Storage': '512GB NVMe SSD',
      'Battery Life': 'Up to 7 Hours Real Usage'
    },
    isFeatured: true,
    tag: 'Student & Office Choice',
    warranty: '90 Days Warranty'
  },

  // 3. Chargers
  {
    id: 'prod-ch-01',
    name: 'Oraimo PowerGaN 65W 3-Port Fast Charger (Type-C + USB-A)',
    category: 'Chargers',
    price: 19500,
    originalPrice: 23000,
    stock: 28,
    inStock: true,
    image: '/src/assets/images/accessories_audio_hub_1792330408891.jpg',
    rating: 4.9,
    reviewsCount: 64,
    description: 'Next-generation Gallium Nitride (GaN) technology charges laptops, MacBooks, iPhones, and Android phones simultaneously with maximum speed and thermal safety.',
    features: ['65W Total GaN Output', 'Dual Type-C + 1 USB-A port', 'Supports PD3.0, QC4.0+, PPS', 'Smart Temperature Guard'],
    specs: {
      'Max Power': '65W Max',
      'Ports': '2x USB-C + 1x USB-A',
      'Compatibility': 'Laptops, Tablets, iPhones, Androids',
      'Weight': '115g'
    },
    isFeatured: true,
    tag: 'Fast Charging',
    warranty: '1 Year Warranty'
  },
  {
    id: 'prod-ch-02',
    name: 'Original Apple 20W USB-C Power Adapter',
    category: 'Chargers',
    price: 14000,
    originalPrice: 16500,
    stock: 35,
    inStock: true,
    image: '/src/assets/images/accessories_audio_hub_1792330408891.jpg',
    rating: 4.8,
    reviewsCount: 82,
    description: 'Authentic 20W Power Delivery adapter. Fast charges iPhone from 0 to 50% in approximately 30 minutes with steady voltage protection.',
    features: ['Original Apple accessory', 'Compact UK 3-pin plug', 'Power Delivery 20W', 'Anti-surge protection'],
    specs: {
      'Output': '20W PD',
      'Connector': 'USB-C Female',
      'Color': 'Glossy White',
      'Standard': 'UK 3-Pin'
    },
    isFeatured: false,
    warranty: '6 Months Replacement'
  },

  // 4. USB Cables
  {
    id: 'prod-cb-01',
    name: 'Baseus 100W PD High-Density Braided Type-C to Type-C (2M)',
    category: 'USB Cables',
    price: 6500,
    originalPrice: 8000,
    stock: 45,
    inStock: true,
    image: '/src/assets/images/accessories_audio_hub_1792330408891.jpg',
    rating: 4.9,
    reviewsCount: 54,
    description: 'Heavy-duty braided cable engineered to withstand 20,000+ bends. Supports up to 100W 5A fast charging for laptops, tablets, and high-end smartphones.',
    features: ['100W 5A Fast Charge', 'E-Marker Intelligent Chip', '2 Metres Long Range', 'Zinc Alloy Connectors'],
    specs: {
      'Length': '2.0 Metres',
      'Material': 'Military-grade Nylon Braid',
      'Data Transfer': '480 Mbps',
      'Connector': 'Type-C to Type-C'
    },
    isFeatured: false,
    tag: 'Durable',
    warranty: '6 Months Warranty'
  },
  {
    id: 'prod-cb-02',
    name: 'Oraimo 3-in-1 Fast Charging Cable (Lightning + Type-C + Micro)',
    category: 'USB Cables',
    price: 4500,
    originalPrice: 5500,
    stock: 60,
    inStock: true,
    image: '/src/assets/images/accessories_audio_hub_1792330408891.jpg',
    rating: 4.75,
    reviewsCount: 92,
    description: 'All-in-one charging solution. Power up iPhones, older micro-USB devices, and modern Type-C phones from a single wall port.',
    features: ['3 Universal Connectors', '3A Total Output', 'Tangle-Free TPE Jacket', 'Reinforced Joint'],
    specs: {
      'Length': '1.2 Metres',
      'Connectors': 'Lightning, USB-C, Micro-USB',
      'Color': 'Obsidian Black',
      'Max Current': '3.0A'
    },
    isFeatured: false,
    warranty: '3 Months Replacement'
  },

  // 5. Fans
  {
    id: 'prod-fn-01',
    name: 'Lontor 16" Solar-Compatible Rechargeable Standing Fan with Remote',
    category: 'Fans',
    price: 58000,
    originalPrice: 65000,
    stock: 12,
    inStock: true,
    image: '/src/assets/images/hero_tech_storefront_1792330408198.jpg',
    rating: 4.85,
    reviewsCount: 40,
    description: 'Essential for Ondo weather and power outages. Provides up to 12 hours of cooling breeze on low speed, includes LED nightlight, USB phone charger port, and infrared remote.',
    features: ['Up to 12 Hours Battery Run', 'Solar DC Input Port', 'USB Mobile Phone Charging Port', 'Bright LED Emergency Light', 'Wireless Remote Control'],
    specs: {
      'Blade Size': '16 Inches (5 Blades)',
      'Battery': '12V 4.5Ah Lead-Acid / Lithium Pack',
      'Speed Levels': '3 Speeds (Low, Medium, High)',
      'Charging Time': '8-10 Hours AC'
    },
    isFeatured: true,
    tag: 'Ondo Best Seller',
    warranty: '6 Months Warranty'
  },
  {
    id: 'prod-fn-02',
    name: 'JISULIFE Ultra-Quiet Foldable Mini Desk Fan (4500mAh)',
    category: 'Fans',
    price: 16500,
    originalPrice: 19000,
    stock: 18,
    inStock: true,
    image: '/src/assets/images/accessories_audio_hub_1792330408891.jpg',
    rating: 4.9,
    reviewsCount: 27,
    description: 'Compact whisper-quiet personal cooling fan perfect for study desks at Adeyemi campus, office workstations, and bedside cooling. 16 hours endurance.',
    features: ['Brushless Motor (Quiet)', 'Foldable 180° Stand', 'Type-C Rechargeable', 'Digital Battery Display'],
    specs: {
      'Battery': '4500mAh Lithium-ion',
      'Working Hours': '5 - 16 Hours',
      'Noise': '< 25dB Whisper Quiet',
      'Port': 'Type-C USB'
    },
    isFeatured: false,
    warranty: '6 Months Warranty'
  },

  // 6. Bluetooth Speakers
  {
    id: 'prod-bs-01',
    name: 'JBL Flip 6 Portable Waterproof Bluetooth Speaker (Deep Bass)',
    category: 'Bluetooth Speakers',
    price: 115000,
    originalPrice: 125000,
    stock: 6,
    inStock: true,
    image: '/src/assets/images/accessories_audio_hub_1792330408891.jpg',
    rating: 4.95,
    reviewsCount: 48,
    description: 'Powerful room-filling JBL Original Pro Sound with punchy bass, dual passive radiators, 12 hours of playtime, and IP67 waterproof and dustproof protection.',
    features: ['IP67 Waterproof & Dustproof', '12 Hours Playtime', 'PartyBoost Multi-Speaker Pairing', 'Dual Passive Radiators'],
    specs: {
      'Output Power': '20W RMS Woofer + 10W RMS Tweeter',
      'Bluetooth': 'v5.1 High Def',
      'Battery': '4800mAh Li-ion polymer',
      'Dimensions': '17.8 x 6.8 x 7.2 cm'
    },
    isFeatured: true,
    tag: 'Premium Audio',
    warranty: '1 Year Guarantee'
  },
  {
    id: 'prod-bs-02',
    name: 'Oraimo SoundPro 20W Rugged Bluetooth Speaker',
    category: 'Bluetooth Speakers',
    price: 32000,
    originalPrice: 38000,
    stock: 14,
    inStock: true,
    image: '/src/assets/images/accessories_audio_hub_1792330408891.jpg',
    rating: 4.75,
    reviewsCount: 39,
    description: 'Heavy bass with dual 10W drivers, FM radio support, TF card slot, and auxiliary audio input. Great battery life for outdoor gatherings.',
    features: ['20W High Decibel Output', 'HavyBass Technology', 'Built-in FM Radio', 'MicroSD & Aux Playback'],
    specs: {
      'Battery': '3600mAh',
      'Playtime': '10 Hours',
      'Bluetooth': 'v5.3',
      'Inputs': 'Bluetooth, TF Card, USB, AUX'
    },
    isFeatured: false,
    warranty: '1 Year Warranty'
  },

  // 7. Headphones
  {
    id: 'prod-hp-01',
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    category: 'Headphones',
    price: 460000,
    originalPrice: 495000,
    stock: 3,
    inStock: true,
    image: '/src/assets/images/accessories_audio_hub_1792330408891.jpg',
    rating: 5.0,
    reviewsCount: 34,
    description: 'Industry-leading Active Noise Cancellation with two processors and eight microphones. Exceptional hi-res audio clarity and 30-hour battery life.',
    features: ['Auto NC Optimizer', 'Ultra-comfortable lightweight design', 'Crystal clear hands-free calling', 'Multipoint connection (2 devices)'],
    specs: {
      'Battery Life': '30 Hours with ANC On',
      'Quick Charge': '3 Min charge gives 3 hours playback',
      'Codecs': 'LDAC, AAC, SBC',
      'Weight': '250g'
    },
    isFeatured: true,
    tag: 'Audiophile Grade',
    warranty: '1 Year Warranty'
  },
  {
    id: 'prod-hp-02',
    name: 'Oraimo FreePods 4 ANC True Wireless Earbuds',
    category: 'Headphones',
    price: 36500,
    originalPrice: 42000,
    stock: 25,
    inStock: true,
    image: '/src/assets/images/accessories_audio_hub_1792330408891.jpg',
    rating: 4.8,
    reviewsCount: 71,
    description: 'Active Noise Cancellation with Transparency mode, customizable EQ presets via Oraimo Sound app, and 35.5 hours total battery life with pocket case.',
    features: ['30dB Active Noise Cancellation', 'Low-Latency Game Mode', 'Find My Earbuds via App', 'IPX5 Water Resistant'],
    specs: {
      'Driver': '10mm Dynamic Bass Drivers',
      'Case Battery': 'Up to 35.5 Hours',
      'Earbud Playtime': '8.5 Hours per charge',
      'Bluetooth': 'v5.2'
    },
    isFeatured: false,
    tag: 'Popular',
    warranty: '1 Year Warranty'
  },

  // 8. Phone Accessories
  {
    id: 'prod-ac-01',
    name: 'iPhone MagSafe Frosted Matte Anti-Drop Protective Case',
    category: 'Phone Accessories',
    price: 5500,
    originalPrice: 7000,
    stock: 50,
    inStock: true,
    image: '/src/assets/images/accessories_audio_hub_1792330408891.jpg',
    rating: 4.85,
    reviewsCount: 52,
    description: 'Military-grade 10ft drop protection with N52 strong neodymium magnetic ring for instant MagSafe snap-on wireless charging and car mounts.',
    features: ['Built-in N52 MagSafe Ring', 'Raised 1.5mm Camera Lip', 'Anti-Fingerprint Nano Coating', 'Shock-Absorbing Airbag Corners'],
    specs: {
      'Compatibility': 'Available for iPhone 11 up to 16 Pro Max',
      'Material': 'Bayer Polycarbonate + TPU',
      'Color Options': 'Matte Black, Deep Navy, Titanium Gray'
    },
    isFeatured: false,
    warranty: 'Store Replacement Guarantee'
  },
  {
    id: 'prod-ac-02',
    name: '9D Tempered Glass Screen Protector with Easy Align Frame',
    category: 'Phone Accessories',
    price: 2500,
    originalPrice: 3500,
    stock: 120,
    inStock: true,
    image: '/src/assets/images/accessories_audio_hub_1792330408891.jpg',
    rating: 4.9,
    reviewsCount: 110,
    description: 'Ultra-clear 9H hardness tempered glass with edge-to-edge coverage. Free professional bubble-free installation available in our Ondo shop.',
    features: ['9H Surface Hardness', 'Oleophobic Oil-Resistant Coating', 'Full Edge-to-Edge Adhesive', 'Free in-store installation'],
    specs: {
      'Thickness': '0.33mm Ultra-thin',
      'Transparency': '99.9% HD Clarity',
      'Compatibility': 'Samsung, iPhone, Redmi, Tecno, Infinix'
    },
    isFeatured: false,
    warranty: 'Replacement if defective'
  },

  // 9. Power Banks
  {
    id: 'prod-pb-01',
    name: 'Oraimo Toast 10 Byte 20000mAh 22.5W Fast Charging Power Bank',
    category: 'Power Banks',
    price: 28500,
    originalPrice: 33000,
    stock: 18,
    inStock: true,
    image: '/src/assets/images/accessories_audio_hub_1792330408891.jpg',
    rating: 4.88,
    reviewsCount: 65,
    description: 'Massive 20000mAh capacity provides 4-5 full smartphone recharges. Features 22.5W two-way fast charge and multi-device simultaneous charging.',
    features: ['22.5W Quick Charge', 'Charges 3 Devices at Once', 'Digital LED Display', 'Airline Approved'],
    specs: {
      'Capacity': '20,000mAh (74Wh)',
      'Input': 'Type-C & Micro-USB',
      'Outputs': '2x USB-A (22.5W Max) + 1x Type-C (20W PD)',
      'Dimensions': '14.8 x 6.9 x 2.8 cm'
    },
    isFeatured: true,
    tag: 'Campus Essential',
    warranty: '1 Year Warranty'
  },
  {
    id: 'prod-pb-02',
    name: 'Newgen 30000mAh Heavy Duty Laptop & Phone Power Station (65W PD)',
    category: 'Power Banks',
    price: 68000,
    originalPrice: 75000,
    stock: 7,
    inStock: true,
    image: '/src/assets/images/accessories_audio_hub_1792330408891.jpg',
    rating: 4.92,
    reviewsCount: 23,
    description: 'High capacity power station that can power MacBooks, Type-C laptops, drones, cameras, and smartphones during long study or work sessions.',
    features: ['65W Type-C Laptop Charging', '30000mAh High-Density Cell', 'Digital Voltage/Wattage Display', 'Pass-through charging'],
    specs: {
      'Capacity': '30,000mAh (111Wh)',
      'Output 1 (USB-C)': '65W Max PD',
      'Output 2 & 3': 'QC3.0 18W Fast Charge',
      'Recharge Time': 'Under 3 hours with 65W GaN adapter'
    },
    isFeatured: true,
    tag: 'Heavy Duty',
    warranty: '1 Year Warranty'
  },

  // 10. Storage Devices
  {
    id: 'prod-st-01',
    name: 'SanDisk Extreme Portable 1TB USB 3.2 External SSD (1050MB/s)',
    category: 'Storage Devices',
    price: 135000,
    originalPrice: 148000,
    stock: 8,
    inStock: true,
    image: '/src/assets/images/accessories_audio_hub_1792330408891.jpg',
    rating: 4.9,
    reviewsCount: 31,
    description: 'Blazing fast NVMe solid state performance in a rugged, water and dust resistant shell. Ideal for saving 4K videos, projects, and large files.',
    features: ['1050MB/s Read Speed', 'IP55 Water & Dust Resistance', 'Carabiner Loop for Portability', 'Password Encryption'],
    specs: {
      'Capacity': '1TB NVMe SSD',
      'Interface': 'USB 3.2 Gen 2 Type-C',
      'Drop Protection': 'Up to 2 Metre Drop Tested',
      'Compatibility': 'Mac, Windows, Android, iPad'
    },
    isFeatured: false,
    tag: 'High Speed',
    warranty: '3 Years Warranty'
  },
  {
    id: 'prod-st-02',
    name: 'SanDisk Ultra Dual Drive Luxe 128GB (USB-C & USB-A Metal)',
    category: 'Storage Devices',
    price: 16000,
    originalPrice: 19000,
    stock: 24,
    inStock: true,
    image: '/src/assets/images/accessories_audio_hub_1792330408891.jpg',
    rating: 4.8,
    reviewsCount: 42,
    description: 'Full-metal 2-in-1 flash drive with reversible USB Type-C and traditional Type-A connectors. Effortlessly move files between phone, tablet, and computer.',
    features: ['Dual Type-C & Type-A connectors', 'Up to 150MB/s Transfer', 'All-Metal Swivel Housing', 'Keyring loop'],
    specs: {
      'Capacity': '128GB',
      'Read Speed': 'Up to 150MB/s',
      'Material': 'Cast Metal Body',
      'Color': 'Silver Chrome'
    },
    isFeatured: false,
    warranty: '5 Years Manufacturer Warranty'
  },

  // 11. Other Electronics
  {
    id: 'prod-oe-01',
    name: 'Hikvision 1080P Full HD Smart Wi-Fi Security Camera (Night Vision)',
    category: 'Other Electronics',
    price: 24500,
    originalPrice: 28000,
    stock: 10,
    inStock: true,
    image: '/src/assets/images/accessories_audio_hub_1792330408891.jpg',
    rating: 4.7,
    reviewsCount: 16,
    description: 'Keep your home or shop safe. 360° pan/tilt motion tracking, two-way audio speaker, micro-SD slot, and live phone streaming from anywhere in the world.',
    features: ['360° Horizontal Panoramic View', 'Infrared Night Vision up to 10m', 'Two-Way Intercom Audio', 'Instant Motion Alerts on Phone'],
    specs: {
      'Resolution': '1080P Full HD (1920x1080)',
      'Storage': 'Supports up to 256GB MicroSD + Cloud',
      'Connectivity': 'Wi-Fi 2.4GHz',
      'Power': '5V USB Adapter Included'
    },
    isFeatured: false,
    warranty: '1 Year Warranty'
  },
  {
    id: 'prod-oe-02',
    name: 'Mercury 1.2kVA Line Interactive Inverter UPS',
    category: 'Other Electronics',
    price: 78000,
    originalPrice: 85000,
    stock: 5,
    inStock: true,
    image: '/src/assets/images/hero_tech_storefront_1792330408198.jpg',
    rating: 4.85,
    reviewsCount: 20,
    description: 'Reliable surge and power backup for desktop computers, gaming setups, Wi-Fi routers, and audio equipment in offices and shops.',
    features: ['1200VA / 720W Capacity', 'Automatic Voltage Regulation (AVR)', 'Battery Backup Protection', 'Cold Start Function'],
    specs: {
      'Capacity': '1200VA / 720W',
      'Outlets': 'Universal Sockets',
      'Recharge Time': '6 Hours to 90%',
      'Weight': '8.5 kg'
    },
    isFeatured: false,
    warranty: '1 Year Warranty'
  },

  // 12. Repair Services
  {
    id: 'prod-rp-01',
    name: 'Original AMOLED / LCD Screen Replacement Service',
    category: 'Repair Services',
    price: 18000,
    stock: 99,
    inStock: true,
    image: '/src/assets/images/repair_lab_bench_1792330409718.jpg',
    rating: 4.95,
    reviewsCount: 142,
    description: 'Professional precision screen replacement for iPhone, Samsung, Tecno, Infinix, Redmi, and Laptops. Includes original display panels, dust seal replacement, and test calibration.',
    features: ['Original OLED / IPS Panels', 'TrueTone & Face ID Preserved', 'Free Anti-dust Adhesive Seal', 'Express 45-Minute Service'],
    specs: {
      'Turnaround': '45 - 90 Minutes',
      'Warranty': '90 Days Screen Guarantee',
      'Devices': 'All Smartphone Brands & Laptops',
      'Technicians': 'Certified Level-3 Micro-Soldering'
    },
    isFeatured: true,
    tag: 'Most Requested',
    warranty: '90 Days Free Replacement'
  },
  {
    id: 'prod-rp-02',
    name: 'High-Capacity Battery Replacement & Health Restoration',
    category: 'Repair Services',
    price: 12000,
    stock: 99,
    inStock: true,
    image: '/src/assets/images/repair_lab_bench_1792330409718.jpg',
    rating: 4.9,
    reviewsCount: 88,
    description: 'Revive your dying device with grade-A zero-cycle batteries. Restores full battery health, eliminates sudden shutdowns, and prevents swelling damage.',
    features: ['Grade A 0-Cycle Battery Cells', 'Zero-Drain Thermal Safety', '100% Health Display Recalibrated', 'Safe Eco Disposal of Old Battery'],
    specs: {
      'Turnaround': '30 - 45 Minutes',
      'Warranty': '180 Days Battery Guarantee',
      'Coverage': 'iPhone, Samsung, HP, Dell, MacBook'
    },
    isFeatured: false,
    tag: 'Quick Fix',
    warranty: '6 Months Guarantee'
  },
  {
    id: 'prod-rp-03',
    name: 'Motherboard IC Micro-Soldering & Water Damage Recovery',
    category: 'Repair Services',
    price: 25000,
    stock: 99,
    inStock: true,
    image: '/src/assets/images/repair_lab_bench_1792330409718.jpg',
    rating: 4.88,
    reviewsCount: 63,
    description: 'Specialized lab diagnosis for devices declared dead by other shops. Ultrasonic ultrasonic bath cleansing, short-circuit detection, and PMIC / charging IC micro-soldering.',
    features: ['Digital Microscope Inspection', 'Ultrasonic Chemical De-oxidation', 'Short-Circuit Thermal Camera Scan', 'Full Data Safety Priority'],
    specs: {
      'Turnaround': '24 - 48 Hours',
      'Diagnostic Fee': 'Free If Device Is Repaired Here',
      'Warranty': '60 Days Workmanship Guarantee'
    },
    isFeatured: false,
    tag: 'Specialist Lab',
    warranty: '60 Days Workmanship'
  }
];

export const INITIAL_REPAIR_TICKETS: RepairTicket[] = [
  {
    id: 'rep-01',
    ticketNumber: 'IC-REP-8821',
    customerName: 'Babatunde Adeleke',
    phone: '0813 456 7890',
    email: 'babatunde.a@gmail.com',
    deviceType: 'Smartphone',
    brandModel: 'iPhone 13 (Midnight 128GB)',
    faultCategory: 'Screen Replacement',
    faultDescription: 'Accidental drop on tiled floor. Front glass shattered, touch is unresponsive on upper right half, display flickers.',
    urgency: 'Express Same-Day',
    status: 'Ready for Pickup',
    estimatedCost: 65000,
    depositPaid: 30000,
    createdAt: '2026-10-16 11:24 AM',
    updatedAt: '2026-10-17 04:15 PM',
    assignedTechnician: 'Engr. David (Lead Technician)',
    timeline: [
      { status: 'Ticket Created', timestamp: '2026-10-16 11:24 AM', note: 'Device booked in at shop opposite Adeyemi.' },
      { status: 'Diagnosing', timestamp: '2026-10-16 01:10 PM', note: 'Face ID module intact. Clean OLED screen replacement required.' },
      { status: 'In Repair', timestamp: '2026-10-17 10:30 AM', note: 'Original OLED assembly fitted, TrueTone data transferred successfully.' },
      { status: 'Ready for Pickup', timestamp: '2026-10-17 04:15 PM', note: 'Device passed all multi-point stress tests. Ready with customer.' }
    ]
  },
  {
    id: 'rep-02',
    ticketNumber: 'IC-REP-8834',
    customerName: 'Grace Omowunmi',
    phone: '0802 991 3412',
    email: 'grace.omo@yahoo.com',
    deviceType: 'Laptop',
    brandModel: 'HP Pavilion 15 (Core i5 10th Gen)',
    faultCategory: 'Motherboard Repair',
    faultDescription: 'No power, charging light blinks 3 times when plugged in then stops. Suspected power surge after generator switched off.',
    urgency: 'Standard (1-2 days)',
    status: 'In Repair',
    estimatedCost: 28000,
    depositPaid: 15000,
    createdAt: '2026-10-17 09:12 AM',
    updatedAt: '2026-10-18 10:00 AM',
    assignedTechnician: 'Engr. David',
    timeline: [
      { status: 'Ticket Created', timestamp: '2026-10-17 09:12 AM', note: 'Booked via website repair enquiry form.' },
      { status: 'Diagnosing', timestamp: '2026-10-17 02:00 PM', note: 'Short-circuit isolated at 19V rail capacitor and charging MOSFET.' },
      { status: 'In Repair', timestamp: '2026-10-18 10:00 AM', note: 'Replacement MOSFETs soldered; testing voltage stability under load.' }
    ]
  },
  {
    id: 'rep-03',
    ticketNumber: 'IC-REP-8840',
    customerName: 'Samuel Olawale',
    phone: '0706 112 5543',
    email: 'samuel.ola@adeyemi.edu.ng',
    deviceType: 'Smartphone',
    brandModel: 'Samsung Galaxy A32',
    faultCategory: 'Battery Replacement',
    faultDescription: 'Battery drains from 100% to 15% in less than 2 hours. Phone becomes very warm near the back cover.',
    urgency: 'Express Same-Day',
    status: 'Diagnosing',
    estimatedCost: 16500,
    depositPaid: 5000,
    createdAt: '2026-10-18 08:30 AM',
    updatedAt: '2026-10-18 09:45 AM',
    assignedTechnician: 'Engr. Taiwo',
    timeline: [
      { status: 'Ticket Created', timestamp: '2026-10-18 08:30 AM', note: 'Walk-in customer received.' },
      { status: 'Diagnosing', timestamp: '2026-10-18 09:45 AM', note: 'Battery cycle count exceeded 850 cycles with high internal resistance.' }
    ]
  }
];

export const INITIAL_ORDERS: CustomerOrder[] = [
  {
    id: 'ord-101',
    orderNumber: 'IC-ORD-4921',
    customerName: 'Kehinde Balogun',
    phone: '0814 332 9901',
    whatsapp: '2348143329901',
    deliveryAddress: 'Plot 12, Adeyemi Staff Quarters, Ondo Town',
    deliveryTown: 'Ondo City',
    items: [
      { id: 'prod-ch-01', name: 'Oraimo PowerGaN 65W Fast Charger', price: 19500, quantity: 1, subtotal: 19500 },
      { id: 'prod-cb-01', name: 'Baseus 100W PD High-Density Braided Type-C Cable', price: 6500, quantity: 2, subtotal: 13000 }
    ],
    subtotal: 32500,
    deliveryFee: 1500,
    totalAmount: 34000,
    status: 'Delivered',
    paymentMethod: 'WhatsApp Confirmation',
    createdAt: '2026-10-16 03:40 PM',
    notes: 'Delivered in-person with receipt.'
  },
  {
    id: 'ord-102',
    orderNumber: 'IC-ORD-4928',
    customerName: 'Amina Yusuf',
    phone: '0903 881 2290',
    whatsapp: '2349038812290',
    deliveryAddress: 'Opposite Adeyemi College gate, Store #4',
    deliveryTown: 'Ondo City',
    items: [
      { id: 'prod-pb-01', name: 'Oraimo Toast 10 Byte 20000mAh Power Bank', price: 28500, quantity: 1, subtotal: 28500 }
    ],
    subtotal: 28500,
    deliveryFee: 0,
    totalAmount: 28500,
    status: 'Processing',
    paymentMethod: 'Pay on Pickup',
    createdAt: '2026-10-17 11:15 AM',
    notes: 'Customer will pick up at store counter.'
  }
];

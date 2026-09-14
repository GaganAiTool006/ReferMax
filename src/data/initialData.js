export const initialCoupons = [
  {
    id: "CPN-01",
    code: "STEPX10",
    discountPercent: 10,
    minSpend: 50,
    description: "10% OFF on all orders over $50",
    isActive: true,
    expiresAt: "2026-12-31"
  },
  {
    id: "CPN-02",
    code: "VIP20",
    discountPercent: 20,
    minSpend: 120,
    description: "20% OFF exclusive VIP discount on orders over $120",
    isActive: true,
    expiresAt: "2026-12-31"
  },
  {
    id: "CPN-03",
    code: "FIRSTDROP",
    discountPercent: 15,
    minSpend: 75,
    description: "15% OFF for first-time shoppers",
    isActive: true,
    expiresAt: "2026-12-31"
  },
  {
    id: "CPN-04",
    code: "FREESHIP",
    discountPercent: 0,
    freeShipping: true,
    minSpend: 40,
    description: "Free express shipping on orders over $40",
    isActive: true,
    expiresAt: "2026-12-31"
  }
];

export const initialBanners = [
  {
    id: "bnr-1",
    title: "ENGINEERED FOR THE RELENTLESS",
    subtitle: "Experience next-generation carbon propulsion with the all-new STEPX Apex Series.",
    tag: "SPRING / SUMMER 2026 DROP",
    buttonText: "Shop Collection",
    buttonLink: "/shop?category=Running+Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    theme: "dark",
    isActive: true
  },
  {
    id: "bnr-2",
    title: "RETRO HERITAGE. MODERN SOLE.",
    subtitle: "Iconic silhouettes handcrafted in Portuguese tumbled leather with ultra-responsive air cushioning.",
    tag: "STREETWEAR ICONS",
    buttonText: "Explore Sneakers",
    buttonLink: "/shop?category=Sneakers",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80",
    theme: "dark",
    isActive: true
  },
  {
    id: "bnr-3",
    title: "LIMITED QUANTUM CARBON X",
    subtitle: "Only 500 laser-numbered pairs worldwide. Engineered for gold medal speed.",
    tag: "EXCLUSIVE DROP",
    buttonText: "View Limited Drop",
    buttonLink: "/product/stepx-ltd-01",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80",
    theme: "dark",
    isActive: true
  }
];

export const initialReviews = [
  {
    id: "rev-1",
    author: "Alexander Wright",
    role: "Marathon Runner",
    rating: 5,
    title: "Game changer for marathon training",
    comment: "The VaporFly Apex Pro gave me 15 seconds per kilometer energy return. The carbon plate transition is smooth and effortless.",
    product: "STEPX VaporFly Apex Pro",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "rev-2",
    author: "Elena Rostova",
    role: "Fashion Stylist",
    rating: 5,
    title: "Supreme quality & head-turning aesthetic",
    comment: "The leather quality on the Retro Air 90 High rivals luxury designer houses costing triple the price. STEPX knocked it out of the park.",
    product: "STEPX Retro Air 90 High",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "rev-3",
    author: "Marcus Chen",
    role: "CrossFit Coach",
    rating: 5,
    title: "Unmatched stability under heavy barbell loads",
    comment: "The Metrix CrossTrain 5 provides the most stable base I have ever tested for heavy squats and Olympic lifting. Rigid yet remarkably flexible.",
    product: "STEPX Metrix CrossTrain 5",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  }
];

export const initialOrders = [
  {
    id: "ORD-98421",
    createdAt: "2026-08-27T14:32:00Z",
    customer: {
      name: "Marcus Vance",
      email: "marcus.v@example.com",
      phone: "+1 (555) 234-8901",
      address: {
        street: "742 Evergreen Terrace",
        city: "San Francisco",
        state: "CA",
        zip: "94107",
        country: "United States"
      }
    },
    items: [
      {
        id: "stepx-run-01",
        name: "STEPX VaporFly Apex Pro",
        price: 149.99,
        size: 10,
        color: "Electric Volt / Jet Black",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: "stepx-san-01",
        name: "STEPX HydroComfort Recovery Slide",
        price: 44.99,
        size: 10,
        color: "Matte Charcoal",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=400&q=80"
      }
    ],
    subtotal: 194.98,
    discount: 19.50,
    shippingFee: 0.00,
    total: 175.48,
    couponCode: "STEPX10",
    paymentMethod: "Credit Card (•••• 4242)",
    paymentStatus: "Paid",
    status: "Shipped",
    estimatedDelivery: "2026-08-30",
    trackingNumber: "SPX-US-849204820",
    timeline: [
      { status: "Order Placed", date: "Aug 27, 2026 14:32", completed: true },
      { status: "Payment Confirmed", date: "Aug 27, 2026 14:33", completed: true },
      { status: "Processing in Warehouse", date: "Aug 27, 2026 18:00", completed: true },
      { status: "Shipped with Express", date: "Aug 28, 2026 09:15", completed: true },
      { status: "Out for Delivery", date: "Pending", completed: false },
      { status: "Delivered", date: "Expected Aug 30", completed: false }
    ]
  },
  {
    id: "ORD-98418",
    createdAt: "2026-08-26T09:15:00Z",
    customer: {
      name: "Elena Rostova",
      email: "elena.r@example.com",
      phone: "+1 (555) 987-6543",
      address: {
        street: "450 5th Avenue, Apt 12B",
        city: "New York",
        state: "NY",
        zip: "10018",
        country: "United States"
      }
    },
    items: [
      {
        id: "stepx-snk-01",
        name: "STEPX Retro Air 90 High",
        price: 159.99,
        size: 8,
        color: "Chicago Red / Classic Black",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=400&q=80"
      }
    ],
    subtotal: 159.99,
    discount: 32.00,
    shippingFee: 0.00,
    total: 127.99,
    couponCode: "VIP20",
    paymentMethod: "Apple Pay",
    paymentStatus: "Paid",
    status: "Delivered",
    estimatedDelivery: "2026-08-28",
    trackingNumber: "SPX-US-991204123",
    timeline: [
      { status: "Order Placed", date: "Aug 26, 2026 09:15", completed: true },
      { status: "Payment Confirmed", date: "Aug 26, 2026 09:16", completed: true },
      { status: "Shipped with Express", date: "Aug 26, 2026 14:00", completed: true },
      { status: "Delivered", date: "Aug 28, 2026 11:45", completed: true }
    ]
  },
  {
    id: "ORD-98402",
    createdAt: "2026-08-28T08:00:00Z",
    customer: {
      name: "David Kim",
      email: "david.kim@example.com",
      phone: "+1 (555) 432-1098",
      address: {
        street: "1200 Grand Blvd",
        city: "Seattle",
        state: "WA",
        zip: "98101",
        country: "United States"
      }
    },
    items: [
      {
        id: "stepx-trn-01",
        name: "STEPX Metrix CrossTrain 5",
        price: 124.99,
        size: 11,
        color: "Stealth Black / Gunmetal",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=400&q=80"
      }
    ],
    subtotal: 124.99,
    discount: 0.00,
    shippingFee: 0.00,
    total: 124.99,
    couponCode: "",
    paymentMethod: "Credit Card (•••• 8812)",
    paymentStatus: "Paid",
    status: "Processing",
    estimatedDelivery: "2026-08-31",
    trackingNumber: "SPX-US-382910394",
    timeline: [
      { status: "Order Placed", date: "Aug 28, 2026 08:00", completed: true },
      { status: "Payment Confirmed", date: "Aug 28, 2026 08:01", completed: true },
      { status: "Processing in Warehouse", date: "Aug 28, 2026 09:30", completed: true },
      { status: "Shipped with Express", date: "Pending", completed: false },
      { status: "Delivered", date: "Expected Aug 31", completed: false }
    ]
  }
];

export const initialCustomers = [
  {
    id: "cust-01",
    name: "Marcus Vance",
    email: "marcus.v@example.com",
    role: "customer",
    phone: "+1 (555) 234-8901",
    ordersCount: 4,
    totalSpent: 624.50,
    joinedDate: "2026-02-14",
    status: "Active",
    tier: "Gold VIP"
  },
  {
    id: "cust-02",
    name: "Elena Rostova",
    email: "elena.r@example.com",
    role: "customer",
    phone: "+1 (555) 987-6543",
    ordersCount: 6,
    totalSpent: 980.20,
    joinedDate: "2026-01-10",
    status: "Active",
    tier: "Platinum VIP"
  },
  {
    id: "cust-03",
    name: "David Kim",
    email: "david.kim@example.com",
    role: "customer",
    phone: "+1 (555) 432-1098",
    ordersCount: 2,
    totalSpent: 284.99,
    joinedDate: "2026-06-20",
    status: "Active",
    tier: "Silver"
  },
  {
    id: "cust-04",
    name: "Sophia Martinez",
    email: "sophia.m@example.com",
    role: "customer",
    phone: "+1 (555) 345-6789",
    ordersCount: 5,
    totalSpent: 750.00,
    joinedDate: "2026-03-05",
    status: "Active",
    tier: "Gold VIP"
  }
];

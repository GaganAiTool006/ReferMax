import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/products';
import { 
  initialOrders, 
  initialCustomers, 
  initialCoupons, 
  initialBanners, 
  initialReviews 
} from '../data/initialData';

const DataContext = createContext();

export function DataProvider({ children }) {
  // 1. Products State
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('stepx_products_db');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  // 2. Orders State
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('stepx_orders_db');
      return saved ? JSON.parse(saved) : initialOrders;
    } catch {
      return initialOrders;
    }
  });

  // 3. Customers State
  const [customers, setCustomers] = useState(() => {
    try {
      const saved = localStorage.getItem('stepx_customers_db');
      return saved ? JSON.parse(saved) : initialCustomers;
    } catch {
      return initialCustomers;
    }
  });

  // 4. Coupons State
  const [coupons, setCoupons] = useState(() => {
    try {
      const saved = localStorage.getItem('stepx_coupons_db');
      return saved ? JSON.parse(saved) : initialCoupons;
    } catch {
      return initialCoupons;
    }
  });

  // 5. Banners State
  const [banners, setBanners] = useState(() => {
    try {
      const saved = localStorage.getItem('stepx_banners_db');
      return saved ? JSON.parse(saved) : initialBanners;
    } catch {
      return initialBanners;
    }
  });

  // 6. Reviews State
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('stepx_reviews_db');
      return saved ? JSON.parse(saved) : initialReviews;
    } catch {
      return initialReviews;
    }
  });

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('stepx_products_db', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('stepx_orders_db', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('stepx_customers_db', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('stepx_coupons_db', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('stepx_banners_db', JSON.stringify(banners));
  }, [banners]);

  // Product Operations
  const addProduct = (newProduct) => {
    const id = 'stepx-' + Date.now().toString(36);
    const product = {
      ...newProduct,
      id,
      rating: newProduct.rating || 5.0,
      reviewsCount: newProduct.reviewsCount || 0,
      reviews: newProduct.reviews || []
    };
    setProducts(prev => [product, ...prev]);
    return product;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateStock = (id, newStock) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: Number(newStock) } : p));
  };

  // Add Product Review
  const addProductReview = (productId, reviewData) => {
    const newReview = {
      id: 'rev-' + Date.now(),
      user: reviewData.author || 'STEPX Member',
      rating: Number(reviewData.rating) || 5,
      date: new Date().toISOString().split('T')[0],
      comment: reviewData.comment,
      verified: true
    };

    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const updatedReviews = [newReview, ...(p.reviews || [])];
        const newAvg = (
          updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length
        ).toFixed(1);
        return {
          ...p,
          reviews: updatedReviews,
          reviewsCount: updatedReviews.length,
          rating: Number(newAvg)
        };
      }
      return p;
    }));
  };

  // Order Operations
  const placeOrder = (orderData) => {
    const orderId = 'ORD-' + Math.floor(10000 + Math.random() * 90000);
    const trackingNumber = 'SPX-US-' + Math.floor(100000000 + Math.random() * 900000000);
    
    const newOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      status: 'Processing',
      trackingNumber,
      timeline: [
        { status: 'Order Placed', date: new Date().toLocaleString(), completed: true },
        { status: 'Payment Confirmed', date: new Date().toLocaleString(), completed: true },
        { status: 'Processing in Warehouse', date: 'In Progress', completed: true },
        { status: 'Shipped with Express', date: 'Pending', completed: false },
        { status: 'Out for Delivery', date: 'Pending', completed: false },
        { status: 'Delivered', date: 'Expected 3-5 business days', completed: false }
      ],
      ...orderData
    };

    setOrders(prev => [newOrder, ...prev]);

    // Deduct stock for ordered items
    orderData.items.forEach(item => {
      setProducts(prev => prev.map(p => {
        if (p.id === item.id) {
          const remaining = Math.max(0, (p.stock || 10) - item.quantity);
          return { ...p, stock: remaining };
        }
        return p;
      }));
    });

    // Update customer spending stats if registered
    if (orderData.customer?.email) {
      setCustomers(prev => {
        const exists = prev.find(c => c.email === orderData.customer.email);
        if (exists) {
          return prev.map(c => c.email === orderData.customer.email ? {
            ...c,
            ordersCount: (c.ordersCount || 0) + 1,
            totalSpent: Number(((c.totalSpent || 0) + orderData.total).toFixed(2))
          } : c);
        } else {
          return [{
            id: 'cust-' + Date.now(),
            name: orderData.customer.name,
            email: orderData.customer.email,
            phone: orderData.customer.phone || '',
            ordersCount: 1,
            totalSpent: Number(orderData.total.toFixed(2)),
            joinedDate: new Date().toISOString().split('T')[0],
            status: 'Active',
            tier: 'Silver'
          }, ...prev];
        }
      });
    }

    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const updatedTimeline = (order.timeline || []).map(step => {
          if (step.status.toLowerCase().includes(newStatus.toLowerCase())) {
            return { ...step, completed: true, date: new Date().toLocaleString() };
          }
          return step;
        });
        return {
          ...order,
          status: newStatus,
          timeline: updatedTimeline
        };
      }
      return order;
    }));
  };

  const cancelOrder = (orderId) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status: 'Cancelled',
          timeline: [
            ...(order.timeline || []),
            { status: 'Order Cancelled', date: new Date().toLocaleString(), completed: true }
          ]
        };
      }
      return order;
    }));
  };

  // Coupon Operations
  const addCoupon = (newCoupon) => {
    const coupon = {
      id: 'CPN-' + Date.now().toString(36).toUpperCase(),
      isActive: true,
      ...newCoupon
    };
    setCoupons(prev => [coupon, ...prev]);
    return coupon;
  };

  const toggleCoupon = (id) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
  };

  const deleteCoupon = (id) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
  };

  // Banner Operations
  const addBanner = (newBanner) => {
    const banner = {
      id: 'bnr-' + Date.now().toString(36),
      isActive: true,
      ...newBanner
    };
    setBanners(prev => [banner, ...prev]);
    return banner;
  };

  const updateBanner = (id, updatedFields) => {
    setBanners(prev => prev.map(b => b.id === id ? { ...b, ...updatedFields } : b));
  };

  const deleteBanner = (id) => {
    setBanners(prev => prev.filter(b => b.id !== id));
  };

  // Live Aggregate Analytics Calculation
  const totalRevenue = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + (Number(o.total) || 0), 0);

  const totalOrdersCount = orders.length;
  const totalCustomersCount = customers.length;
  const totalProductsCount = products.length;

  return (
    <DataContext.Provider
      value={{
        products,
        orders,
        customers,
        coupons,
        banners,
        reviews,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        addProductReview,
        placeOrder,
        updateOrderStatus,
        cancelOrder,
        addCoupon,
        toggleCoupon,
        deleteCoupon,
        addBanner,
        updateBanner,
        deleteBanner,
        stats: {
          totalRevenue,
          totalOrdersCount,
          totalCustomersCount,
          totalProductsCount
        }
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

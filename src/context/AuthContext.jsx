import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

const STORAGE_USERS_KEY = 'gaming_platform_users_v2';
const STORAGE_CURRENT_USER_KEY = 'gaming_platform_current_user_v2';
const STORAGE_SESSION_TIME_KEY = 'gaming_platform_session_time_v2';

// 2 Hours Session Duration in Milliseconds (2 hours = 7,200,000 ms)
const SESSION_DURATION_MS = 2 * 60 * 60 * 1000;

export const AuthProvider = ({ children }) => {
  const { showSuccess, showError, showBonus, showInfo, showWarning } = useToast();

  // Load all users from localStorage or initialize with demo seed
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_USERS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    const defaultUser = {
      id: 'usr_main_8899',
      name: 'Vikas Sharma',
      phone: '9876543210',
      email: 'vikas.pro@gmail.com',
      password: 'password123',
      referralCode: 'VIKAS20',
      referredBy: null,
      referralCount: 4,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      upiId: 'vikas@upi',
      bankName: 'State Bank of India',
      accountNumber: '389201928374',
      ifscCode: 'SBIN0001234',
      isProfileComplete: true,
      hasDepositedAtLeastOnce: true,
      createdAt: new Date().toISOString()
    };
    return [defaultUser];
  });

  // Current logged in user ID with 2-hour session check
  const [currentUserId, setCurrentUserId] = useState(() => {
    const savedUserId = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
    const sessionTime = localStorage.getItem(STORAGE_SESSION_TIME_KEY);
    
    if (savedUserId && sessionTime) {
      const timeElapsed = Date.now() - Number(sessionTime);
      if (timeElapsed < SESSION_DURATION_MS) {
        return savedUserId;
      } else {
        // Session expired on load
        localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
        localStorage.removeItem(STORAGE_SESSION_TIME_KEY);
        return null;
      }
    }
    return savedUserId || 'usr_main_8899';
  });

  // Pending OTP verification state
  const [pendingOtpData, setPendingOtpData] = useState(null);

  // Sync users to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  }, [users]);

  // Sync current user ID & session timestamp
  useEffect(() => {
    if (currentUserId) {
      localStorage.setItem(STORAGE_CURRENT_USER_KEY, currentUserId);
      if (!localStorage.getItem(STORAGE_SESSION_TIME_KEY)) {
        localStorage.setItem(STORAGE_SESSION_TIME_KEY, Date.now().toString());
      }
    } else {
      localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
      localStorage.removeItem(STORAGE_SESSION_TIME_KEY);
    }
  }, [currentUserId]);

  // Logout handler
  const logout = useCallback((reason = 'manual') => {
    setCurrentUserId(null);
    localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
    localStorage.removeItem(STORAGE_SESSION_TIME_KEY);
    if (reason === 'expired') {
      showError(
        'सुरक्षा कारणों से आपका 2 घंटे का सत्र (Session) समाप्त हो गया है। कृपया पुनः लॉगिन करें।',
        'Session Expired (2 Hours)'
      );
    } else {
      showInfo('आप सफलतापूर्वक लॉगआउट हो गए हैं।', 'लॉगआउट (Logged Out)');
    }
  }, [showError, showInfo]);

  // 🌟 AUTOMATIC 2-HOUR SESSION EXPIRY CHECKER (Runs every 30 seconds)
  useEffect(() => {
    if (!currentUserId) return;

    const checkSession = () => {
      const sessionTime = localStorage.getItem(STORAGE_SESSION_TIME_KEY);
      if (sessionTime) {
        const timeElapsed = Date.now() - Number(sessionTime);
        if (timeElapsed >= SESSION_DURATION_MS) {
          logout('expired');
        }
      }
    };

    const interval = setInterval(checkSession, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, [currentUserId, logout]);

  const currentUser = users.find((u) => u.id === currentUserId) || null;

  // Generate unique 6-character referral code
  const generateReferralCode = (name = 'USER') => {
    const clean = name.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 4) || 'GAME';
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `${clean}${rand}`;
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  };

  // 1. Send OTP for Registration
  const requestRegisterOtp = ({ phone, email, password, referralCode, name }) => {
    if (!phone || phone.length < 10) {
      showError('कृपया वैध 10-अंकीय मोबाइल नंबर दर्ज करें (Enter valid 10-digit mobile number)');
      return false;
    }
    if (!email || !email.includes('@')) {
      showError('कृपया वैध ईमेल आईडी दर्ज करें (Enter valid email address)');
      return false;
    }
    if (!password || password.length < 6) {
      showError('पासवर्ड कम से कम 6 अक्षरों का होना चाहिए (Password must be 6+ characters)');
      return false;
    }

    const existing = users.find((u) => u.phone === phone || u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      showError('यह फोन नंबर या ईमेल पहले से रजिस्टर्ड है! कृपया लॉगिन करें (Already registered, please login)');
      return false;
    }

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    
    setPendingOtpData({
      mode: 'register',
      phone,
      email,
      password,
      referralCode: referralCode ? referralCode.trim().toUpperCase() : '',
      name: name || `Gamer_${phone.slice(-4)}`,
      otp: generatedOtp,
      timestamp: Date.now()
    });

    showInfo(`📱 OTP भेजा गया: ${generatedOtp} (सत्यापन के लिए दर्ज करें)`, 'OTP Generated');
    return true;
  };

  // 2. Send OTP for Login
  const requestLoginOtp = ({ phoneOrEmail }) => {
    if (!phoneOrEmail) {
      showError('कृपया अपना फोन नंबर या ईमेल दर्ज करें');
      return false;
    }

    const trimmed = phoneOrEmail.trim().toLowerCase();
    const user = users.find((u) => u.phone === trimmed || u.email.toLowerCase() === trimmed);
    if (!user) {
      showError('यह अकाउंट मौजूद नहीं है। कृपया पहले रजिस्टर करें (Account not found, please register)');
      return false;
    }

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setPendingOtpData({
      mode: 'login',
      userId: user.id,
      phone: user.phone,
      email: user.email,
      otp: generatedOtp,
      timestamp: Date.now()
    });

    showInfo(`📱 Login OTP: ${generatedOtp} (सत्यापन के लिए दर्ज करें)`, 'Login Verification');
    return true;
  };

  // 3. Verify OTP and finalize Register / Login
  const verifyOtp = (enteredOtp, addTransactionCallback, addReferralRewardCallback) => {
    if (!pendingOtpData) {
      showError('कोई सक्रिय OTP सत्र नहीं मिला। पुनः प्रयास करें।');
      return false;
    }

    if (enteredOtp.trim() !== pendingOtpData.otp) {
      showError('अमान्य OTP! कृपया सही 6-अंकीय कोड दर्ज करें (Invalid OTP code)');
      return false;
    }

    // Set 2-hour session timestamp
    localStorage.setItem(STORAGE_SESSION_TIME_KEY, Date.now().toString());

    if (pendingOtpData.mode === 'login') {
      setCurrentUserId(pendingOtpData.userId);
      setPendingOtpData(null);
      showSuccess('सफलतापूर्वक लॉगिन हो गया! 2 घंटे के लिए सत्र सक्रिय है।', 'लॉगिन सफल (Login Success)');
      return true;
    }

    if (pendingOtpData.mode === 'register') {
      const newUserId = `usr_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      const myRefCode = generateReferralCode(pendingOtpData.name);

      let referrerUser = null;
      if (pendingOtpData.referralCode) {
        referrerUser = users.find(
          (u) => u.referralCode && u.referralCode.toUpperCase() === pendingOtpData.referralCode.toUpperCase()
        );
      }

      const newUser = {
        id: newUserId,
        name: pendingOtpData.name,
        phone: pendingOtpData.phone,
        email: pendingOtpData.email,
        password: pendingOtpData.password,
        referralCode: myRefCode,
        referredBy: referrerUser ? referrerUser.id : null,
        referralCount: 0,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${pendingOtpData.phone}`,
        upiId: '',
        bankName: '',
        accountNumber: '',
        ifscCode: '',
        isProfileComplete: false,
        hasDepositedAtLeastOnce: false,
        createdAt: new Date().toISOString()
      };

      let updatedUsers = [...users, newUser];

      // Immediately award ₹20 to Referrer Hand-to-Hand
      if (referrerUser) {
        updatedUsers = updatedUsers.map((u) => {
          if (u.id === referrerUser.id) {
            return {
              ...u,
              referralCount: (u.referralCount || 0) + 1
            };
          }
          return u;
        });

        if (addReferralRewardCallback) {
          addReferralRewardCallback({
            referrerId: referrerUser.id,
            newUserId: newUser.id,
            newUserName: newUser.name,
            newUserPhone: newUser.phone,
            amount: 20
          });
        }
      }

      setUsers(updatedUsers);
      setCurrentUserId(newUserId);
      setPendingOtpData(null);

      // Add ₹10 Signup Bonus to New User's Wallet!
      if (addTransactionCallback) {
        addTransactionCallback(newUserId, {
          type: 'signup_bonus',
          amount: 10,
          title: '🎁 वेलकम साइनअप बोनस (Signup Bonus)',
          description: 'प्लेटफॉर्म जॉइन करने पर ₹10 फ्री वेलकम बोनस दिया गया।',
          status: 'completed',
          date: new Date().toISOString()
        });
      }

      triggerConfetti();
      showBonus('बधाई हो! आपको ₹10 का वेलकम साइनअप बोनस आपके वॉलेट में मिल चुका है।', '🎉 ₹10 वेलकम बोनस!');

      if (referrerUser) {
        showInfo(`रेफरल कोड "${referrerUser.referralCode}" मान्य हुआ! रेफरर को ₹20 मिला।`, 'Referral Linked');
      }

      return true;
    }

    return false;
  };

  // Direct login with password
  const loginWithPassword = (phoneOrEmail, password) => {
    const trimmed = phoneOrEmail.trim().toLowerCase();
    const user = users.find(
      (u) => (u.phone === trimmed || u.email.toLowerCase() === trimmed) && u.password === password
    );

    if (!user) {
      showError('गलत फोन नंबर/ईमेल या पासवर्ड!');
      return false;
    }

    localStorage.setItem(STORAGE_SESSION_TIME_KEY, Date.now().toString());
    setCurrentUserId(user.id);
    showSuccess(`स्वागत है, ${user.name}! आपका 2 घंटे का सत्र शुरू हो गया है।`, 'लॉगिन सफल (Login Success)');
    return true;
  };

  // Update Profile details
  const updateProfile = (profileData) => {
    if (!currentUser) return false;

    const isComplete = Boolean(
      profileData.name &&
      profileData.email &&
      (profileData.upiId || (profileData.accountNumber && profileData.ifscCode))
    );

    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === currentUser.id) {
          return {
            ...u,
            ...profileData,
            isProfileComplete: isComplete
          };
        }
        return u;
      })
    );

    showSuccess('आपकी प्रोफाइल सफलतापूर्वक अपडेट हो गई है!', 'प्रोफाइल अपडेट (Profile Saved)');
    return true;
  };

  // Mark that user deposited at least once
  const markUserDeposited = (userId) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === (userId || currentUserId)) {
          return { ...u, hasDepositedAtLeastOnce: true };
        }
        return u;
      })
    );
  };

  // Switch demo user
  const switchUser = (userId) => {
    const target = users.find((u) => u.id === userId);
    if (target) {
      localStorage.setItem(STORAGE_SESSION_TIME_KEY, Date.now().toString());
      setCurrentUserId(target.id);
      showInfo(`अकाउंट बदला गया: ${target.name} (${target.phone})`, 'Demo Switcher');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        currentUserId,
        pendingOtpData,
        requestRegisterOtp,
        requestLoginOtp,
        verifyOtp,
        loginWithPassword,
        updateProfile,
        markUserDeposited,
        switchUser,
        logout,
        triggerConfetti
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

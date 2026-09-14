import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  hi: {
    // Brand
    brandName: 'WINZO',
    brandTagline: 'Play & Win Real Cash',
    
    // Nav
    home: 'होम',
    games: 'गेम्स (8 Games)',
    refer: 'रेफर & कमाएं',
    vip: 'VIP लेवल्स',
    wallet: 'वॉलेट & निकासी',
    profile: 'प्रोफाइल & KYC',
    logout: 'लॉगआउट',
    login: 'लॉगिन',
    signup: 'साइनअप (+₹10)',
    leaderboard: 'लीडरबोर्ड',
    
    // Common
    deposit: 'पैसे जोड़ें',
    withdraw: 'निकासी (₹520+)',
    totalBalance: 'कुल वॉलेट बैलेंस',
    winningBalance: 'विनिंग बैलेंस',
    bonusBalance: 'बोनस बैलेंस',
    depositBalance: 'डिपॉजिट बैलेंस',
    playNow: 'अभी खेलें',
    claimNow: 'अभी क्लेम करें',
    shareWhatsapp: 'WhatsApp पर शेयर करें (+₹20)',
    shareTelegram: 'Telegram पर शेयर करें',
    copyLink: 'लिंक कॉपी करें',
    copied: 'कॉपी हुआ!',
    copyCode: 'कोड कॉपी',
    referralCode: 'रेफरल कोड',
    
    // Hero
    heroBadge: 'भारत का नंबर 1 रियल कैश गेमिंग & रेफरल ऐप',
    heroTitle: 'गेम्स खेलो, दोस्तों को रेफर करो और रोज़ाना असली कैश जीतो!',
    heroSub: 'जॉइन करते ही पाएं ₹10 का फ्री वेलकम बोनस। अपने दोस्तों को इनवाइट करें और पाएं ₹20 प्रति रेफरल हैंड-टू-हैंड तुरंत अपने वॉलेट में!',
    
    // Quick Action Hub
    quickHubTitle: 'क्विक ऐक्सेस हब (Quick Feature Hub)',
    quickHubSub: '1-क्लिक एक्सेस',
    
    // Daily Bonus
    dailyBonusBadge: 'डेली बोनस क्लेम',
    dailyBonusTitle: 'आज का फ्री ₹10 लॉगिन रिवॉर्ड क्लेम करें!',
    dailyBonusSub: 'हर 24 घंटे में ऐप खोलें और मुफ्त नकद बोनस पाएं।',
    dailyBonusClaimed: 'आज का बोनस क्लेम हो गया ✓',
    dailyBonusButton: '₹10 अभी क्लेम करें (Claim)',
    
    // How It Works
    howItWorksTitle: 'यह ऐप कैसे काम करता है? (3 आसान स्टेप्स)',
    howItWorksSub: 'साइनअप से लेकर बैंक विड्रॉल तक पूरी प्रक्रिया',
    step1Title: 'साइनअप करें और ₹10 फ्री पाएं',
    step1Desc: 'मोबाइल नंबर और ईमेल से फ्री रजिस्टर करें। तुरंत आपके वॉलेट में ₹10 वेलकम बोनस जुड़ जाएगा।',
    step2Title: 'दोस्तों को रेफर करें (+₹20)',
    step2Desc: 'अपना रेफरल लिंक WhatsApp पर भेजें। दोस्त के जुड़ते ही हैंड-टू-हैंड ₹20 आपके वॉलेट में मिलेंगे।',
    step3Title: 'गेम्स खेलें & ₹520+ निकालें',
    step3Desc: '8+ मिनी गेम्स खेलकर अपनी कमाई बढ़ाएं और न्यूनतम ₹520 होते ही सीधे बैंक/UPI में तुरंत निकालें।',
    
    // Games
    gamesTitle: '8+ मिनी गेम्स (Play & Win Real Cash)',
    gamesSub: 'लाइव खेलें और सीधे अपने वॉलेट में पैसे जीतें',
    viewAllGames: 'सभी गेम्स',
    payout: 'पेआउट',
    
    // Referral Calc
    calcTitle: 'रेफरल इनकम कैलकुलेटर (Estimate Earnings)',
    calcSub: 'स्लाइडर हिलाकर देखें कि आप कितने पैसे कमा सकते हैं',
    friendsCount: 'दोस्तों की संख्या',
    potentialIncome: 'संभावित इनकम',
    calcTip: '💡 टिप: जितने ज्यादा दोस्त जोड़ेंगे, आपका VIP लेवल बढ़ेगा और प्रति रेफरल कमाई ₹40 तक हो जाएगी!',
    
    // Winners
    winnersTitle: 'लाइव विनर्स & विड्रॉल फीड (Recent Winners)',
    winnersSub: 'असली खिलाड़ी, असली नकद जीत',
    verifiedPayouts: '● 100% वेरिफाइड पेआउट्स',
    
    // VIP
    vipBannerTitle: 'लेवल बढ़ाएं और प्रति रेफरल ₹40 तक कमाएं',
    vipBannerSub: 'ब्रॉन्ज से शुरू करके डायमंड तक पहुंचें और अनलॉक करें वीआईपी डेली इनकम व स्पेशल विड्रॉल सुविधाएं।',
    viewVipClub: 'VIP क्लब देखें',
    perRefer: '/ रेफरल',
    
    // Trust
    trust1Title: '100% सुरक्षित & लीगल',
    trust1Sub: 'RNG सर्टिफाइड निष्पक्ष गेम्स',
    trust2Title: 'इंस्टेंट UPI निकासी',
    trust2Sub: '₹520+ सीधे बैंक खाते में',
    trust3Title: 'सुरक्षित भुगतान',
    trust3Sub: '256-बिट SSL एन्क्रिप्टेड',
    trust4Title: '24/7 सहायता',
    trust4Sub: 'लाइव चैट & व्हाट्सएप सपोर्ट',
    
    // FAQ
    faqTitle: 'अक्सर पूछे जाने वाले सवाल (Frequently Asked Questions)',
  },
  en: {
    // Brand
    brandName: 'WINZO',
    brandTagline: 'Play & Win Real Cash',
    
    // Nav
    home: 'Home',
    games: 'Games (8 Games)',
    refer: 'Refer & Earn',
    vip: 'VIP Levels',
    wallet: 'Wallet & Payouts',
    profile: 'Profile & KYC',
    logout: 'Logout',
    login: 'Login',
    signup: 'Signup (+₹10)',
    leaderboard: 'Leaderboard',
    
    // Common
    deposit: 'Deposit Cash',
    withdraw: 'Withdraw (₹520+)',
    totalBalance: 'Total Wallet Balance',
    winningBalance: 'Winning Balance',
    bonusBalance: 'Bonus Balance',
    depositBalance: 'Deposit Balance',
    playNow: 'Play Now',
    claimNow: 'Claim Now',
    shareWhatsapp: 'Share on WhatsApp (+₹20)',
    shareTelegram: 'Share on Telegram',
    copyLink: 'Copy Referral Link',
    copied: 'Copied!',
    copyCode: 'Copy Code',
    referralCode: 'Referral Code',
    
    // Hero
    heroBadge: "INDIA'S #1 REAL CASH GAMING & REFERRAL APP",
    heroTitle: 'Play Games, Refer Friends & Win Daily Real Cash!',
    heroSub: 'Get ₹10 Free Welcome Bonus on instant signup. Invite friends to get instant ₹20 hand-to-hand cash reward straight into your wallet!',
    
    // Quick Action Hub
    quickHubTitle: 'Quick Features Hub',
    quickHubSub: '1-Click Direct Access',
    
    // Daily Bonus
    dailyBonusBadge: 'DAILY BONUS STREAK',
    dailyBonusTitle: 'Claim Today’s Free ₹10 Login Reward!',
    dailyBonusSub: 'Open the app every 24 hours and claim guaranteed free cash bonus.',
    dailyBonusClaimed: 'Today’s Bonus Claimed ✓',
    dailyBonusButton: 'Claim ₹10 Now',
    
    // How It Works
    howItWorksTitle: 'How It Works (3 Easy Steps)',
    howItWorksSub: 'From free registration to direct bank payout',
    step1Title: 'Sign Up & Get Free ₹10',
    step1Desc: 'Register for free with mobile & email. ₹10 welcome bonus will be credited to your wallet instantly.',
    step2Title: 'Refer Friends (+₹20 Each)',
    step2Desc: 'Share your personal link on WhatsApp. As soon as your friend registers, receive ₹20 instant cash.',
    step3Title: 'Play Games & Withdraw ₹520+',
    step3Desc: 'Play 8+ mini games, multiply your balance, and withdraw ₹520+ directly into your Bank/UPI.',
    
    // Games
    gamesTitle: '8+ Mini Games (Play & Win Real Cash)',
    gamesSub: 'Play live multiplayer games and win cash directly to wallet',
    viewAllGames: 'View All Games',
    payout: 'Payout',
    
    // Referral Calc
    calcTitle: 'Referral Earnings Calculator',
    calcSub: 'Drag the slider to estimate your referral earnings',
    friendsCount: 'Number of Friends',
    potentialIncome: 'Estimated Income',
    calcTip: '💡 Tip: The more friends you invite, the higher your VIP level climbs up to ₹40 per referral!',
    
    // Winners
    winnersTitle: 'Live Winners & Payouts Feed',
    winnersSub: 'Real Players, Real Cash Payouts',
    verifiedPayouts: '● 100% VERIFIED PAYOUTS',
    
    // VIP
    vipBannerTitle: 'Level Up & Earn Up to ₹40 Per Refer',
    vipBannerSub: 'Start from Bronze to Diamond and unlock daily VIP passive income & priority payout privileges.',
    viewVipClub: 'View VIP Club',
    perRefer: '/ Refer',
    
    // Trust
    trust1Title: '100% Safe & Legal',
    trust1Sub: 'RNG Certified Fair Games',
    trust2Title: 'Instant UPI Payouts',
    trust2Sub: '₹520+ Direct to Bank Account',
    trust3Title: 'Secure Payments',
    trust3Sub: '256-Bit SSL Encrypted',
    trust4Title: '24/7 Support',
    trust4Sub: 'Live Chat & WhatsApp Help',
    
    // FAQ
    faqTitle: 'Frequently Asked Questions (FAQ)',
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('gaming_platform_lang') || 'hi';
  });

  const toggleLanguage = () => {
    const nextLang = lang === 'hi' ? 'en' : 'hi';
    setLang(nextLang);
    localStorage.setItem('gaming_platform_lang', nextLang);
  };

  const setLanguage = (newLang) => {
    if (newLang === 'hi' || newLang === 'en') {
      setLang(newLang);
      localStorage.setItem('gaming_platform_lang', newLang);
    }
  };

  const t = translations[lang] || translations.hi;

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

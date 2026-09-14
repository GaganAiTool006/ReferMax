import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Gift, 
  Wallet, 
  Flame, 
  Sparkles, 
  Share2, 
  ArrowRight, 
  ShieldCheck, 
  Users,
  Gamepad2,
  Trophy,
  Zap,
  TrendingUp,
  Play,
  CheckCircle2,
  CreditCard,
  Crown,
  HelpCircle,
  ChevronDown,
  Clock,
  Award,
  Check,
  RotateCw,
  Coins,
  DollarSign,
  Lock,
  Headphones
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../context/WalletContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { VIP_LEVELS, getUserVipLevel } from '../utils/vipLevels';

export default function Home() {
  const { currentUser } = useAuth();
  const { totalBalance, currentWallet, addTransaction } = useWallet();
  const { lang, t } = useLanguage();
  const { showSuccess } = useToast();

  const [referralCalcCount, setReferralCalcCount] = useState(10);
  const [dailyClaimed, setDailyClaimed] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const vip = getUserVipLevel(currentUser?.referralCount || 0);
  const referralLink = currentUser
    ? `${window.location.origin}/register?ref=${currentUser.referralCode}`
    : `${window.location.origin}/register`;

  const handleShareWhatsapp = () => {
    const text = encodeURIComponent(
      lang === 'hi'
        ? `🔥 लूट ऑफर! इस लिंक से रजिस्टर करो और तुरंत ₹10 वेलकम बोनस पाओ। 8+ मिनी गेम्स खेलकर रोजाना ₹500-₹2000 कमाओ!\n\n👉 जॉइनिंग लिंक: ${referralLink}\n🔑 रेफरल कोड: ${currentUser?.referralCode || 'VIKAS20'}`
        : `🔥 Loot Offer! Register now & get instant ₹10 Welcome Bonus. Play 8+ mini games and earn ₹500-₹2000 daily!\n\n👉 Join Link: ${referralLink}\n🔑 Referral Code: ${currentUser?.referralCode || 'VIKAS20'}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleClaimDailyBonus = () => {
    if (dailyClaimed) return;
    setDailyClaimed(true);
    addTransaction({
      type: 'bonus',
      amount: 10,
      description: 'Daily Login Reward',
      walletType: 'bonus'
    });
    showSuccess(
      lang === 'hi'
        ? '🎉 आज का डेली लॉगिन बोनस ₹10 आपके वॉलेट में जुड़ गया!'
        : '🎉 Today’s ₹10 Daily Login Bonus has been added to your wallet!',
      'Daily Bonus'
    );
  };

  // Quick Action Tiles
  const quickActions = [
    { title: lang === 'hi' ? '8 मिनी गेम्स' : '8 Mini Games', desc: lang === 'hi' ? 'लाइव खेलें & जीतें' : 'Play & Win Cash', icon: Gamepad2, path: '/games', color: 'from-indigo-600 to-purple-600', badge: '8 Games' },
    { title: t.refer, desc: lang === 'hi' ? '₹20 प्रति दोस्त' : '₹20 Per Friend', icon: Gift, path: '/refer', color: 'from-amber-500 to-yellow-600', badge: '+₹20' },
    { title: t.vip, desc: lang === 'hi' ? 'इनकम टियर देखें' : 'View Tier Perks', icon: Crown, path: '/vip', color: 'from-purple-600 to-indigo-700', badge: 'VIP' },
    { title: t.wallet, desc: lang === 'hi' ? '₹520+ विड्रॉल' : 'Instant Payouts', icon: Wallet, path: '/wallet', color: 'from-emerald-600 to-teal-700', badge: '₹520+' },
    { title: lang === 'hi' ? 'लकी व्हील' : 'Lucky Wheel', desc: lang === 'hi' ? '100% विनिंग स्पिन' : '100% Guaranteed', icon: RotateCw, path: '/games/wheel', color: 'from-rose-500 to-pink-600', badge: '₹1,000' },
    { title: lang === 'hi' ? 'सिक्का उछालो' : 'Head or Tail', desc: lang === 'hi' ? '2x इंस्टेंट कॉइन' : '2.0x Instant', icon: Coins, path: '/games/coin', color: 'from-yellow-500 to-amber-600', badge: '2.0x' },
  ];

  // 8 Mini Games
  const gamesList = [
    {
      id: 'dice',
      title: 'Lucky 7 Dice',
      titleHi: 'लकी 7 पासा',
      path: '/games/dice',
      badge: '5.8x बंपर',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      players: lang === 'hi' ? '2.8k खेल रहे हैं' : '2.8k Playing',
      multiplier: '2.0x - 5.8x',
      desc: lang === 'hi' ? '7 से कम, 7 से ज्यादा या ठीक 7 का अनुमान लगाएं' : 'Bet on Under 7, Exact 7 (5.8x) or Over 7',
      svgType: 'dice'
    },
    {
      id: 'color',
      title: 'Color Prediction',
      titleHi: 'कलर प्रेडिक्शन',
      path: '/games/color',
      badge: '🔥 HOT 9X',
      badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
      players: lang === 'hi' ? '5.4k खेल रहे हैं' : '5.4k Playing',
      multiplier: '2x - 4.5x - 9x',
      desc: lang === 'hi' ? 'Red, Green या Violet का लाइव अनुमान लगाएं' : 'Live 30-sec parity prediction on Red, Green, Violet',
      svgType: 'color'
    },
    {
      id: 'coin',
      title: 'Head or Tail',
      titleHi: 'सिक्का उछालो',
      path: '/games/coin',
      badge: '2.0x WIN',
      badgeColor: 'bg-yellow-100 text-yellow-900 border-yellow-300',
      players: lang === 'hi' ? '1.9k खेल रहे हैं' : '1.9k Playing',
      multiplier: '2.0x Instant',
      desc: lang === 'hi' ? '3D सिक्का उछालें और तुरंत 2 गुना जीतें' : '3D flipping coin with instant 2.0x cash payout',
      svgType: 'coin'
    },
    {
      id: 'scratch',
      title: 'Scratch & Win',
      titleHi: 'स्क्रैच कार्ड',
      badge: '₹500 JACKPOT',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      path: '/games/scratch',
      players: lang === 'hi' ? '3.1k खेल रहे हैं' : '3.1k Playing',
      multiplier: 'Match 3 Jackpot',
      desc: lang === 'hi' ? 'कार्ड स्क्रैच करें और नकद इनाम जीतें' : 'Scratch 9 metallic boxes to match 3 prizes up to ₹500',
      svgType: 'scratch'
    },
    {
      id: 'slots',
      title: '777 Fruit Slots',
      titleHi: 'स्लॉट मशीन',
      badge: '10x MEGA',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      path: '/games/slots',
      players: lang === 'hi' ? '4.2k खेल रहे हैं' : '4.2k Playing',
      multiplier: '10x Jackpot',
      desc: lang === 'hi' ? '3 रील्स घुमाएं और 777 जैकपॉट मैच करें' : 'Spin 3 reels and hit the triple 777 grand jackpot',
      svgType: 'slots'
    },
    {
      id: 'wheel',
      title: 'Lucky Wheel',
      titleHi: 'लकी स्पिन व्हील',
      badge: '100% WIN',
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
      path: '/games/wheel',
      players: lang === 'hi' ? '3.6k खेल रहे हैं' : '3.6k Playing',
      multiplier: 'Up to ₹1,000',
      desc: lang === 'hi' ? 'पहिया घुमाएं और हर स्पिन पर जीतें' : 'Spin the wheel with guaranteed cash prizes on every spin',
      svgType: 'wheel'
    },
    {
      id: 'mines',
      title: 'Cash Mines',
      titleHi: 'माइंस गेम',
      badge: '💎 25X MULTI',
      badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300',
      path: '/games/mines',
      players: lang === 'hi' ? '2.3k खेल रहे हैं' : '2.3k Playing',
      multiplier: '1.2x - 25x',
      desc: lang === 'hi' ? 'हीरे खोजें और कभी भी कैशआउट करें' : 'Uncover gems in 5x5 matrix & cash out anytime',
      svgType: 'mines'
    },
    {
      id: 'aviator',
      title: 'Aviator Crash',
      titleHi: 'रॉकेट क्रैश',
      badge: '🚀 100X MAX',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      path: '/games/aviator',
      players: lang === 'hi' ? '6.1k खेल रहे हैं' : '6.1k Playing',
      multiplier: '1x - 100x',
      desc: lang === 'hi' ? 'रॉकेट के क्रैश होने से पहले निकालें' : 'Cash out ascending flight multiplier before it crashes',
      svgType: 'aviator'
    }
  ];

  const recentWinners = [
    { name: lang === 'hi' ? 'विकास कुमार' : 'Vikas Kumar', game: 'Color Prediction', amount: '₹1,800', time: lang === 'hi' ? '2 मिनट पहले' : '2m ago', avatar: '👨' },
    { name: lang === 'hi' ? 'राहुल शर्मा' : 'Rahul Sharma', game: '777 Fruit Slots', amount: '₹2,500', time: lang === 'hi' ? '5 मिनट पहले' : '5m ago', avatar: '🧑' },
    { name: lang === 'hi' ? 'पूजा वर्मा' : 'Pooja Verma', game: 'Referral Bonus', amount: '₹140', time: lang === 'hi' ? '7 मिनट पहले' : '7m ago', avatar: '👩' },
    { name: lang === 'hi' ? 'अमित पटेल' : 'Amit Patel', game: 'Aviator Rocket', amount: '₹4,200', time: lang === 'hi' ? '11 मिनट पहले' : '11m ago', avatar: '🧔' },
  ];

  const faqs = lang === 'hi' ? [
    {
      q: 'साइनअप करने पर ₹10 बोनस कैसे मिलेगा?',
      a: 'बस अपना मोबाइल नंबर और ईमेल डालकर रजिस्टर करें। OTP वेरीफाई होते ही ₹10 का वेलकम बोनस तुरंत आपके वॉलेट में क्रेडिट हो जाएगा।'
    },
    {
      q: 'दोस्तों को रेफर करके ₹20 कैसे कमाए?',
      a: 'अपना पर्सनल रेफरल लिंक या QR कोड WhatsApp/Telegram पर दोस्तों को भेजें। जैसे ही आपका दोस्त रजिस्टर करेगा, आपको तुरंत ₹20 मिलेंगे और दोस्त को ₹10 वेलकम बोनस।'
    },
    {
      q: 'पैसे निकालने (Withdrawal) की शर्तें क्या हैं?',
      a: 'न्यूनतम विड्रॉल राशि ₹520 है। विड्रॉल सक्रिय करने के लिए कम से कम एक बार कोई भी डिपॉजिट होना अनिवार्य है। इसके बाद आप कभी भी UPI/Bank में पैसे निकाल सकते हैं।'
    },
    {
      q: 'VIP लेवल्स से क्या फायदा होता है?',
      a: 'जैसे-जैसे आप अधिक दोस्तों को जोड़ते हैं, आपका VIP लेवल ब्रॉन्ज से सिल्वर, गोल्ड और डायमंड में अपग्रेड होता है जिससे प्रति रेफरल रिवॉर्ड ₹20 से बढ़कर ₹40 तक हो जाता है।'
    }
  ] : [
    {
      q: 'How do I get the ₹10 Signup Bonus?',
      a: 'Simply register with your mobile number and email. As soon as OTP is verified, ₹10 Welcome Bonus is instantly credited to your wallet.'
    },
    {
      q: 'How do I earn ₹20 per referral?',
      a: 'Share your personal referral link or QR code on WhatsApp. As soon as your friend registers, you get ₹20 instant cash in your wallet and your friend gets ₹10.'
    },
    {
      q: 'What are the withdrawal conditions?',
      a: 'Minimum withdrawal amount is ₹520. To unlock withdrawals, at least one deposit is required. After that, you can withdraw anytime directly to UPI/Bank.'
    },
    {
      q: 'What are the benefits of VIP Levels?',
      a: 'As you invite more friends, your VIP tier climbs from Bronze to Silver, Gold, Platinum and Diamond, increasing your per-referral cash reward up to ₹40!'
    }
  ];

  const renderGameGraphic = (type) => {
    switch (type) {
      case 'dice':
        return (
          <svg className="w-11 h-11 drop-shadow" viewBox="0 0 100 100" fill="none">
            <rect x="10" y="25" width="48" height="48" rx="12" fill="#6366f1" />
            <circle cx="22" cy="37" r="4" fill="#ffffff" />
            <circle cx="42" cy="37" r="4" fill="#ffffff" />
            <circle cx="32" cy="47" r="4" fill="#ffffff" />
            <circle cx="22" cy="57" r="4" fill="#ffffff" />
            <circle cx="42" cy="57" r="4" fill="#ffffff" />
            <rect x="42" y="15" width="48" height="48" rx="12" fill="#a855f7" stroke="#e0e7ff" strokeWidth="1.5" />
            <circle cx="66" cy="39" r="4.5" fill="#ffffff" />
            <circle cx="54" cy="27" r="4.5" fill="#ffffff" />
            <circle cx="78" cy="51" r="4.5" fill="#ffffff" />
          </svg>
        );
      case 'color':
        return (
          <svg className="w-11 h-11 drop-shadow" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="#ffffff" stroke="#e2e8f0" strokeWidth="3" />
            <path d="M50 50 L50 10 A40 40 0 0 1 85 70 Z" fill="#10b981" />
            <path d="M50 50 L85 70 A40 40 0 0 1 15 70 Z" fill="#ef4444" />
            <path d="M50 50 L15 70 A40 40 0 0 1 50 10 Z" fill="#8b5cf6" />
            <circle cx="50" cy="50" r="14" fill="#1e1b4b" />
            <text x="50" y="55" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="900" fontFamily="Rajdhani">30s</text>
          </svg>
        );
      case 'coin':
        return (
          <svg className="w-11 h-11 drop-shadow" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="#f59e0b" stroke="#78350f" strokeWidth="2" />
            <circle cx="50" cy="50" r="36" fill="#fbbf24" stroke="#fef08a" strokeWidth="2" />
            <text x="50" y="58" textAnchor="middle" fill="#78350f" fontSize="24" fontWeight="900" fontFamily="Rajdhani">₹</text>
          </svg>
        );
      case 'scratch':
        return (
          <svg className="w-11 h-11 drop-shadow" viewBox="0 0 100 100">
            <rect x="10" y="20" width="80" height="60" rx="10" fill="#10b981" stroke="#cbd5e1" strokeWidth="2" />
            <rect x="20" y="30" width="60" height="40" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 2" />
            <text x="50" y="55" textAnchor="middle" fill="#b45309" fontSize="16" fontWeight="900" fontFamily="Rajdhani">₹500</text>
          </svg>
        );
      case 'slots':
        return (
          <svg className="w-11 h-11 drop-shadow" viewBox="0 0 100 100">
            <rect x="10" y="15" width="80" height="70" rx="12" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="2.5" />
            <rect x="18" y="25" width="64" height="40" rx="6" fill="#ffffff" />
            <text x="30" y="52" textAnchor="middle" fill="#dc2626" fontSize="20" fontWeight="900" fontFamily="Orbitron">7</text>
            <text x="50" y="52" textAnchor="middle" fill="#dc2626" fontSize="20" fontWeight="900" fontFamily="Orbitron">7</text>
            <text x="70" y="52" textAnchor="middle" fill="#dc2626" fontSize="20" fontWeight="900" fontFamily="Orbitron">7</text>
          </svg>
        );
      case 'wheel':
        return (
          <svg className="w-11 h-11 drop-shadow" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
            <path d="M50 50 L50 8 A42 42 0 0 1 92 50 Z" fill="#ef4444" />
            <path d="M50 50 L92 50 A42 42 0 0 1 50 92 Z" fill="#3b82f6" />
            <path d="M50 50 L50 92 A42 42 0 0 1 8 50 Z" fill="#10b981" />
            <path d="M50 50 L8 50 A42 42 0 0 1 50 8 Z" fill="#8b5cf6" />
            <circle cx="50" cy="50" r="10" fill="#ffffff" />
          </svg>
        );
      case 'mines':
        return (
          <svg className="w-11 h-11 drop-shadow" viewBox="0 0 100 100">
            <rect x="12" y="12" width="76" height="76" rx="14" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
            <path d="M50 25 L75 50 L50 75 L25 50 Z" fill="#22d3ee" />
          </svg>
        );
      case 'aviator':
        return (
          <svg className="w-11 h-11 drop-shadow" viewBox="0 0 100 100">
            <path d="M20 75 Q50 65 75 30" stroke="#f43f5e" strokeWidth="4" fill="none" />
            <path d="M60 40 L85 20 L80 45 L68 46 L65 52 L60 50 L62 45 Z" fill="#dc2626" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-9">
      
      {/* 🌟 1. HERO BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 text-white p-5 sm:p-8 shadow-xl">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-300 text-xs font-black uppercase font-tech tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>{t.heroBadge}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black leading-tight text-white font-main">
              {t.heroTitle}
            </h1>

            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed max-w-xl">
              {t.heroSub}
            </p>

            <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 pt-1">
              <button
                onClick={handleShareWhatsapp}
                className="btn-whatsapp py-3 px-5 text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-xl cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>{t.shareWhatsapp}</span>
              </button>

              <Link to="/games" className="btn-gold py-3 px-5 text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-xl">
                <Gamepad2 className="w-4 h-4" />
                <span>{lang === 'hi' ? 'गेम्स खेलें (8+ Games)' : 'Play Games (8+)'}</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white text-slate-900 rounded-3xl p-5 shadow-2xl space-y-3.5 border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-extrabold uppercase tracking-wider">{t.totalBalance}</span>
              <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-tech">
                {vip.current.badge} {vip.current.name}
              </span>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 font-tech">₹{totalBalance.toFixed(2)}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs font-tech">
              <div className="bg-emerald-50 p-2.5 rounded-2xl border border-emerald-200">
                <span className="text-emerald-800 block text-[11px] font-bold font-main">{t.winningBalance}</span>
                <strong className="text-emerald-950 font-black text-sm sm:text-base">₹{currentWallet.winningBalance.toFixed(2)}</strong>
              </div>
              <div className="bg-amber-50 p-2.5 rounded-2xl border border-amber-200">
                <span className="text-amber-800 block text-[11px] font-bold font-main">{t.bonusBalance}</span>
                <strong className="text-amber-950 font-black text-sm sm:text-base">₹{currentWallet.bonusBalance.toFixed(2)}</strong>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 font-main">
              <Link to="/wallet" className="btn-green text-center text-xs py-2.5 rounded-xl font-black">
                {t.deposit}
              </Link>
              <Link to="/wallet" className="btn-outline text-center text-xs py-2.5 rounded-xl font-black text-slate-800">
                {t.withdraw}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 🌟 2. PROMINENT QUICK ACTIONS TILES */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            {t.quickHubTitle}
          </h2>
          <span className="text-xs text-slate-500 font-bold">{t.quickHubSub}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <Link
                key={idx}
                to={action.path}
                className="game-card bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 hover:border-indigo-400 flex flex-col items-center text-center group hover:shadow-lg transition-all"
              >
                <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${action.color} text-white flex items-center justify-center shadow-md mb-2 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-indigo-600 truncate w-full">
                  {action.title}
                </h3>
                <span className="text-[10px] text-slate-500 mt-0.5 block truncate w-full">
                  {action.desc}
                </span>
                <span className="mt-2 text-[9px] font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-tech">
                  {action.badge}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 🌟 3. DAILY LOGIN STREAK REWARD BANNER */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-3xl text-slate-950 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-white/30 backdrop-blur-md flex items-center justify-center flex-shrink-0 shadow-inner">
            <Gift className="w-6 h-6 text-slate-950 animate-bounce" />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider bg-slate-950 text-amber-300 px-2.5 py-0.5 rounded-full font-tech">
              {t.dailyBonusBadge}
            </span>
            <h3 className="text-base sm:text-xl font-black text-slate-950 mt-1">
              {t.dailyBonusTitle}
            </h3>
            <p className="text-xs text-slate-900 font-semibold">
              {t.dailyBonusSub}
            </p>
          </div>
        </div>

        <button
          onClick={handleClaimDailyBonus}
          disabled={dailyClaimed}
          className={`py-3 px-6 rounded-2xl text-xs sm:text-sm font-black shadow-xl flex items-center justify-center gap-2 flex-shrink-0 transition-all cursor-pointer ${
            dailyClaimed
              ? 'bg-slate-900 text-white cursor-not-allowed opacity-90'
              : 'bg-white text-slate-950 hover:bg-slate-100 active:scale-95'
          }`}
        >
          {dailyClaimed ? <Check className="w-4 h-4 text-emerald-400" /> : <Sparkles className="w-4 h-4 text-amber-500" />}
          <span>{dailyClaimed ? t.dailyBonusClaimed : t.dailyBonusButton}</span>
        </button>
      </div>

      {/* 🌟 4. THREE SIMPLE STEPS (How It Works) */}
      <section className="space-y-3">
        <div className="text-center sm:text-left space-y-0.5">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center justify-center sm:justify-start gap-2">
            <CheckCircle2 className="w-5 h-5 text-indigo-600" />
            {t.howItWorksTitle}
          </h2>
          <p className="text-xs text-slate-500">{t.howItWorksSub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="game-card bg-white p-4 sm:p-5 space-y-2 border-2 border-indigo-100 shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 font-black text-base font-tech">
              1
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
              {t.step1Title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.step1Desc}
            </p>
          </div>

          <div className="game-card bg-white p-4 sm:p-5 space-y-2 border-2 border-amber-100 shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 font-black text-base font-tech">
              2
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
              {t.step2Title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.step2Desc}
            </p>
          </div>

          <div className="game-card bg-white p-4 sm:p-5 space-y-2 border-2 border-emerald-100 shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 font-black text-base font-tech">
              3
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
              {t.step3Title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.step3Desc}
            </p>
          </div>
        </div>
      </section>

      {/* 🌟 5. 8 MINI GAMES DIRECTORY */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                {t.gamesTitle}
              </h2>
              <p className="text-xs text-slate-500">{t.gamesSub}</p>
            </div>
          </div>
          <Link to="/games" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-xl transition-colors">
            <span>{t.viewAllGames}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {gamesList.map((game) => (
            <Link
              key={game.id}
              to={game.path}
              className="group relative overflow-hidden rounded-3xl bg-white border-2 border-slate-200 hover:border-indigo-400 p-4 sm:p-5 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="p-1.5 rounded-2xl bg-slate-50 border border-slate-200">
                    {renderGameGraphic(game.svgType)}
                  </div>
                  <div className="text-right space-y-1">
                    <span className={`inline-block text-[10px] font-black px-2.5 py-0.5 rounded-full border shadow-sm font-tech ${game.badgeColor}`}>
                      {game.badge}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold block font-tech">
                      ● {game.players}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-black text-slate-900 group-hover:text-indigo-600 transition-colors font-main">
                  {game.title}
                </h3>
                <div className="text-xs font-bold text-indigo-700 mt-0.5">
                  {t.payout}: <span className="text-emerald-700 font-black font-tech">{game.multiplier}</span>
                </div>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                  {game.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-slate-900">
                <span className="text-indigo-600 group-hover:underline">{t.playNow}</span>
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 🌟 6. REFERRAL INCOME CALCULATOR SIMULATOR */}
      <div className="p-5 sm:p-7 bg-white rounded-3xl border-2 border-slate-200 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                {t.calcTitle}
              </h3>
              <p className="text-xs text-slate-500">{t.calcSub}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs font-black">
            <span className="text-slate-700">{t.friendsCount}: <strong className="text-indigo-600 text-sm font-black font-tech">{referralCalcCount} {lang === 'hi' ? 'दोस्त' : 'Friends'}</strong></span>
            <span className="text-amber-800 text-sm font-black bg-amber-50 px-3 py-1 rounded-xl border border-amber-200 font-tech">
              {t.potentialIncome}: ₹{referralCalcCount * 20}
            </span>
          </div>

          <input
            type="range"
            min="1"
            max="100"
            value={referralCalcCount}
            onChange={(e) => setReferralCalcCount(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />

          <div className="flex justify-between text-[11px] text-slate-400 font-bold font-tech">
            <span>1 (₹20)</span>
            <span>25 (₹500)</span>
            <span>50 (₹1,000)</span>
            <span>100 (₹2,000)</span>
          </div>
        </div>

        <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-indigo-950 font-bold">
            {t.calcTip}
          </span>
          <Link to="/refer" className="btn-primary py-2 px-4 text-xs font-black whitespace-nowrap min-h-0">
            {lang === 'hi' ? 'रेफर करना शुरू करें' : 'Start Referring'}
          </Link>
        </div>
      </div>

      {/* 🌟 7. LIVE RECENT WINNERS & PAYOUTS */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                {t.winnersTitle}
              </h3>
              <p className="text-xs text-slate-500">{t.winnersSub}</p>
            </div>
          </div>
          <span className="text-[11px] text-emerald-700 font-black bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-xl font-tech">
            {t.verifiedPayouts}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {recentWinners.map((winner, idx) => (
            <div key={idx} className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{winner.avatar}</span>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">{winner.name}</h4>
                  <span className="text-[10px] text-slate-500 block">{winner.game}</span>
                </div>
              </div>
              <div className="text-right">
                <strong className="text-sm font-black text-emerald-700 block font-tech">{winner.amount}</strong>
                <span className="text-[9px] text-slate-400">{winner.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🌟 8. VIP CLUB LEVELS PREVIEW */}
      <div className="p-5 sm:p-7 bg-gradient-to-r from-purple-700 to-indigo-800 text-white rounded-3xl shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-amber-300 text-xs font-black uppercase font-tech">
              <Crown className="w-3.5 h-3.5" /> VIP TIERS
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              {t.vipBannerTitle}
            </h3>
            <p className="text-xs text-purple-100 max-w-xl">
              {t.vipBannerSub}
            </p>
          </div>

          <Link to="/vip" className="btn-gold py-2.5 px-4 text-xs font-black whitespace-nowrap min-h-0 shadow-lg">
            {t.viewVipClub}
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 text-center text-xs">
          {VIP_LEVELS.slice(0, 5).map((lvl) => (
            <div key={lvl.level} className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 space-y-1">
              <div className="text-2xl">{lvl.badge}</div>
              <div className="font-extrabold text-white text-xs font-tech">{lvl.name}</div>
              <div className="text-amber-300 font-black text-xs font-tech">₹{lvl.rewardPerRefer} {t.perRefer}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 🌟 9. SECURITY & TRUST BADGES */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 text-center space-y-1">
          <ShieldCheck className="w-6 h-6 text-emerald-600 mx-auto" />
          <h4 className="text-xs font-black text-slate-900">{t.trust1Title}</h4>
          <p className="text-[10px] text-slate-500">{t.trust1Sub}</p>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 text-center space-y-1">
          <Zap className="w-6 h-6 text-amber-600 mx-auto" />
          <h4 className="text-xs font-black text-slate-900">{t.trust2Title}</h4>
          <p className="text-[10px] text-slate-500">{t.trust2Sub}</p>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 text-center space-y-1">
          <Lock className="w-6 h-6 text-indigo-600 mx-auto" />
          <h4 className="text-xs font-black text-slate-900">{t.trust3Title}</h4>
          <p className="text-[10px] text-slate-500">{t.trust3Sub}</p>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 text-center space-y-1">
          <Headphones className="w-6 h-6 text-purple-600 mx-auto" />
          <h4 className="text-xs font-black text-slate-900">{t.trust4Title}</h4>
          <p className="text-[10px] text-slate-500">{t.trust4Sub}</p>
        </div>
      </div>

      {/* 🌟 10. INTERACTIVE FAQ ACCORDION */}
      <div className="bg-white p-5 sm:p-7 rounded-3xl border-2 border-slate-200 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          <h3 className="text-base sm:text-lg font-black text-slate-900">
            {t.faqTitle}
          </h3>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                className="w-full text-left p-3.5 sm:p-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-900 cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transform transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-200">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { Outlet, NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Gamepad2, 
  Wallet, 
  Gift, 
  User, 
  Crown, 
  Plus, 
  Home, 
  Menu, 
  X, 
  LogOut, 
  ShieldCheck, 
  Users, 
  Check, 
  Flame, 
  Trophy,
  Sparkles,
  ChevronDown,
  Globe,
  LogIn,
  UserPlus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../context/WalletContext';
import { useLanguage } from '../context/LanguageContext';
import { getUserVipLevel } from '../utils/vipLevels';
import LiveTicker from '../components/LiveTicker';

export default function GamingLayout() {
  const { users, currentUser, switchUser, logout } = useAuth();
  const { totalBalance, currentWallet } = useWallet();
  const { lang, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const vip = getUserVipLevel(currentUser?.referralCount || 0);

  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handlePerformLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const drawerLinks = [
    { name: t.home, path: '/', icon: Home },
    { name: t.games, path: '/games', icon: Gamepad2, badge: '8 Games' },
    { name: t.refer, path: '/refer', icon: Gift, badge: '+₹20', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    { name: t.vip, path: '/vip', icon: Crown },
    { name: t.wallet, path: '/wallet', icon: Wallet }
  ];

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden">
      {/* 🌟 1. TOP NAVBAR */}
      <header className="game-navbar">
        <div className="nav-inner">
          
          {/* Left: Mobile Menu Button + Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl text-slate-700 hover:text-indigo-600 hover:bg-slate-100 focus:outline-none transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Brand Logo with Gaming Font */}
            <Link to="/" className="brand-logo group">
              <div className="brand-icon group-hover:scale-105 transition-transform">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="brand-text">WINZO</span>
                <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm uppercase tracking-wider font-tech">
                  PRO
                </span>
              </div>
            </Link>
          </div>

          {/* Right: Language Switcher, Wallet Chip & Profile Popover */}
          <div className="nav-actions">
            
            {/* 🌐 English ⇄ हिन्दी Toggle Button */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="lang-toggle-btn cursor-pointer"
              title="भाषा बदलें / Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-600" />
              <span className="font-extrabold">{lang === 'hi' ? 'EN' : 'हिन्दी'}</span>
            </button>

            {currentUser ? (
              <>
                {/* VIP Level Badge (Desktop) */}
                <Link to="/vip" className="vip-level-pill" title="VIP Level Status">
                  <span>{vip.current.badge}</span>
                  <span className="font-bold text-xs font-tech">{vip.current.name}</span>
                </Link>

                {/* Compact Wallet Pill */}
                <Link
                  to="/wallet"
                  className="wallet-badge-btn"
                  title="वॉलेट देखें / पैसे जोड़ें"
                >
                  <Wallet className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span className="font-black text-xs sm:text-sm text-slate-900 font-tech">
                    ₹{totalBalance.toFixed(0)}
                  </span>
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-black flex-shrink-0 shadow-sm ml-0.5">
                    <Plus className="w-3 h-3" />
                  </span>
                </Link>

                {/* Profile Popover */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-1 p-0.5 sm:p-1 rounded-full hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer focus:outline-none"
                    aria-label="User Account"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-indigo-50 ring-2 ring-indigo-500/30 flex-shrink-0">
                      <img
                        src={currentUser.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${currentUser.phone}`}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-600 hidden sm:inline" />
                  </button>

                  {/* Dropdown Menu Popover with Prominent Logout Button */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border-2 border-slate-200 rounded-3xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150 text-slate-900">
                      <div className="pb-3 border-b border-slate-100">
                        <div className="flex items-center justify-between">
                          <h4 className="font-extrabold text-slate-900 text-sm truncate">{currentUser.name}</h4>
                          <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold text-[10px] border border-indigo-200 font-tech">
                            {vip.current.badge} {vip.current.name}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-mono mt-0.5">📱 +91 {currentUser.phone}</p>
                        <div className="mt-2 p-2 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl flex items-center justify-between text-xs">
                          <span className="text-slate-600 font-semibold">{t.referralCode}:</span>
                          <strong className="text-amber-800 font-mono font-black">{currentUser.referralCode}</strong>
                        </div>
                      </div>

                      {/* Quick Balance Summary */}
                      <div className="py-2.5 grid grid-cols-2 gap-2 text-center text-xs border-b border-slate-100 font-tech">
                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                          <span className="text-[10px] text-slate-500 block font-main">{t.winningBalance}</span>
                          <strong className="text-emerald-700 font-black text-sm">₹{currentWallet.winningBalance.toFixed(2)}</strong>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                          <span className="text-[10px] text-slate-500 block font-main">{t.bonusBalance}</span>
                          <strong className="text-amber-700 font-black text-sm">₹{currentWallet.bonusBalance.toFixed(2)}</strong>
                        </div>
                      </div>

                      {/* Menu Links */}
                      <div className="py-2.5 space-y-1.5 text-xs">
                        <Link
                          to="/profile"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 text-slate-700 font-bold"
                        >
                          <User className="w-4 h-4 text-indigo-600" />
                          <span>{t.profile}</span>
                        </Link>
                        <Link
                          to="/wallet"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 text-slate-700 font-bold"
                        >
                          <Wallet className="w-4 h-4 text-emerald-600" />
                          <span>{t.wallet}</span>
                        </Link>
                      </div>

                      {/* 🌟 Big Prominent Logout Button in Dropdown */}
                      <div className="pt-2.5 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={handlePerformLogout}
                          className="w-full py-2.5 px-3 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                        >
                          <LogOut className="w-4 h-4 text-rose-600" />
                          <span>{lang === 'hi' ? 'लॉगआउट करें (Sign Out)' : 'Logout Account'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn-outline text-xs px-3.5 py-1.5 min-h-0">
                  {t.login}
                </Link>
                <Link to="/register" className="btn-primary text-xs px-3.5 py-1.5 min-h-0 shadow-md">
                  {t.signup}
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 🌟 2. FULL SLIDE DRAWER MENU (With Prominent Logout Button) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          <div className="fixed inset-y-0 left-0 max-w-[85vw] w-80 bg-white shadow-2xl p-5 flex flex-col justify-between z-50 animate-in slide-in-from-left duration-250">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                    <Gamepad2 className="w-4 h-4" />
                  </div>
                  <span className="font-black text-lg text-slate-900 font-gaming">WINZO PRO</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-xl text-slate-500 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Language Switcher inside Drawer */}
              <div className="p-3 bg-slate-100 rounded-2xl flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-indigo-600" />
                  Language / भाषा:
                </span>
                <button
                  onClick={toggleLanguage}
                  className="px-3 py-1 bg-white border border-slate-300 rounded-xl font-extrabold text-indigo-700 shadow-sm cursor-pointer"
                >
                  {lang === 'hi' ? 'Switch to English' : 'हिन्दी में बदलें'}
                </button>
              </div>

              {/* User Card in Drawer */}
              {currentUser ? (
                <div className="p-3.5 bg-indigo-50/80 border border-indigo-100 rounded-2xl space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-white ring-2 ring-indigo-400">
                      <img
                        src={currentUser.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${currentUser.phone}`}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-extrabold text-slate-900 text-sm truncate">{currentUser.name}</div>
                      <div className="text-[11px] text-slate-500 font-tech">📱 +91 {currentUser.phone}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-indigo-100 text-xs">
                    <span className="text-slate-600 font-semibold">{t.totalBalance}:</span>
                    <strong className="text-amber-700 font-black text-sm font-tech">₹{totalBalance.toFixed(2)}</strong>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 bg-indigo-50 rounded-2xl text-center space-y-2.5">
                  <p className="text-xs text-slate-700 font-bold">{t.step1Title}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Link to="/login" className="btn-outline text-xs py-2 text-center font-bold">
                      {t.login}
                    </Link>
                    <Link to="/register" className="btn-primary text-xs py-2 text-center font-black">
                      {t.signup}
                    </Link>
                  </div>
                </div>
              )}

              {/* Drawer Links */}
              <nav className="space-y-1.5 pt-2">
                {drawerLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      end={link.path === '/'}
                      className={({ isActive }) =>
                        `flex items-center justify-between p-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                          isActive
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`
                      }
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{link.name}</span>
                      </div>
                      {link.badge && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 shadow-sm font-tech">
                          {link.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}

                {currentUser && (
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                        isActive ? 'bg-indigo-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                      }`
                    }
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{t.profile}</span>
                  </NavLink>
                )}
              </nav>

              {/* Switch Accounts in Menu */}
              {currentUser && users.length > 1 && (
                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-500 block mb-1 font-main">
                    Accounts Switch ({users.length}):
                  </span>
                  <div className="space-y-1 max-h-24 overflow-y-auto">
                    {users.map((u) => (
                      <button
                        key={u.id}
                        onClick={() => {
                          switchUser(u.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full text-left p-1.5 rounded-lg text-xs flex items-center justify-between ${
                          currentUser.id === u.id
                            ? 'bg-indigo-50 text-indigo-700 font-black border border-indigo-200'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span className="truncate">{u.name} ({u.phone.slice(-4)})</span>
                        {currentUser.id === u.id && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 🌟 Prominent Logout Button inside Drawer Menu */}
            {currentUser ? (
              <div className="pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handlePerformLogout}
                  className="w-full py-3 px-4 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 border-2 border-rose-200 text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-rose-600" />
                  <span>{lang === 'hi' ? 'लॉगआउट करें (Log Out)' : 'Logout Account'}</span>
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-slate-200">
                <Link
                  to="/login"
                  className="w-full btn-primary py-3 text-xs sm:text-sm font-black flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{t.login}</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 🌟 3. MAIN BODY CONTAINER */}
      <main className="main-content">
        <div className="mb-3 sm:mb-4">
          <LiveTicker />
        </div>
        <Outlet />
      </main>

      {/* 🌟 4. MOBILE BOTTOM APP BAR */}
      <nav className="mobile-bottom-nav">
        <NavLink to="/" end className={({ isActive }) => `bottom-nav-link ${isActive ? 'active' : ''}`}>
          <Home className="w-5 h-5" />
          <span>{t.home}</span>
        </NavLink>

        <NavLink to="/games" className={({ isActive }) => `bottom-nav-link ${isActive ? 'active' : ''}`}>
          <Gamepad2 className="w-5 h-5" />
          <span>{lang === 'hi' ? 'गेम्स' : 'Games'}</span>
        </NavLink>

        <NavLink to="/refer" className={({ isActive }) => `bottom-nav-link ${isActive ? 'active' : ''}`}>
          <div className="relative">
            <Gift className="w-5 h-5 text-amber-500" />
            <span className="absolute -top-1 -right-2.5 bg-emerald-500 text-white font-black text-[8px] px-1 rounded-full animate-bounce font-tech">
              ₹20
            </span>
          </div>
          <span className="text-amber-800 font-extrabold">{lang === 'hi' ? 'रेफरल' : 'Refer'}</span>
        </NavLink>

        <NavLink to="/wallet" className={({ isActive }) => `bottom-nav-link ${isActive ? 'active' : ''}`}>
          <Wallet className="w-5 h-5" />
          <span>{lang === 'hi' ? 'वॉलेट' : 'Wallet'}</span>
        </NavLink>

        <NavLink to="/profile" className={({ isActive }) => `bottom-nav-link ${isActive ? 'active' : ''}`}>
          <User className="w-5 h-5" />
          <span>{lang === 'hi' ? 'प्रोफाइल' : 'Profile'}</span>
        </NavLink>
      </nav>
    </div>
  );
}

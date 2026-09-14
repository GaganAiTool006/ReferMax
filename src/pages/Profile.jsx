import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Smartphone, 
  ShieldCheck, 
  CheckCircle2, 
  Crown, 
  LogOut, 
  Save, 
  QrCode
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../context/WalletContext';
import { getUserVipLevel } from '../utils/vipLevels';

export default function Profile() {
  const { currentUser, updateProfile, logout } = useAuth();
  const { totalBalance } = useWallet();

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [upiId, setUpiId] = useState(currentUser?.upiId || '');
  const [bankName, setBankName] = useState(currentUser?.bankName || '');
  const [accountNumber, setAccountNumber] = useState(currentUser?.accountNumber || '');
  const [ifscCode, setIfscCode] = useState(currentUser?.ifscCode || '');

  const vip = getUserVipLevel(currentUser?.referralCount || 0);

  let completedFields = 0;
  if (name) completedFields++;
  if (email) completedFields++;
  if (phone) completedFields++;
  if (upiId) completedFields++;
  if (accountNumber && ifscCode) completedFields++;
  const completionPercentage = Math.round((completedFields / 5) * 100);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      phone,
      upiId,
      bankName,
      accountNumber,
      ifscCode
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
      {/* Profile Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
          <div className="relative">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full ring-4 ring-white/40 overflow-hidden bg-white flex items-center justify-center shadow-lg">
              <img
                src={currentUser?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${currentUser?.phone}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute bottom-0 right-0 p-1 bg-emerald-500 rounded-full text-white ring-2 ring-white">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="space-y-1 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-xl sm:text-2xl font-black">{currentUser?.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-amber-300 text-xs font-black flex items-center gap-1">
                <Crown className="w-3 h-3 text-yellow-300" />
                {vip.current.name}
              </span>
            </div>
            <p className="text-xs text-indigo-100 font-mono">
              📱 +91 {currentUser?.phone} • 🔑 Ref: {currentUser?.referralCode}
            </p>
            <div className="text-xs text-amber-300 font-bold pt-0.5">
              वॉलेट बैलेंस: ₹{totalBalance.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Meter */}
        <div className="mt-5 pt-4 border-t border-white/20">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="text-indigo-100 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              प्रोफाइल पूर्णता (Profile Completion)
            </span>
            <span className="text-amber-300 font-black">{completionPercentage}% पूर्ण</span>
          </div>
          <div className="w-full h-2.5 bg-black/20 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                completionPercentage === 100 ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Edit Profile Form */}
      <div className="game-card space-y-4 bg-white p-4 sm:p-6">
        <h2 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
          <User className="w-4 h-4 text-indigo-600" />
          प्रोफाइल & भुगतान विवरण अपडेट
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                पूरा नाम (Full Name)
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                <span>ईमेल ID</span>
                <span className="text-[10px] text-emerald-600 font-bold">✓ वेरीफाइड</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
              <span>मोबाइल नंबर</span>
              <span className="text-[10px] text-emerald-600 font-bold">✓ OTP वेरीफाइड</span>
            </label>
            <input
              type="tel"
              readOnly
              value={`+91 ${phone}`}
              className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-500 font-mono cursor-not-allowed"
            />
          </div>

          {/* UPI & Bank Details */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <h3 className="text-xs font-black text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
              <QrCode className="w-3.5 h-3.5 text-amber-600" /> विड्रॉल & UPI विवरण (Payout Setup)
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                UPI ID (Google Pay / PhonePe / Paytm)
              </label>
              <input
                type="text"
                placeholder="उदा. 9876543210@paytm या yourname@okaxis"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600 font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">बैंक का नाम</label>
                <input
                  type="text"
                  placeholder="State Bank of India"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">खाता संख्या</label>
                <input
                  type="text"
                  placeholder="Account Number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">IFSC कोड</label>
                <input
                  type="text"
                  placeholder="SBIN0001234"
                  value={ifscCode}
                  onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono uppercase"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="submit"
              className="flex-1 btn-primary py-2.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>प्रोफाइल सेव करें</span>
            </button>

            <button
              type="button"
              onClick={logout}
              className="btn-outline py-2.5 px-4 text-xs font-bold text-rose-600 hover:bg-rose-50 border-rose-200 flex items-center gap-1 min-h-0"
            >
              <LogOut className="w-4 h-4" />
              <span>लॉगआउट</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

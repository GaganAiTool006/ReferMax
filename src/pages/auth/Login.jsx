import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useWallet } from '../../context/WalletContext';
import { Smartphone, Lock, ArrowRight, Zap, CheckCircle2, KeyRound } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { requestLoginOtp, verifyOtp, loginWithPassword, pendingOtpData } = useAuth();
  const { addTransaction, addReferralReward } = useWallet();

  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [useOtpMode, setUseOtpMode] = useState(false);
  const [otp, setOtp] = useState('');

  const handlePasswordLogin = (e) => {
    e.preventDefault();
    const success = loginWithPassword(phoneOrEmail, password);
    if (success) navigate('/');
  };

  const handleRequestOtp = (e) => {
    e.preventDefault();
    requestLoginOtp({ phoneOrEmail });
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const success = verifyOtp(otp, addTransaction, addReferralReward);
    if (success) navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-6 px-3">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl shadow-xl p-6 sm:p-8 relative">
        {!pendingOtpData ? (
          <div>
            <div className="text-center mb-5">
              <h2 className="text-2xl font-black text-slate-900">
                लॉगिन करें (Sign In)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                वॉलेट और गेम्स एक्सेस करने के लिए लॉगिन करें
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="flex bg-slate-100 p-1 rounded-xl mb-4 border border-slate-200">
              <button
                type="button"
                onClick={() => setUseOtpMode(false)}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  !useOtpMode ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                पासवर्ड से लॉगिन
              </button>
              <button
                type="button"
                onClick={() => setUseOtpMode(true)}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  useOtpMode ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                OTP से लॉगिन
              </button>
            </div>

            {!useOtpMode ? (
              <form onSubmit={handlePasswordLogin} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Smartphone className="w-3.5 h-3.5 text-indigo-600" /> मोबाइल नंबर या ईमेल
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="9876543210 या email@gmail.com"
                    value={phoneOrEmail}
                    onChange={(e) => setPhoneOrEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-indigo-600" /> पासवर्ड
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="पासवर्ड डालें"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary py-3 text-xs sm:text-sm font-black shadow-lg flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                >
                  <span>लॉगिन करें</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleRequestOtp} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Smartphone className="w-3.5 h-3.5 text-indigo-600" /> रजिस्टर्ड मोबाइल या ईमेल
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="9876543210"
                    value={phoneOrEmail}
                    onChange={(e) => setPhoneOrEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary py-3 text-xs sm:text-sm font-black shadow-lg flex items-center justify-center gap-1.5"
                >
                  <span>लॉगिन OTP भेजें</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <div className="mt-5 pt-3 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500">
                अकाउंट नहीं है?{' '}
                <Link to="/register" className="text-indigo-600 font-bold underline">
                  रजिस्टर करें और ₹10 बोनस पाएं!
                </Link>
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-11 h-11 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center mx-auto mb-2 text-indigo-600">
                <KeyRound className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-black text-slate-900">लॉगिन OTP सत्यापन</h2>
            </div>

            <div className="p-2.5 bg-indigo-50 border border-indigo-200 rounded-xl flex items-center justify-between text-xs">
              <span className="text-indigo-900">
                OTP: <strong className="font-mono text-indigo-700 text-sm font-black">{pendingOtpData.otp}</strong>
              </span>
              <button
                type="button"
                onClick={() => setOtp(pendingOtpData.otp)}
                className="px-2 py-1 bg-indigo-600 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 min-h-0"
              >
                <Zap className="w-3 h-3" /> ऑटो-फिल
              </button>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-3">
              <input
                type="text"
                maxLength={6}
                required
                autoFocus
                placeholder="• • • • • •"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="w-full text-center text-2xl font-black tracking-widest bg-slate-50 border-2 border-indigo-300 rounded-xl py-2.5 text-indigo-700 font-mono focus:bg-white focus:outline-none"
              />

              <button
                type="submit"
                className="w-full btn-green py-3 text-xs sm:text-sm font-black shadow-lg flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>लॉगिन करें</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

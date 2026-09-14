import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useWallet } from '../../context/WalletContext';
import { 
  Gift, 
  Sparkles, 
  Smartphone, 
  Mail, 
  Lock, 
  User, 
  Share2, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  KeyRound 
} from 'lucide-react';

export default function Register() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { requestRegisterOtp, verifyOtp, pendingOtpData, currentUser } = useAuth();
  const { addTransaction, addReferralReward } = useWallet();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const ref = searchParams.get('ref') || searchParams.get('r');
    if (ref) setReferralCode(ref.toUpperCase());
  }, [searchParams]);

  useEffect(() => {
    let interval;
    if (pendingOtpData && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [pendingOtpData, timer]);

  useEffect(() => {
    if (currentUser && !pendingOtpData) navigate('/');
  }, [currentUser, pendingOtpData, navigate]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const success = requestRegisterOtp({ name, phone, email, password, referralCode });
    if (success) setTimer(60);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const success = verifyOtp(otp, addTransaction, addReferralReward);
    if (success) navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-6 px-3">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl shadow-xl p-6 sm:p-8 relative">
        {/* Welcome Bonus Banner */}
        <div className="mb-5 bg-gradient-to-r from-amber-100/80 via-yellow-100/60 to-amber-100/80 border border-amber-300 rounded-2xl p-3 text-center flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
          <span className="text-amber-900 font-extrabold text-xs sm:text-sm">
            जॉइन करते ही पाएं <strong className="underline text-indigo-700">₹10 का वेलकम बोनस</strong>!
          </span>
        </div>

        {!pendingOtpData ? (
          <div>
            <div className="text-center mb-5">
              <h2 className="text-2xl font-black text-slate-900">
                नया अकाउंट बनाएं
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                फोन नंबर और ईमेल से तुरंत रजिस्टर करें
              </p>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-indigo-600" /> पूरा नाम (Full Name)
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. राहुल शर्मा"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Smartphone className="w-3.5 h-3.5 text-indigo-600" /> मोबाइल नंबर (10 Digits)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-500">+91</span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-indigo-600" /> ईमेल आईडी
                </label>
                <input
                  type="email"
                  required
                  placeholder="yourname@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  minLength={6}
                  placeholder="कम से कम 6 अक्षर"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Share2 className="w-3.5 h-3.5 text-amber-600" /> रेफरल कोड (Optional)
                  </span>
                  <span className="text-[10px] text-amber-600 font-bold">+₹20 दोस्त को</span>
                </label>
                <input
                  type="text"
                  placeholder="उदा. VIKAS20"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                  className="w-full bg-amber-50/60 border border-amber-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-amber-900 font-bold uppercase focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary py-3 text-xs sm:text-sm font-black shadow-lg flex items-center justify-center gap-1.5 cursor-pointer mt-1"
              >
                <span>OTP प्राप्त करें (Get OTP)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-5 pt-3 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500">
                पहले से अकाउंट है?{' '}
                <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-bold underline">
                  लॉगिन करें
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
              <h2 className="text-lg font-black text-slate-900">OTP सत्यापन</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                मोबाइल <strong>+91 {pendingOtpData.phone}</strong> पर भेजा गया 6-डिजिट OTP डालें
              </p>
            </div>

            {/* Demo Helper */}
            <div className="p-2.5 bg-indigo-50 border border-indigo-200 rounded-xl flex items-center justify-between text-xs">
              <span className="text-indigo-900 font-medium">
                डेमो OTP: <strong className="font-mono text-indigo-700 text-sm font-black">{pendingOtpData.otp}</strong>
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
                className="w-full btn-gold py-3 text-xs sm:text-sm font-black shadow-lg flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>वेरीफाई करें & ₹10 बोनस पाएं</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

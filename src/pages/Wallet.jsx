import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Wallet, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  QrCode, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Copy, 
  Clock, 
  Sparkles,
  TrendingUp,
  CreditCard,
  Building
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../context/WalletContext';
import { useToast } from '../context/ToastContext';

export default function WalletPage() {
  const { currentUser } = useAuth();
  const { 
    currentWallet, 
    totalBalance, 
    depositMoney, 
    withdrawMoney, 
    transactions 
  } = useWallet();
  const { showSuccess, showError, showInfo } = useToast();

  const [activeTab, setActiveTab] = useState('deposit'); // 'deposit' | 'withdraw' | 'history'
  const [depositAmount, setDepositAmount] = useState(100);
  const [withdrawAmount, setWithdrawAmount] = useState(520);
  const [utrNumber, setUtrNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const upiId = 'winzopay@icici';
  const upiPayLink = `upi://pay?pa=${upiId}&pn=GamingPlatform&am=${depositAmount}&cu=INR`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    showSuccess(`UPI ID ${upiId} कॉपी हो गया!`);
  };

  const handleDepositSubmit = (e) => {
    e.preventDefault();
    if (!depositAmount || depositAmount < 50) {
      showError('न्यूनतम जमा राशि ₹50 है।', 'डिपॉजिट त्रुटि');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      depositMoney(Number(depositAmount), utrNumber || `UTR${Date.now().toString().slice(-8)}`);
      setIsProcessing(false);
      setUtrNumber('');
      setActiveTab('history');
    }, 800);
  };

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    if (!currentUser?.upiId && !currentUser?.accountNumber) {
      showError('कृपया पहले अपनी प्रोफाइल में UPI ID या बैंक विवरण जोड़ें!', 'विवरण अधूरा');
      return;
    }

    const success = withdrawMoney(Number(withdrawAmount));
    if (success) {
      setActiveTab('history');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* 🌟 Balance Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 text-white p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-indigo-200">
              कुल वॉलेट बैलेंस (Total Balance)
            </span>
            <div className="text-3xl sm:text-5xl font-black text-white">
              ₹{totalBalance.toFixed(2)}
            </div>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveTab('deposit')}
              className={`flex-1 sm:flex-initial py-2.5 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'deposit' ? 'bg-white text-indigo-700 shadow-md' : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <ArrowDownCircle className="w-4 h-4 text-emerald-400" />
              <span>पैसे जोड़ें</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('withdraw')}
              className={`flex-1 sm:flex-initial py-2.5 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'withdraw' ? 'bg-white text-indigo-700 shadow-md' : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <ArrowUpCircle className="w-4 h-4 text-amber-400" />
              <span>निकासी (₹520+)</span>
            </button>
          </div>
        </div>

        {/* 3 Balances Breakdown */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-5 pt-4 border-t border-white/20 text-xs">
          <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-2xl border border-white/10">
            <span className="text-indigo-200 block text-[11px] font-medium">डिपॉजिट बैलेंस</span>
            <strong className="text-white text-sm sm:text-base font-black">₹{currentWallet.depositBalance.toFixed(2)}</strong>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-2xl border border-white/10">
            <span className="text-emerald-300 block text-[11px] font-medium">विनिंग (निकासी योग्य)</span>
            <strong className="text-emerald-300 text-sm sm:text-base font-black">₹{currentWallet.winningBalance.toFixed(2)}</strong>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-2xl border border-white/10">
            <span className="text-amber-300 block text-[11px] font-medium">बोनस बैलेंस</span>
            <strong className="text-amber-300 text-sm sm:text-base font-black">₹{currentWallet.bonusBalance.toFixed(2)}</strong>
          </div>
        </div>
      </div>

      {/* 🌟 Tab Navigation */}
      <div className="flex bg-slate-200/80 p-1.5 rounded-2xl max-w-md mx-auto border border-slate-300">
        <button
          type="button"
          onClick={() => setActiveTab('deposit')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
            activeTab === 'deposit'
              ? 'bg-white text-indigo-700 shadow-md scale-[1.02]'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          📥 डिपॉजिट (पैसे जोड़ें)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('withdraw')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
            activeTab === 'withdraw'
              ? 'bg-white text-indigo-700 shadow-md scale-[1.02]'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          📤 विड्रॉल (₹520+)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
            activeTab === 'history'
              ? 'bg-white text-indigo-700 shadow-md scale-[1.02]'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          📜 पासबुक (History)
        </button>
      </div>

      {/* 🌟 TAB 1: DEPOSIT SECTION */}
      {activeTab === 'deposit' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          <div className="md:col-span-7 game-card bg-white p-5 sm:p-6 space-y-4 border-2 border-slate-200 shadow-md">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <ArrowDownCircle className="w-5 h-5 text-emerald-600" />
              UPI QR कोड से तुरंत पैसे जोड़ें
            </h3>

            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                डिपॉजिट राशि चुनें (Select Amount):
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[100, 200, 500, 1000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setDepositAmount(amt)}
                    className={`py-2.5 rounded-xl text-xs font-black transition-all ${
                      depositAmount === amt
                        ? 'bg-indigo-600 text-white shadow-md scale-105'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleDepositSubmit} className="space-y-3.5 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  कस्टम राशि (₹):
                </label>
                <input
                  type="number"
                  min="50"
                  required
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-bold text-sm focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  12-डिजिट UTR / Transaction No. (वैकल्पिक):
                </label>
                <input
                  type="text"
                  placeholder="उदा. 423874928172"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 text-xs sm:text-sm font-mono focus:outline-none focus:border-indigo-600"
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full btn-green py-3 text-xs sm:text-sm font-black shadow-lg cursor-pointer"
              >
                {isProcessing ? 'प्रोसेस हो रहा है...' : `₹${depositAmount} डिपॉजिट कन्फर्म करें`}
              </button>
            </form>
          </div>

          <div className="md:col-span-5 game-card bg-white p-5 text-center flex flex-col items-center justify-center space-y-3 border-2 border-slate-200 shadow-md">
            <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
              स्कैन & पे (Scan to Pay ₹{depositAmount})
            </span>

            <div className="p-3 bg-white rounded-2xl shadow-xl inline-block ring-4 ring-emerald-100 border border-slate-200">
              <QRCodeSVG
                value={upiPayLink}
                size={140}
                bgColor="#ffffff"
                fgColor="#0f172a"
                level="Q"
                includeMargin={false}
              />
            </div>

            <div className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-700 truncate">{upiId}</span>
              <button
                type="button"
                onClick={handleCopyUpi}
                className="btn-outline text-[11px] py-1 px-2 min-h-0 text-indigo-700"
              >
                कॉपी
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🌟 TAB 2: WITHDRAWAL SECTION */}
      {activeTab === 'withdraw' && (
        <div className="game-card bg-white p-5 sm:p-7 space-y-5 border-2 border-slate-200 shadow-md">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <ArrowUpCircle className="w-5 h-5 text-amber-600" />
                सीधे बैंक / UPI में निकासी (Withdrawal)
              </h3>
              <p className="text-xs text-slate-500">न्यूनतम निकासी राशि: <strong>₹520</strong></p>
            </div>
            <span className="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              विनिंग बैलेंस: ₹{currentWallet.winningBalance.toFixed(2)}
            </span>
          </div>

          {/* Condition Notice */}
          {!currentWallet.hasDepositedAtLeastOnce && (
            <div className="p-4 bg-rose-50 border-2 border-rose-200 rounded-2xl flex items-start gap-3 text-xs text-rose-900">
              <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-black block">डिपॉजिट सुरक्षा चेक:</strong>
                विड्रॉल सक्रिय करने के लिए आपको कम से कम एक बार कोई भी डिपॉजिट करना आवश्यक है।
              </div>
            </div>
          )}

          <form onSubmit={handleWithdrawSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-black text-slate-700 mb-1">
                निकासी राशि (₹):
              </label>
              <input
                type="number"
                min="520"
                required
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-bold text-sm focus:outline-none focus:border-indigo-600"
              />
            </div>

            {/* Payout Destination Info */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <span className="font-black text-slate-700 uppercase tracking-wider block">
                भुगतान गंतव्य (Payout Account):
              </span>
              {currentUser?.upiId ? (
                <div className="flex items-center justify-between text-slate-800">
                  <span>UPI ID:</span>
                  <strong className="font-mono text-indigo-700">{currentUser.upiId}</strong>
                </div>
              ) : (
                <div className="text-rose-600 font-bold">
                  ⚠️ प्रोफाइल में कोई UPI ID सेट नहीं है।
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!currentWallet.hasDepositedAtLeastOnce || totalBalance < 520 || currentWallet.winningBalance < withdrawAmount}
              className="w-full btn-gold py-3.5 text-xs sm:text-sm font-black shadow-lg cursor-pointer disabled:opacity-50"
            >
              ₹{withdrawAmount} तुरंत निकालें (Withdraw)
            </button>
          </form>
        </div>
      )}

      {/* 🌟 TAB 3: TRANSACTION PASSBOOK */}
      {activeTab === 'history' && (
        <div className="game-card bg-white p-5 space-y-4 border-2 border-slate-200 shadow-md">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            ट्रांजेक्शन पासबुक (Transaction History)
          </h3>

          {transactions.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {transactions.map((tx) => (
                <div key={tx.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">{tx.description}</h4>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {new Date(tx.timestamp).toLocaleString('hi-IN')}
                    </span>
                  </div>
                  <div className="text-right">
                    <strong className={`text-sm sm:text-base font-black ${
                      tx.type === 'withdraw' || tx.type === 'bet' ? 'text-rose-600' : 'text-emerald-700'
                    }`}>
                      {tx.type === 'withdraw' || tx.type === 'bet' ? '-' : '+'}₹{tx.amount.toFixed(2)}
                    </strong>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">{tx.status}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-slate-500 font-bold">
              अभी तक कोई ट्रांजेक्शन नहीं हुआ है
            </div>
          )}
        </div>
      )}

    </div>
  );
}

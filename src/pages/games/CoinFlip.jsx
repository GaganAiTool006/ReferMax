import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Coins, Flame, Trophy, History } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import { useToast } from '../../context/ToastContext';

export default function CoinFlip() {
  const { totalBalance, placeBet, creditGameWin } = useWallet();
  const { showSuccess, showError } = useToast();

  const [betAmount, setBetAmount] = useState(50);
  const [selectedSide, setSelectedSide] = useState('heads'); // 'heads' | 'tails'
  const [isFlipping, setIsFlipping] = useState(false);
  const [coinResult, setCoinResult] = useState('heads');
  const [lastWin, setLastWin] = useState(null);
  const [flipHistory, setFlipHistory] = useState(['H', 'T', 'H', 'H', 'T']);

  const handleFlipCoin = () => {
    if (isFlipping) return;

    const success = placeBet(betAmount, `Coin Flip (${selectedSide.toUpperCase()})`);
    if (!success) return;

    setIsFlipping(true);
    setLastWin(null);

    setTimeout(() => {
      const outcome = Math.random() > 0.5 ? 'heads' : 'tails';
      setCoinResult(outcome);
      setIsFlipping(false);

      setFlipHistory((prev) => [outcome === 'heads' ? 'H' : 'T', ...prev.slice(0, 8)]);

      if (outcome === selectedSide) {
        const winAmount = Math.round(betAmount * 2.0);
        creditGameWin(winAmount, 'Coin Flip', '2.0x');
        setLastWin({ won: true, outcome, amount: winAmount });
      } else {
        setLastWin({ won: false, outcome, amount: 0 });
        showError(`सिक्के पर ${outcome === 'heads' ? 'HEAD (चित्त)' : 'TAIL (पट)'} आया!`, 'टॉस रिजल्ट');
      }
    }, 1300);
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link to="/games" className="btn-outline py-1 px-3 text-xs flex items-center gap-1.5 min-h-0">
          <ArrowLeft className="w-4 h-4" /> गेम्स हब
        </Link>
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-500 font-medium">वॉलेट:</span>
          <strong className="text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl font-black">
            ₹{totalBalance.toFixed(2)}
          </strong>
        </div>
      </div>

      {/* 🌟 3D Realistic Coin Toss Stage */}
      <div className="game-card card-glow-gold space-y-5 bg-white p-5 sm:p-7 text-center shadow-xl">
        <div>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-black uppercase mb-1">
            <Coins className="w-3.5 h-3.5" /> 50-50 इंस्टेंट 2x जीत
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            🪙 Head or Tail (सिक्का उछालो)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Head (चित्त) या Tail (पट) चुनें और 2 गुना नकद इनाम पाएं!
          </p>
        </div>

        {/* 3D Coin Visual Stage */}
        <div className="py-8 px-4 bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-950 rounded-3xl border-4 border-amber-400 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
            {/* SVG Coin */}
            <svg
              className={`w-full h-full transform transition-all duration-300 drop-shadow-[0_15px_25px_rgba(245,158,11,0.5)] ${
                isFlipping ? 'animate-spin scale-110' : 'hover:scale-105'
              }`}
              viewBox="0 0 100 100"
            >
              <defs>
                <linearGradient id="coinBevel" x1="0" y1="0" x2="100" y2="100">
                  <stop stopColor="#fef08a" />
                  <stop offset="0.5" stopColor="#eab308" />
                  <stop offset="1" stopColor="#854d0e" />
                </linearGradient>
                <linearGradient id="coinCenter" x1="15" y1="15" x2="85" y2="85">
                  <stop stopColor="#fef9c3" />
                  <stop offset="0.6" stopColor="#facc15" />
                  <stop offset="1" stopColor="#ca8a04" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="46" fill="url(#coinBevel)" stroke="#78350f" strokeWidth="2" />
              <circle cx="50" cy="50" r="40" fill="url(#coinCenter)" stroke="#fef08a" strokeWidth="2" />
              <circle cx="50" cy="50" r="32" fill="none" stroke="#78350f" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="50" y="58" textAnchor="middle" fill="#78350f" fontSize="22" fontWeight="900" fontFamily="Rajdhani">
                {coinResult === 'heads' ? 'HEAD' : 'TAIL'}
              </text>
            </svg>
          </div>

          <div className="mt-4 px-4 py-1 bg-black/40 backdrop-blur-md rounded-full border border-amber-300/40 text-amber-300 text-xs font-black">
            {isFlipping ? 'सिक्का हवा में घूम रहा है...' : `वर्तमान परिणाम: ${coinResult.toUpperCase()}`}
          </div>
        </div>

        {/* Win Alert */}
        {lastWin && (
          <div
            className={`p-3 rounded-2xl border text-xs sm:text-sm font-black animate-in zoom-in-95 ${
              lastWin.won
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}
          >
            {lastWin.won
              ? `🎉 बधाई हो! ${lastWin.outcome.toUpperCase()} आया और आपने ₹${lastWin.amount} जीत लिए!`
              : `ओह! सिक्के पर ${lastWin.outcome.toUpperCase()} आया।`}
          </div>
        )}

        {/* Side Selector */}
        <div className="grid grid-cols-2 gap-3 text-left">
          <button
            type="button"
            onClick={() => setSelectedSide('heads')}
            className={`p-4 rounded-2xl border-2 flex items-center justify-center gap-2.5 transition-all ${
              selectedSide === 'heads'
                ? 'bg-gradient-to-tr from-amber-400 to-yellow-500 text-slate-950 border-amber-300 shadow-xl font-black scale-105 ring-4 ring-amber-200'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <span className="text-2xl">🪙</span>
            <div>
              <div className="text-xs sm:text-sm font-black">HEAD (चित्त)</div>
              <div className="text-[11px] font-bold opacity-80">2.0x मल्टीप्लायर</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedSide('tails')}
            className={`p-4 rounded-2xl border-2 flex items-center justify-center gap-2.5 transition-all ${
              selectedSide === 'tails'
                ? 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white border-indigo-400 shadow-xl font-black scale-105 ring-4 ring-indigo-200'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <span className="text-2xl">🪙</span>
            <div>
              <div className="text-xs sm:text-sm font-black">TAIL (पट)</div>
              <div className="text-[11px] font-bold opacity-80">2.0x मल्टीप्लायर</div>
            </div>
          </button>
        </div>

        {/* Bet Selector */}
        <div className="space-y-1.5 text-left">
          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
            शर्त राशि चुनें:
          </label>
          <div className="grid grid-cols-5 gap-1.5">
            {[10, 20, 50, 100, 200].map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setBetAmount(amt)}
                className={`py-2 rounded-xl text-xs font-black transition-all ${
                  betAmount === amt
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                ₹{amt}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleFlipCoin}
          disabled={isFlipping || totalBalance < betAmount}
          className="w-full btn-gold py-3.5 sm:py-4 text-sm sm:text-base font-black shadow-xl cursor-pointer disabled:opacity-50"
        >
          <Coins className={`w-5 h-5 ${isFlipping ? 'animate-spin' : ''}`} />
          <span>{isFlipping ? 'सिक्का उछल रहा है...' : `₹${betAmount} से सिक्का उछालें (Flip Coin)`}</span>
        </button>
      </div>

      {/* History Ribbon */}
      <div className="game-card p-4 bg-white flex items-center justify-between gap-2">
        <span className="text-xs font-black text-slate-700 flex items-center gap-1">
          <History className="w-4 h-4 text-amber-600" />
          हाल के टॉस परिणाम:
        </span>
        <div className="flex gap-1.5">
          {flipHistory.map((res, i) => (
            <span
              key={i}
              className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                res === 'H' ? 'bg-amber-100 text-amber-800' : 'bg-indigo-100 text-indigo-800'
              }`}
            >
              {res}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

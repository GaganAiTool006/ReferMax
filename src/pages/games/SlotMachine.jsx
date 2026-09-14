import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Trophy, RotateCw, Flame, Zap } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import { useToast } from '../../context/ToastContext';

const SYMBOLS = [
  { icon: '7️⃣', name: 'Seven', mult: 10, label: '777 जैकपॉट (10x)' },
  { icon: '💎', name: 'Diamond', mult: 5, label: 'डायमंड (5x)' },
  { icon: '🍒', name: 'Cherry', mult: 3, label: 'चेरी (3x)' },
  { icon: '🔔', name: 'Bell', mult: 2.5, label: 'घंटी (2.5x)' },
  { icon: '🍋', name: 'Lemon', mult: 2, label: 'नींबू (2x)' },
  { icon: '🍇', name: 'Grapes', mult: 1.5, label: 'अंगूर (1.5x)' }
];

export default function SlotMachine() {
  const { totalBalance, placeBet, creditGameWin } = useWallet();
  const { showSuccess, showError } = useToast();

  const [betAmount, setBetAmount] = useState(50);
  const [reel1, setReel1] = useState(SYMBOLS[0]);
  const [reel2, setReel2] = useState(SYMBOLS[0]);
  const [reel3, setReel3] = useState(SYMBOLS[0]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastWin, setLastWin] = useState(null);

  const handleSpin = () => {
    if (isSpinning) return;

    const success = placeBet(betAmount, '777 Slot Machine');
    if (!success) return;

    setIsSpinning(true);
    setLastWin(null);

    let counter = 0;
    const interval = setInterval(() => {
      setReel1(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
      setReel2(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
      setReel3(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
      counter++;

      if (counter > 16) {
        clearInterval(interval);
        finalizeSpin();
      }
    }, 70);
  };

  const finalizeSpin = () => {
    const r1 = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    const r2 = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    const r3 = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

    setReel1(r1);
    setReel2(r2);
    setReel3(r3);
    setIsSpinning(false);

    if (r1.name === r2.name && r2.name === r3.name) {
      const winAmount = Math.round(betAmount * r1.mult);
      creditGameWin(winAmount, '777 Slot Machine', `${r1.mult}x JACKPOT`);
      setLastWin({ won: true, mult: r1.mult, amount: winAmount, type: '🎉 3x MEGA JACKPOT!' });
    } else if (r1.name === r2.name || r2.name === r3.name || r1.name === r3.name) {
      const winAmount = Math.round(betAmount * 1.5);
      creditGameWin(winAmount, '777 Slot Machine', '1.5x Mini Win');
      setLastWin({ won: true, mult: 1.5, amount: winAmount, type: '✨ 2x MATCH WIN!' });
    } else {
      setLastWin({ won: false, mult: 0, amount: 0 });
      showError('कोई सिंबल मैच नहीं हुआ। फिर से घुमाएं!', 'स्लॉट्स परिणाम');
    }
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

      {/* 🌟 Realistic Vegas Casino Cabinet Arena */}
      <div className="game-card card-glow-gold space-y-5 bg-white p-5 sm:p-7 text-center shadow-2xl">
        <div>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-black uppercase mb-1">
            <Flame className="w-3.5 h-3.5" /> 10x 777 मेगा जैकपॉट
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            🎰 777 Vegas Slots (स्लॉट मशीन)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            3 सिंबल मैच करें और 10 गुना तक बंपर जैकपॉट जीतें!
          </p>
        </div>

        {/* Casino Slot Machine Frame with Flashing Lights */}
        <div className="p-4 sm:p-6 bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-950 rounded-3xl border-4 border-amber-400 shadow-2xl relative overflow-hidden">
          {/* Top Marquee Bar */}
          <div className="flex items-center justify-between px-3 py-1 bg-black/60 rounded-xl border border-amber-300/40 mb-3 text-xs font-black text-amber-300 font-mono">
            <span>★ WINZO 777 ★</span>
            <span className="text-emerald-400">WIN UP TO ₹10,000</span>
          </div>

          {/* 3 Reels Display */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 p-2 bg-black/80 rounded-2xl border-2 border-amber-500/50 shadow-inner">
            {/* Reel 1 */}
            <div className="h-28 sm:h-36 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-xl border-2 border-amber-400/40 flex items-center justify-center text-4xl sm:text-6xl shadow-inner">
              <span className={`transform transition-transform ${isSpinning ? 'animate-bounce' : ''}`}>
                {reel1.icon}
              </span>
            </div>
            {/* Reel 2 */}
            <div className="h-28 sm:h-36 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-xl border-2 border-amber-400/40 flex items-center justify-center text-4xl sm:text-6xl shadow-inner">
              <span className={`transform transition-transform ${isSpinning ? 'animate-bounce delay-75' : ''}`}>
                {reel2.icon}
              </span>
            </div>
            {/* Reel 3 */}
            <div className="h-28 sm:h-36 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-xl border-2 border-amber-400/40 flex items-center justify-center text-4xl sm:text-6xl shadow-inner">
              <span className={`transform transition-transform ${isSpinning ? 'animate-bounce delay-150' : ''}`}>
                {reel3.icon}
              </span>
            </div>
          </div>
        </div>

        {/* Win Celebration */}
        {lastWin && (
          <div
            className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-black animate-in zoom-in-95 ${
              lastWin.won
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 animate-bounce'
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}
          >
            {lastWin.won
              ? `${lastWin.type} आपने ₹${lastWin.amount} जीत लिए!`
              : 'इस बार कोई सिंबल मैच नहीं हुआ।'}
          </div>
        )}

        {/* Bet Chips */}
        <div className="space-y-1.5 text-left">
          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
            शर्त राशि चुनें:
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[10, 20, 50, 100].map((amt) => (
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

        {/* Spin Lever Button */}
        <button
          onClick={handleSpin}
          disabled={isSpinning || totalBalance < betAmount}
          className="w-full btn-gold py-3.5 sm:py-4 text-sm sm:text-base font-black shadow-xl cursor-pointer disabled:opacity-50"
        >
          <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
          <span>{isSpinning ? 'स्लॉट घूम रहा है...' : `₹${betAmount} से स्लॉट स्पिन करें (Spin Slots)`}</span>
        </button>

        {/* Paytable Grid */}
        <div className="pt-2 text-left space-y-1.5 border-t border-slate-100">
          <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider block">
            पे-टेबल (Paytable):
          </span>
          <div className="grid grid-cols-3 gap-1.5 text-[11px]">
            {SYMBOLS.map((s, idx) => (
              <div key={idx} className="bg-slate-50 p-2 rounded-xl flex items-center justify-between border border-slate-200">
                <span>{s.icon} 3x</span>
                <strong className="text-indigo-700 font-black">{s.mult}x</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

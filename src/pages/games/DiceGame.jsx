import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Dices, Sparkles, Trophy, History, ShieldCheck, Flame } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import { useToast } from '../../context/ToastContext';

export default function DiceGame() {
  const { totalBalance, placeBet, creditGameWin } = useWallet();
  const { showSuccess, showError, showInfo } = useToast();

  const [betAmount, setBetAmount] = useState(50);
  const [selectedPrediction, setSelectedPrediction] = useState('under'); // 'under' (2-6) | 'exact' (7) | 'over' (8-12)
  const [dice1, setDice1] = useState(3);
  const [dice2, setDice2] = useState(4);
  const [isRolling, setIsRolling] = useState(false);
  const [lastResult, setLastResult] = useState(null);
  const [history, setHistory] = useState([7, 4, 11, 8, 3, 7, 9]);

  const handleRollDice = () => {
    if (isRolling) return;

    const mult = selectedPrediction === 'exact' ? 5.8 : 2.0;
    const success = placeBet(betAmount, `Lucky Dice (${selectedPrediction.toUpperCase()})`);
    if (!success) return;

    setIsRolling(true);
    setLastResult(null);

    let rolls = 0;
    const interval = setInterval(() => {
      setDice1(Math.floor(1 + Math.random() * 6));
      setDice2(Math.floor(1 + Math.random() * 6));
      rolls++;
      if (rolls > 14) {
        clearInterval(interval);
        finalizeRoll();
      }
    }, 70);
  };

  const finalizeRoll = () => {
    const final1 = Math.floor(1 + Math.random() * 6);
    const final2 = Math.floor(1 + Math.random() * 6);
    setDice1(final1);
    setDice2(final2);
    setIsRolling(false);

    const sum = final1 + final2;
    let won = false;
    let multiplier = 2.0;

    if (selectedPrediction === 'under' && sum < 7) {
      won = true;
    } else if (selectedPrediction === 'over' && sum > 7) {
      won = true;
    } else if (selectedPrediction === 'exact' && sum === 7) {
      won = true;
      multiplier = 5.8;
    }

    setHistory((prev) => [sum, ...prev.slice(0, 10)]);

    if (won) {
      const winAmount = Math.round(betAmount * multiplier);
      creditGameWin(winAmount, 'Lucky Dice Roll', `${multiplier}x`);
      setLastResult({ won: true, sum, amount: winAmount });
    } else {
      setLastResult({ won: false, sum, amount: 0 });
      showError(`कुल योग ${sum} आया। अगली बार बेहतर किस्मत!`, 'पासा परिणाम');
    }
  };

  // High quality 3D SVG Dice Render
  const render3DDice = (value, isSecond = false) => {
    const dotsMap = {
      1: [[50, 50]],
      2: [[30, 30], [70, 70]],
      3: [[30, 30], [50, 50], [70, 70]],
      4: [[30, 30], [70, 30], [30, 70], [70, 70]],
      5: [[30, 30], [70, 30], [50, 50], [30, 70], [70, 70]],
      6: [[30, 25], [70, 25], [30, 50], [70, 50], [30, 75], [70, 75]]
    };

    const dots = dotsMap[value] || [[50, 50]];

    return (
      <div className={`relative w-24 h-24 sm:w-28 sm:h-28 transition-transform duration-200 ${isRolling ? 'animate-bounce' : ''}`}>
        <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 100 100">
          <defs>
            <linearGradient id={isSecond ? 'diceGrad2' : 'diceGrad1'} x1="0" y1="0" x2="100" y2="100">
              <stop stopColor="#ffffff" />
              <stop offset="0.7" stopColor="#f1f5f9" />
              <stop offset="1" stopColor="#e2e8f0" />
            </linearGradient>
            <filter id="diceShadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="2" dy="5" stdDeviation="4" floodOpacity="0.35" />
            </filter>
          </defs>
          {/* Dice Body with Rounded Bevels */}
          <rect x="8" y="8" width="84" height="84" rx="20" fill={`url(#${isSecond ? 'diceGrad2' : 'diceGrad1'})`} stroke="#cbd5e1" strokeWidth="2.5" filter="url(#diceShadow)" />
          {/* Dice Pips / Dots */}
          {dots.map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={value === 1 ? 9 : 6.5} fill={isSecond ? '#dc2626' : '#4f46e5'} />
          ))}
        </svg>
      </div>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-2xl mx-auto">
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

      {/* 🌟 Realistic Casino Felt Table Arena */}
      <div className="game-card card-glow-purple space-y-5 bg-white p-5 sm:p-7 shadow-xl text-center">
        <div>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-black uppercase mb-1">
            <Dices className="w-3.5 h-3.5" /> 7 Up / 7 Down / Exact 7
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            🎲 Lucky 7 Dice Roll (लकी पासा)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            दोनों पासों का योग 7 से कम, 7 से ज्यादा या ठीक 7 का अनुमान लगाएं!
          </p>
        </div>

        {/* Casino Table Stage with 3D Dice */}
        <div className="py-8 px-4 bg-gradient-to-b from-emerald-800 via-teal-900 to-emerald-950 rounded-3xl border-4 border-amber-400 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
          
          <div className="relative z-10 flex items-center justify-center gap-6 sm:gap-10">
            {render3DDice(dice1, false)}
            <div className="text-3xl sm:text-4xl font-black text-amber-300 drop-shadow">+</div>
            {render3DDice(dice2, true)}
          </div>

          <div className="mt-4 px-4 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-amber-300/40 text-amber-300 font-mono text-sm sm:text-base font-black">
            योग: <span className="text-white text-lg sm:text-xl font-extrabold">{dice1 + dice2}</span>
          </div>
        </div>

        {/* Result alert */}
        {lastResult && (
          <div
            className={`p-3 rounded-2xl border text-xs sm:text-sm font-black animate-in zoom-in-95 ${
              lastResult.won
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}
          >
            {lastResult.won
              ? `🎉 बधाई हो! कुल योग ${lastResult.sum} आया और आपने ₹${lastResult.amount} जीत लिए!`
              : `ओह! कुल योग ${lastResult.sum} आया।`}
          </div>
        )}

        {/* Prediction Selector (3 Large Betting Zones) */}
        <div className="space-y-2 text-left">
          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
            शर्त का चयन करें (Select Outcome):
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => setSelectedPrediction('under')}
              className={`p-3.5 sm:p-4 rounded-2xl border-2 text-center transition-all ${
                selectedPrediction === 'under'
                  ? 'bg-gradient-to-tr from-indigo-600 to-indigo-700 text-white border-indigo-400 shadow-xl scale-105 ring-4 ring-indigo-200'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <div className="text-xs sm:text-sm font-black">7 से कम (2-6)</div>
              <div className="text-[11px] font-bold opacity-90">2.0x पेआउट</div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedPrediction('exact')}
              className={`p-3.5 sm:p-4 rounded-2xl border-2 text-center transition-all ${
                selectedPrediction === 'exact'
                  ? 'bg-gradient-to-tr from-amber-400 to-yellow-500 text-slate-950 border-amber-300 shadow-xl scale-105 ring-4 ring-amber-200'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200'
              }`}
            >
              <div className="text-xs sm:text-sm font-black">ठीक 7 (Exact 7)</div>
              <div className="text-[11px] font-black text-amber-950">⚡ 5.8x बंपर</div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedPrediction('over')}
              className={`p-3.5 sm:p-4 rounded-2xl border-2 text-center transition-all ${
                selectedPrediction === 'over'
                  ? 'bg-gradient-to-tr from-purple-600 to-purple-700 text-white border-purple-400 shadow-xl scale-105 ring-4 ring-purple-200'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <div className="text-xs sm:text-sm font-black">7 से ज्यादा (8-12)</div>
              <div className="text-[11px] font-bold opacity-90">2.0x पेआउट</div>
            </button>
          </div>
        </div>

        {/* Bet Chips */}
        <div className="space-y-1.5 text-left">
          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
            शर्त राशि चुनें:
          </label>
          <div className="grid grid-cols-5 gap-1.5">
            {[10, 20, 50, 100, 500].map((amt) => (
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

        {/* Roll Action Button */}
        <button
          onClick={handleRollDice}
          disabled={isRolling || totalBalance < betAmount}
          className="w-full btn-primary py-3.5 sm:py-4 text-sm sm:text-base font-black shadow-xl cursor-pointer disabled:opacity-50"
        >
          <Dices className={`w-5 h-5 ${isRolling ? 'animate-spin' : ''}`} />
          <span>{isRolling ? 'पासा घूम रहा है...' : `₹${betAmount} से पासा रोल करें (Roll Dice)`}</span>
        </button>
      </div>

      {/* History Ribbon */}
      <div className="game-card p-4 bg-white flex items-center justify-between gap-2">
        <span className="text-xs font-black text-slate-700 flex items-center gap-1">
          <History className="w-4 h-4 text-indigo-600" />
          हाल के रोल परिणाम:
        </span>
        <div className="flex gap-1.5 overflow-x-auto">
          {history.map((s, idx) => (
            <span
              key={idx}
              className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-black text-xs ${
                s === 7
                  ? 'bg-amber-400 text-slate-950 border border-amber-500'
                  : s > 7
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-indigo-100 text-indigo-800'
              }`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

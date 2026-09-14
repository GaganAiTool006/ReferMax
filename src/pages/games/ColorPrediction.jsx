import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Sparkles, History, Trophy, ShieldCheck, Flame, Zap, Volume2, VolumeX } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import { useToast } from '../../context/ToastContext';

const COLORS = [
  { 
    id: 'green', 
    label: 'GREEN (हरा)', 
    sub: '1, 3, 7, 9', 
    mult: 2.0, 
    bgGradient: 'from-emerald-500 via-green-600 to-emerald-700',
    border: 'border-emerald-400',
    shadow: 'shadow-emerald-500/40',
    textColor: 'text-emerald-950'
  },
  { 
    id: 'violet', 
    label: 'VIOLET (बैंगनी)', 
    sub: '0, 5', 
    mult: 4.5, 
    bgGradient: 'from-purple-500 via-violet-600 to-purple-800',
    border: 'border-purple-400',
    shadow: 'shadow-purple-500/40',
    textColor: 'text-purple-950'
  },
  { 
    id: 'red', 
    label: 'RED (लाल)', 
    sub: '2, 4, 6, 8', 
    mult: 2.0, 
    bgGradient: 'from-rose-500 via-red-600 to-rose-700',
    border: 'border-rose-400',
    shadow: 'shadow-rose-500/40',
    textColor: 'text-rose-950'
  }
];

const CHIP_DENOMINATIONS = [
  { value: 10, color: 'from-blue-500 to-indigo-600', ring: 'ring-blue-300' },
  { value: 50, color: 'from-emerald-500 to-teal-600', ring: 'ring-emerald-300' },
  { value: 100, color: 'from-purple-500 to-violet-600', ring: 'ring-purple-300' },
  { value: 500, color: 'from-amber-500 to-yellow-600', ring: 'ring-amber-300' },
  { value: 1000, color: 'from-rose-500 to-red-600', ring: 'ring-rose-300' }
];

export default function ColorPrediction() {
  const { totalBalance, placeBet, creditGameWin } = useWallet();
  const { showInfo, showError } = useToast();

  const [roundId, setRoundId] = useState(2026082901);
  const [timeLeft, setTimeLeft] = useState(25);
  const [betAmount, setBetAmount] = useState(50);
  const [activeBets, setActiveBets] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Parity Records History
  const [history, setHistory] = useState([
    { round: 2026082900, resultColor: 'green', resultNumber: 7 },
    { round: 2026082899, resultColor: 'red', resultNumber: 2 },
    { round: 2026082898, resultColor: 'green', resultNumber: 3 },
    { round: 2026082897, resultColor: 'violet', resultNumber: 5 },
    { round: 2026082896, resultColor: 'red', resultNumber: 8 },
    { round: 2026082895, resultColor: 'green', resultNumber: 1 },
    { round: 2026082894, resultColor: 'violet', resultNumber: 0 }
  ]);

  const [lastWinResult, setLastWinResult] = useState(null);

  // 30-sec round countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          resolveRound();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [activeBets, roundId]);

  const resolveRound = () => {
    const resultNum = Math.floor(Math.random() * 10);
    let resultColor = 'green';
    if (resultNum === 0 || resultNum === 5) {
      resultColor = 'violet';
    } else if (resultNum % 2 === 0) {
      resultColor = 'red';
    } else {
      resultColor = 'green';
    }

    const currentBets = [...activeBets];
    let totalWon = 0;

    currentBets.forEach((bet) => {
      if (bet.choice === resultColor) {
        const mult = resultColor === 'violet' ? 4.5 : 2.0;
        totalWon += bet.amount * mult;
      } else if (bet.choice === resultNum) {
        totalWon += bet.amount * 9.0;
      }
    });

    if (totalWon > 0) {
      creditGameWin(totalWon, 'Color Prediction', `${resultColor.toUpperCase()}`);
      setLastWinResult({ won: true, amount: totalWon, color: resultColor, num: resultNum });
    } else if (currentBets.length > 0) {
      setLastWinResult({ won: false, amount: 0, color: resultColor, num: resultNum });
    }

    setHistory((prev) => [
      { round: roundId, resultColor, resultNumber: resultNum },
      ...prev.slice(0, 14)
    ]);

    setRoundId((r) => r + 1);
    setActiveBets([]);
  };

  const handlePlaceBet = (choice, mult) => {
    if (timeLeft <= 5) {
      showError('राउंड समाप्त हो रहा है! अगले राउंड का इंतजार करें।', 'बेटिंग बंद');
      return;
    }
    const success = placeBet(betAmount, `Color Prediction (${choice})`);
    if (success) {
      setActiveBets((prev) => [...prev, { choice, amount: betAmount, mult }]);
      showInfo(`₹${betAmount} की शर्त (${String(choice).toUpperCase()}) पर लगाई गई!`);
    }
  };

  // Calculate SVG circular progress dash
  const strokeDash = ((30 - timeLeft) / 30) * 283;

  return (
    <div className="space-y-4 sm:space-y-6 max-w-3xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link to="/games" className="btn-outline py-1 px-3 text-xs flex items-center gap-1.5 min-h-0">
          <ArrowLeft className="w-4 h-4" /> गेम्स हब
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-indigo-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>
          <div className="flex items-center gap-1 text-xs">
            <span className="text-slate-500 font-medium">वॉलेट:</span>
            <strong className="text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl font-black">
              ₹{totalBalance.toFixed(2)}
            </strong>
          </div>
        </div>
      </div>

      {/* 🌟 ULTRA-REALISTIC CASINO ARENA CARD */}
      <div className="game-card card-glow-purple space-y-5 bg-white p-4 sm:p-7 shadow-xl">
        
        {/* Round Bar & Live 3D Circular Timer */}
        <div className="p-4 bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-950 text-white rounded-3xl shadow-xl flex items-center justify-between relative overflow-hidden">
          <div className="space-y-1">
            <span className="text-[11px] text-indigo-200 font-bold block uppercase tracking-wider">
              🎮 लाइव पैरिटी राउंड
            </span>
            <div className="text-lg sm:text-2xl font-black font-mono tracking-wider text-amber-300">
              #{roundId}
            </div>
            <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              {timeLeft <= 5 ? 'गणना जारी है...' : 'बेटिंग खुली है'}
            </div>
          </div>

          {/* SVG Circular Progress Countdown */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#334155"
                strokeWidth="7"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={timeLeft <= 5 ? '#f43f5e' : '#fbbf24'}
                strokeWidth="7"
                strokeDasharray="283"
                strokeDashoffset={strokeDash}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className={`text-xl sm:text-2xl font-black font-mono tracking-tighter ${timeLeft <= 5 ? 'text-rose-400 animate-pulse' : 'text-amber-300'}`}>
                00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
              </span>
            </div>
          </div>
        </div>

        {/* Win Celebration Banner */}
        {lastWinResult && (
          <div
            className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-black flex items-center justify-between shadow-md animate-in zoom-in-95 ${
              lastWinResult.won
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500 animate-spin" />
              <span>
                पिछला परिणाम:{' '}
                <strong className="uppercase underline text-indigo-700">
                  {lastWinResult.color} (नंबर {lastWinResult.num})
                </strong>
              </span>
            </div>
            {lastWinResult.won ? (
              <span className="text-emerald-700 text-sm sm:text-base font-black">
                +₹{lastWinResult.amount.toFixed(2)} जीत! 🎉
              </span>
            ) : (
              <span className="text-slate-500">अगले राउंड में प्रयास करें</span>
            )}
          </div>
        )}

        {/* 🌟 3D Casino Chip Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
            शर्त चिप चुनें (Select Betting Chip):
          </label>
          <div className="flex items-center justify-between gap-1.5 sm:gap-3 overflow-x-auto pb-1">
            {CHIP_DENOMINATIONS.map((chip) => {
              const isSelected = betAmount === chip.value;
              return (
                <button
                  key={chip.value}
                  type="button"
                  onClick={() => setBetAmount(chip.value)}
                  className={`flex-1 min-w-[56px] py-2 sm:py-3 rounded-2xl border-2 flex flex-col items-center justify-center transition-all duration-200 ${
                    isSelected
                      ? `bg-gradient-to-tr ${chip.color} text-white border-white shadow-lg scale-105 ring-4 ${chip.ring}`
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <span className="text-[10px] opacity-80 uppercase font-bold">चिप</span>
                  <span className="text-xs sm:text-sm font-black">₹{chip.value}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 🌟 3 Big Color Prediction Pucks (Green, Violet, Red) */}
        <div className="space-y-2">
          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
            रंग चुनें और शर्त लगाएं (2x से 4.5x पेआउट):
          </label>
          <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
            {COLORS.map((col) => (
              <button
                key={col.id}
                type="button"
                disabled={timeLeft <= 5}
                onClick={() => handlePlaceBet(col.id, col.mult)}
                className={`group relative overflow-hidden bg-gradient-to-tr ${col.bgGradient} border-2 ${col.border} text-white font-black py-4 sm:py-6 px-2 rounded-3xl shadow-lg flex flex-col items-center justify-center gap-1 transition-all transform active:scale-95 hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                <span className="text-xs sm:text-base tracking-wide drop-shadow-md">{col.label}</span>
                <span className="text-[10px] sm:text-xs bg-black/30 px-2.5 py-0.5 rounded-full font-bold">
                  {col.mult}x पेआउट
                </span>
                <span className="text-[9px] text-white/80 font-mono mt-0.5">({col.sub})</span>
              </button>
            ))}
          </div>
        </div>

        {/* 🌟 10 Numbers (0-9 with 9x Payout) */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-xs font-black text-slate-700 uppercase tracking-wider">
            <span>नंबर चुनें (0 - 9)</span>
            <span className="text-amber-600 font-extrabold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
              ⚡ 9.0x जैकपॉट
            </span>
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
              const isViolet = num === 0 || num === 5;
              const isRed = !isViolet && num % 2 === 0;
              return (
                <button
                  key={num}
                  type="button"
                  disabled={timeLeft <= 5}
                  onClick={() => handlePlaceBet(num, 9.0)}
                  className={`py-3 sm:py-3.5 rounded-2xl font-black text-sm sm:text-base border-2 shadow-sm transition-all active:scale-95 disabled:opacity-40 ${
                    isViolet
                      ? 'bg-purple-600 text-white border-purple-400 hover:bg-purple-700'
                      : isRed
                      ? 'bg-rose-600 text-white border-rose-400 hover:bg-rose-700'
                      : 'bg-emerald-600 text-white border-emerald-400 hover:bg-emerald-700'
                  }`}
                >
                  {num}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Bets Display */}
        {activeBets.length > 0 && (
          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-2xl space-y-1.5 text-xs">
            <span className="text-indigo-900 font-bold block">इस राउंड की आपकी सक्रिय शर्तें:</span>
            <div className="flex flex-wrap gap-2">
              {activeBets.map((b, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-white text-indigo-900 font-black border border-indigo-300 shadow-sm"
                >
                  {String(b.choice).toUpperCase()}: ₹{b.amount} ({b.mult}x)
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 🌟 REAL-TIME PARITY GRAPH / TREND RECORDS */}
      <div className="game-card space-y-3 bg-white p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
            <History className="w-4 h-4 text-indigo-600" />
            हाल के पैरिटी ट्रेंड्स (Live Parity History)
          </h3>
          <span className="text-[11px] text-slate-500 font-bold">100% पारदर्शी RNG</span>
        </div>

        {/* Trend Ribbon Dots */}
        <div className="flex items-center gap-2 overflow-x-auto p-2 bg-slate-50 rounded-2xl border border-slate-200">
          {history.map((h, i) => (
            <div
              key={i}
              className={`w-9 h-9 rounded-xl flex flex-col items-center justify-center flex-shrink-0 text-white font-black text-xs shadow-sm ${
                h.resultColor === 'green'
                  ? 'bg-emerald-600'
                  : h.resultColor === 'red'
                  ? 'bg-rose-600'
                  : 'bg-purple-600'
              }`}
            >
              <span>{h.resultNumber}</span>
              <span className="text-[8px] uppercase opacity-90">{h.resultColor[0]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

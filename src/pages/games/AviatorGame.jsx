import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Rocket, DollarSign, Flame, Sparkles, TrendingUp, History } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import { useToast } from '../../context/ToastContext';

export default function AviatorGame() {
  const { totalBalance, placeBet, creditGameWin } = useWallet();
  const { showSuccess, showError } = useToast();

  const [betAmount, setBetAmount] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [multiplier, setMultiplier] = useState(1.0);
  const [hasCrashed, setHasCrashed] = useState(false);
  const [hasCashedOut, setHasCashedOut] = useState(false);
  const [flightHistory, setFlightHistory] = useState([2.14, 1.45, 4.89, 1.12, 3.20, 8.50]);

  const crashPointRef = useRef(2.5);

  const handleLaunch = () => {
    const success = placeBet(betAmount, 'Aviator Crash Game');
    if (!success) return;

    const randCrash = parseFloat((1.2 + Math.random() * 5.5).toFixed(2));
    crashPointRef.current = randCrash;

    setMultiplier(1.0);
    setHasCrashed(false);
    setHasCashedOut(false);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (!isPlaying || hasCrashed || hasCashedOut) return;

    const interval = setInterval(() => {
      setMultiplier((prev) => {
        const next = parseFloat((prev + 0.05).toFixed(2));
        if (next >= crashPointRef.current) {
          setHasCrashed(true);
          setIsPlaying(false);
          setFlightHistory((h) => [crashPointRef.current, ...h.slice(0, 7)]);
          showError(`रॉकेट ${crashPointRef.current}x पर उड़ गया (Crashed)!`, '🚀 क्रैश हुआ!');
          clearInterval(interval);
          return crashPointRef.current;
        }
        return next;
      });
    }, 90);

    return () => clearInterval(interval);
  }, [isPlaying, hasCrashed, hasCashedOut]);

  const handleCashout = () => {
    if (!isPlaying || hasCrashed || hasCashedOut) return;

    const winAmount = Math.round(betAmount * multiplier);
    creditGameWin(winAmount, 'Aviator Rocket', `${multiplier}x`);
    setHasCashedOut(true);
    setIsPlaying(false);
    setFlightHistory((h) => [multiplier, ...h.slice(0, 7)]);
  };

  const potentialWin = Math.round(betAmount * multiplier);

  // Calculate SVG curve coordinates for flight trail
  const progressRatio = Math.min(1, (multiplier - 1.0) / (crashPointRef.current || 3.0));
  const rocketX = 50 + progressRatio * 280;
  const rocketY = 180 - progressRatio * 130;

  return (
    <div className="space-y-4 sm:space-y-6 max-w-2xl mx-auto">
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

      {/* 🌟 Realistic Aviator Radar Arena */}
      <div className="game-card card-glow-purple space-y-4 bg-white p-5 sm:p-7 shadow-2xl text-center">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-indigo-700 flex items-center gap-1.5">
            <Rocket className="w-4 h-4 text-rose-500" /> Aviator Rocket Crash
          </span>
          <span className="text-xs text-slate-500 font-bold">क्रैश होने से पहले निकालें</span>
        </div>

        {/* Dynamic Flight Radar Screen */}
        <div className="h-64 sm:h-72 w-full bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 rounded-3xl border-4 border-slate-800 relative overflow-hidden flex flex-col justify-between p-4 shadow-2xl">
          {/* Radar Grid Lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#4338ca_1px,transparent_1px)] [background-size:20px_20px] opacity-25"></div>

          {/* SVG Flight Trail */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 220">
            <path
              d={`M 40 190 Q ${rocketX * 0.7} 180 ${rocketX} ${rocketY}`}
              fill="none"
              stroke={hasCrashed ? '#f43f5e' : '#ef4444'}
              strokeWidth="4"
              strokeDasharray={hasCrashed ? '4 2' : 'none'}
            />
            {/* Fill gradient below curve */}
            <path
              d={`M 40 190 Q ${rocketX * 0.7} 180 ${rocketX} ${rocketY} L ${rocketX} 190 Z`}
              fill="rgba(239, 68, 68, 0.15)"
            />
          </svg>

          {/* Flying Rocket Object */}
          {isPlaying && (
            <div
              className="absolute transition-all duration-100 flex items-center gap-1 text-rose-500"
              style={{ left: `${(rocketX / 400) * 85}%`, top: `${(rocketY / 220) * 75}%` }}
            >
              <Rocket className="w-10 h-10 sm:w-12 sm:h-12 text-rose-500 animate-pulse transform -rotate-45 drop-shadow-[0_0_12px_rgba(244,63,94,0.8)]" />
              <Flame className="w-5 h-5 text-amber-400 animate-bounce -ml-2" />
            </div>
          )}

          {/* Center Multiplier Counter */}
          <div className="relative z-10 my-auto space-y-1">
            <div
              className={`text-5xl sm:text-7xl font-black font-mono tracking-tighter drop-shadow-2xl ${
                hasCrashed
                  ? 'text-rose-500 line-through'
                  : hasCashedOut
                  ? 'text-emerald-400'
                  : 'text-white animate-pulse'
              }`}
            >
              {multiplier.toFixed(2)}x
            </div>
            {hasCrashed && (
              <span className="text-xs sm:text-sm text-rose-400 font-black uppercase tracking-widest block animate-bounce">
                🚀 FLEW AWAY (क्रैश हो गया)
              </span>
            )}
            {hasCashedOut && (
              <span className="text-xs sm:text-sm text-emerald-400 font-black uppercase tracking-widest block animate-bounce">
                🎉 कैशआउट सफल (+₹{potentialWin})
              </span>
            )}
          </div>

          {/* Bottom Live History */}
          <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-2 font-mono">
            <span>RNG 100% Verified</span>
            <span className="text-amber-400 font-bold">MAX 100X</span>
          </div>
        </div>

        {/* Controls */}
        {!isPlaying ? (
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between text-left">
              <span className="text-xs font-black text-slate-700">बेट राशि चुनें:</span>
              <div className="flex gap-1.5">
                {[20, 50, 100, 200, 500].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setBetAmount(amt)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                      betAmount === amt ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleLaunch}
              disabled={totalBalance < betAmount}
              className="w-full btn-primary py-3.5 sm:py-4 text-sm sm:text-base font-black shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <Rocket className="w-5 h-5" />
              <span>₹{betAmount} से उड़ान भरें (Launch Rocket)</span>
            </button>
          </div>
        ) : (
          <button
            onClick={handleCashout}
            className="w-full btn-gold py-4 px-4 rounded-2xl shadow-2xl flex items-center justify-center gap-2 text-base sm:text-lg font-black animate-bounce cursor-pointer"
          >
            <DollarSign className="w-6 h-6" />
            <span>₹{potentialWin} निकालें (Cashout Multiplier)</span>
          </button>
        )}
      </div>

      {/* Flight History Ribbon */}
      <div className="game-card p-4 bg-white flex items-center justify-between gap-2">
        <span className="text-xs font-black text-slate-700 flex items-center gap-1">
          <History className="w-4 h-4 text-indigo-600" />
          पिछली उड़ानें:
        </span>
        <div className="flex gap-1.5 overflow-x-auto">
          {flightHistory.map((mult, idx) => (
            <span
              key={idx}
              className={`px-2.5 py-1 rounded-xl font-mono font-black text-xs ${
                mult >= 2.0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}
            >
              {mult.toFixed(2)}x
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

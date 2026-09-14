import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Trophy, RotateCw, Flame } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import { useToast } from '../../context/ToastContext';

const PRIZES = [
  { label: '₹10', amount: 10, color: '#f59e0b', textDark: true },
  { label: '₹50', amount: 50, color: '#8b5cf6', textDark: false },
  { label: '₹25', amount: 25, color: '#10b981', textDark: false },
  { label: '₹100', amount: 100, color: '#ec4899', textDark: false },
  { label: '₹5', amount: 5, color: '#64748b', textDark: false },
  { label: '₹500', amount: 500, color: '#eab308', textDark: true },
  { label: '₹20', amount: 20, color: '#06b6d4', textDark: false },
  { label: '₹1000', amount: 1000, color: '#ef4444', textDark: false }
];

export default function LuckyWheel() {
  const { totalBalance, placeBet, creditGameWin } = useWallet();
  const { showSuccess, showError } = useToast();

  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [lastWon, setLastWon] = useState(null);
  const spinCost = 20;

  const handleSpin = () => {
    if (isSpinning) return;

    const betSuccess = placeBet(spinCost, 'Lucky Wheel Spin');
    if (!betSuccess) return;

    setIsSpinning(true);
    setLastWon(null);

    const randomIndex = Math.floor(Math.random() * PRIZES.length);
    const sliceAngle = 360 / PRIZES.length;
    const extraRounds = 5 * 360;
    const targetAngle = extraRounds + (360 - randomIndex * sliceAngle - sliceAngle / 2);

    const newRotation = rotation + targetAngle;
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const wonPrize = PRIZES[randomIndex];
      setLastWon(wonPrize);
      creditGameWin(wonPrize.amount, 'Lucky Wheel Spin', 'Lucky Spin');
    }, 4000);
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

      {/* 🌟 Realistic Casino Wheel Arena */}
      <div className="game-card card-glow-gold text-center space-y-5 bg-white p-5 sm:p-7 shadow-2xl">
        <div>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-black uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5" /> 100% विनिंग व्हील
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            🎡 Lucky Wheel (लकी स्पिन)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            स्पिन कॉस्ट: <strong className="text-amber-600">₹{spinCost}</strong> | अधिकतम जैकपॉट:{' '}
            <strong className="text-emerald-600">₹1,000</strong>
          </p>
        </div>

        {/* Casino Wheel Frame with Gold Rim */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto my-2 flex items-center justify-center p-3 bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 rounded-full shadow-2xl">
          {/* Top Indicator Needle with 3D drop shadow */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[28px] border-t-amber-600 filter drop-shadow-xl"></div>

          {/* Wheel Graphic */}
          <div
            className="w-full h-full rounded-full border-4 border-slate-900 shadow-inner relative overflow-hidden transition-transform duration-[4000ms] cubic-bezier(0.15, 0.9, 0.2, 1)"
            style={{
              transform: `rotate(${rotation}deg)`,
              background: 'conic-gradient(#f59e0b 0deg 45deg, #8b5cf6 45deg 90deg, #10b981 90deg 135deg, #ec4899 135deg 180deg, #64748b 180deg 225deg, #eab308 225deg 270deg, #06b6d4 270deg 315deg, #ef4444 315deg 360deg)'
            }}
          >
            {PRIZES.map((prize, idx) => {
              const angle = idx * 45 + 22.5;
              return (
                <div
                  key={idx}
                  className="absolute top-0 left-1/2 w-10 h-1/2 -ml-5 origin-bottom flex items-start justify-center pt-3 sm:pt-4"
                  style={{ transform: `rotate(${angle}deg)` }}
                >
                  <span
                    className={`font-black text-xs sm:text-base drop-shadow-md ${
                      prize.textDark ? 'text-slate-950' : 'text-white'
                    }`}
                  >
                    {prize.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Center Gold Pin */}
          <div className="absolute z-20 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-200 border-4 border-white shadow-2xl flex items-center justify-center">
            <Trophy className="w-6 h-6 sm:w-7 sm:h-7 text-amber-900 animate-pulse" />
          </div>
        </div>

        {lastWon && (
          <div className="p-3.5 bg-emerald-50 border-2 border-emerald-400 rounded-2xl text-center text-sm sm:text-base font-black text-emerald-900 animate-bounce shadow-md">
            🎉 बधाई हो! आपने व्हील से <span className="text-amber-600 text-lg">{lastWon.label}</span> जीत लिए!
          </div>
        )}

        <button
          onClick={handleSpin}
          disabled={isSpinning || totalBalance < spinCost}
          className="w-full max-w-sm mx-auto btn-gold py-3.5 sm:py-4 text-sm sm:text-base font-black shadow-xl cursor-pointer disabled:opacity-50"
        >
          <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
          <span>{isSpinning ? 'पहिया घूम रहा है...' : `₹${spinCost} में स्पिन करें (Spin Wheel)`}</span>
        </button>
      </div>
    </div>
  );
}

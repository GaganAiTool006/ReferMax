import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Ticket, Trophy, Gift, Check, ShieldCheck } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import { useToast } from '../../context/ToastContext';

const CARD_PRIZES = [10, 20, 25, 50, 100, 250, 500];

export default function ScratchCard() {
  const { totalBalance, placeBet, creditGameWin } = useWallet();
  const { showSuccess, showError } = useToast();

  const cardPrice = 20;
  const [hasCard, setHasCard] = useState(false);
  const [boxes, setBoxes] = useState(Array(9).fill({ revealed: false, value: 0 }));
  const [isCompleted, setIsCompleted] = useState(false);
  const [wonAmount, setWonAmount] = useState(0);

  const handleBuyCard = () => {
    const success = placeBet(cardPrice, 'Scratch Card Ticket');
    if (!success) return;

    const isWinner = Math.random() > 0.35;
    const targetPrize = isWinner
      ? CARD_PRIZES[Math.floor(Math.random() * (CARD_PRIZES.length - 2))]
      : 0;

    let items = [];
    if (isWinner && targetPrize > 0) {
      items = [targetPrize, targetPrize, targetPrize];
      while (items.length < 9) {
        const rand = CARD_PRIZES[Math.floor(Math.random() * CARD_PRIZES.length)];
        if (rand !== targetPrize) items.push(rand);
        else items.push(10);
      }
      items.sort(() => Math.random() - 0.5);
    } else {
      items = [10, 20, 50, 100, 25, 500, 10, 50, 250].sort(() => Math.random() - 0.5);
    }

    setBoxes(items.map((val) => ({ revealed: false, value: val })));
    setHasCard(true);
    setIsCompleted(false);
    setWonAmount(0);
  };

  const handleRevealBox = (idx) => {
    if (!hasCard || boxes[idx].revealed || isCompleted) return;

    const newBoxes = boxes.map((b, i) => (i === idx ? { ...b, revealed: true } : b));
    setBoxes(newBoxes);

    const revealedCount = newBoxes.filter((b) => b.revealed).length;
    if (revealedCount === 9) {
      finalizeCard(newBoxes);
    }
  };

  const handleScratchAll = () => {
    if (!hasCard || isCompleted) return;
    const revealedAll = boxes.map((b) => ({ ...b, revealed: true }));
    setBoxes(revealedAll);
    finalizeCard(revealedAll);
  };

  const finalizeCard = (currentBoxes) => {
    setIsCompleted(true);
    const counts = {};
    currentBoxes.forEach((b) => {
      counts[b.value] = (counts[b.value] || 0) + 1;
    });

    let maxWin = 0;
    Object.keys(counts).forEach((val) => {
      if (counts[val] >= 3) {
        maxWin = Math.max(maxWin, Number(val));
      }
    });

    if (maxWin > 0) {
      setWonAmount(maxWin);
      creditGameWin(maxWin, 'Scratch Card', 'Match 3');
    } else {
      showError('3 मैचिंग संख्याएं नहीं मिलीं। अगली बार प्रयास करें!', 'स्क्रैच कार्ड');
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

      {/* 🌟 Realistic Scratch Ticket Arena */}
      <div className="game-card card-glow-green space-y-5 bg-white p-5 sm:p-7 text-center shadow-xl">
        <div>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black uppercase mb-1">
            <Ticket className="w-3.5 h-3.5" /> 3 मैचिंग संख्या = जीत
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            🎟️ Scratch & Win (लकी स्क्रैच कार्ड)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            कार्ड खरीदें और 9 बॉक्स स्क्रैच करें। 3 मैचिंग संख्या मिलने पर जीतें ₹500 तक!
          </p>
        </div>

        {hasCard ? (
          <div className="space-y-4">
            {/* Scratch Ticket Cabinet with Metallic Foil */}
            <div className="p-4 sm:p-6 bg-gradient-to-tr from-amber-200 via-yellow-100 to-amber-300 rounded-3xl border-4 border-amber-400 shadow-2xl space-y-3">
              <div className="flex items-center justify-between text-xs font-black text-amber-950 px-2">
                <span>★ WINZO GOLDEN TICKET ★</span>
                <span className="text-emerald-800">JACKPOT: ₹500</span>
              </div>

              {/* 3x3 Grid with Metallic Scratch Foil */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 p-3 bg-amber-950/20 rounded-2xl border-2 border-dashed border-amber-400">
                {boxes.map((box, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleRevealBox(idx)}
                    disabled={box.revealed}
                    className={`aspect-square rounded-2xl flex items-center justify-center font-black transition-all transform active:scale-95 ${
                      !box.revealed
                        ? 'bg-gradient-to-br from-slate-300 via-slate-200 to-slate-400 border-2 border-slate-300 text-slate-700 shadow-md hover:scale-105 cursor-pointer'
                        : 'bg-white border-2 border-amber-400 text-amber-900 shadow-inner scale-95'
                    }`}
                  >
                    {!box.revealed ? (
                      <span className="flex flex-col items-center gap-1">
                        <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
                        <span className="text-[10px] font-black uppercase text-slate-700">स्क्रैच</span>
                      </span>
                    ) : (
                      <span className="text-base sm:text-xl font-black text-indigo-900">₹{box.value}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Controls */}
            {!isCompleted ? (
              <button
                onClick={handleScratchAll}
                className="btn-outline w-full py-3 text-xs sm:text-sm font-black text-indigo-700 border-indigo-200 hover:bg-indigo-50 shadow-sm"
              >
                <span>सब एक साथ स्क्रैच करें (Scratch All)</span>
              </button>
            ) : (
              <div className="space-y-3">
                {wonAmount > 0 ? (
                  <div className="p-4 bg-emerald-50 border-2 border-emerald-400 rounded-2xl text-emerald-900 font-black text-base sm:text-lg animate-bounce shadow-md">
                    🎉 बधाई हो! आपने 3x मैच करके ₹{wonAmount} जीत लिए!
                  </div>
                ) : (
                  <div className="p-3 bg-slate-100 rounded-2xl text-slate-700 font-bold text-xs">
                    कार्ड पूरा हुआ। 3 मैच नहीं मिले।
                  </div>
                )}

                <button
                  onClick={handleBuyCard}
                  disabled={totalBalance < cardPrice}
                  className="w-full btn-gold py-3.5 sm:py-4 text-sm sm:text-base font-black shadow-xl"
                >
                  ₹{cardPrice} में नया स्क्रैच कार्ड खरीदें
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Buy Ticket Stage */
          <div className="py-10 px-4 bg-gradient-to-b from-slate-50 to-amber-50/50 rounded-3xl border-2 border-dashed border-amber-300 space-y-4">
            <Ticket className="w-16 h-16 text-amber-500 mx-auto animate-pulse" />
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                नया स्क्रैच कार्ड तैयार है
              </h3>
              <p className="text-xs text-slate-500">
                कार्ड की कीमत मात्र <strong>₹{cardPrice}</strong> है। अधिकतम जैकपॉट: <strong>₹500</strong>
              </p>
            </div>

            <button
              onClick={handleBuyCard}
              disabled={totalBalance < cardPrice}
              className="btn-gold py-3.5 px-8 text-sm sm:text-base font-black shadow-xl cursor-pointer disabled:opacity-50"
            >
              ₹{cardPrice} में कार्ड खरीदें & स्क्रैच करें
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

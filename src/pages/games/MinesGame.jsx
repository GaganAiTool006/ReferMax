import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Gem, Bomb, DollarSign, Sparkles, ShieldCheck } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import { useToast } from '../../context/ToastContext';

export default function MinesGame() {
  const { totalBalance, placeBet, creditGameWin } = useWallet();
  const { showSuccess, showError } = useToast();

  const [betAmount, setBetAmount] = useState(50);
  const [mineCount, setMineCount] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [grid, setGrid] = useState(Array(25).fill({ revealed: false, isMine: false }));
  const [multiplier, setMultiplier] = useState(1.0);
  const [gameOver, setGameOver] = useState(false);

  const handleStartGame = () => {
    const success = placeBet(betAmount, `Cash Mines (${mineCount} Mines)`);
    if (!success) return;

    const newGrid = Array(25).fill(null).map(() => ({ revealed: false, isMine: false }));
    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
      const randIdx = Math.floor(Math.random() * 25);
      if (!newGrid[randIdx].isMine) {
        newGrid[randIdx].isMine = true;
        minesPlaced++;
      }
    }

    setGrid(newGrid);
    setMultiplier(1.0);
    setIsPlaying(true);
    setGameOver(false);
  };

  const handleTileClick = (idx) => {
    if (!isPlaying || gameOver || grid[idx].revealed) return;

    const tile = grid[idx];

    if (tile.isMine) {
      setGrid((prev) => prev.map((t) => ({ ...t, revealed: true })));
      setGameOver(true);
      setIsPlaying(false);
      showError('ओह! बम फूट गया! आप इस राउंड में हार गए।', '💣 बम मिला!');
      return;
    }

    const newRevealedCount = grid.filter((t) => t.revealed).length + 1;
    const multStep = 1.0 + (newRevealedCount * (mineCount * 0.28));
    const formattedMult = parseFloat(multStep.toFixed(2));

    setMultiplier(formattedMult);
    setGrid((prev) =>
      prev.map((t, i) => (i === idx ? { ...t, revealed: true } : t))
    );
  };

  const handleCashout = () => {
    if (!isPlaying || gameOver) return;

    const winAmount = Math.round(betAmount * multiplier);
    creditGameWin(winAmount, 'Cash Mines', `${multiplier}x`);
    setIsPlaying(false);
    setGameOver(true);
    setGrid((prev) => prev.map((t) => ({ ...t, revealed: true })));
  };

  const potentialWin = Math.round(betAmount * multiplier);

  return (
    <div className="space-y-4 sm:space-y-6 max-w-xl mx-auto">
      {/* Header */}
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

      {/* 🌟 Realistic Cyber Mines Arena */}
      <div className="game-card card-glow-green space-y-4 bg-white p-5 sm:p-7 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-1.5">
              <span>💣</span> Cash Mines (माइंस गेम)
            </h2>
            <p className="text-xs text-slate-500">हीरे खोजें, मल्टीप्लायर बढ़ाएं और कभी भी कैशआउट करें</p>
          </div>
          {isPlaying && (
            <div className="text-right bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
              <span className="text-[10px] text-emerald-700 block font-bold">मल्टीप्लायर</span>
              <strong className="text-lg font-black text-emerald-800">{multiplier}x</strong>
            </div>
          )}
        </div>

        {/* 5x5 Matrix Grid with 3D Bevels */}
        <div className="grid grid-cols-5 gap-2 sm:gap-2.5 p-3.5 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-3xl border-4 border-slate-800 shadow-2xl">
          {grid.map((tile, idx) => (
            <button
              key={idx}
              disabled={!isPlaying || tile.revealed}
              onClick={() => handleTileClick(idx)}
              className={`aspect-square rounded-2xl flex items-center justify-center font-black transition-all duration-150 transform ${
                !tile.revealed
                  ? 'bg-gradient-to-b from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 border-2 border-slate-600 shadow-lg active:scale-90 cursor-pointer'
                  : tile.isMine
                  ? 'bg-rose-600 border-2 border-rose-400 text-white shadow-xl scale-95 animate-bounce'
                  : 'bg-gradient-to-tr from-cyan-500 to-emerald-400 border-2 border-white text-white shadow-xl scale-95'
              }`}
            >
              {tile.revealed && (
                tile.isMine ? (
                  <Bomb className="w-6 h-6 sm:w-7 sm:h-7 text-white animate-pulse" />
                ) : (
                  <Gem className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-md animate-in zoom-in" />
                )
              )}
            </button>
          ))}
        </div>

        {/* Betting Controls */}
        {!isPlaying ? (
          <div className="space-y-3 pt-1">
            <div className="grid grid-cols-2 gap-3 text-left">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">बेट राशि (₹):</label>
                <div className="grid grid-cols-3 gap-1">
                  {[20, 50, 100].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setBetAmount(amt)}
                      className={`py-1.5 rounded-xl text-xs font-black ${
                        betAmount === amt ? 'bg-slate-900 text-white shadow' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">माइंस संख्या:</label>
                <div className="grid grid-cols-3 gap-1">
                  {[1, 3, 5].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMineCount(m)}
                      className={`py-1.5 rounded-xl text-xs font-black ${
                        mineCount === m ? 'bg-indigo-600 text-white shadow' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {m} बम
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleStartGame}
              disabled={totalBalance < betAmount}
              className="w-full btn-green py-3.5 text-sm sm:text-base font-black shadow-xl"
            >
              ₹{betAmount} से गेम शुरू करें (Start Mines)
            </button>
          </div>
        ) : (
          <button
            onClick={handleCashout}
            className="w-full btn-gold py-4 px-4 rounded-2xl shadow-2xl flex items-center justify-center gap-2 text-base sm:text-lg font-black animate-bounce cursor-pointer"
          >
            <DollarSign className="w-6 h-6" />
            <span>₹{potentialWin} निकालें (Cashout Now)</span>
          </button>
        )}
      </div>
    </div>
  );
}

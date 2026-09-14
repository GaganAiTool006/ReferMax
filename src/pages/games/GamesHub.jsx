import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Gamepad2, 
  Flame, 
  Sparkles, 
  ArrowRight, 
  Trophy, 
  Play, 
  RotateCw,
  Coins,
  Ticket,
  Bomb,
  Rocket
} from 'lucide-react';
import { useWallet } from '../../context/WalletContext';

export default function GamesHub() {
  const { totalBalance } = useWallet();

  const games = [
    {
      id: 'dice',
      title: 'Lucky 7 Dice Roll',
      titleHi: 'लकी 7 पासा',
      path: '/games/dice',
      category: 'पासा / Dice',
      multiplier: '2.0x - 5.8x',
      badge: '⚡ 5.8x बंपर',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      players: '2.8k लाइव',
      desc: '7 Up, 7 Down या Exact 7 का लाइव अनुमान लगाएं।',
      svgType: 'dice'
    },
    {
      id: 'color',
      title: 'Color Prediction',
      titleHi: 'कलर प्रेडिक्शन',
      path: '/games/color',
      category: 'प्रेडिक्शन / Color',
      multiplier: '2x - 4.5x - 9x',
      badge: '🔥 सबसे लोकप्रिय',
      badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
      players: '5.4k लाइव',
      desc: 'हर 30 सेकंड में Red, Green या Violet का लाइव अनुमान लगाएं।',
      svgType: 'color'
    },
    {
      id: 'coin',
      title: 'Head or Tail',
      titleHi: 'सिक्का उछालो',
      path: '/games/coin',
      category: 'टॉस / Coin Flip',
      multiplier: '2.0x इंस्टेंट',
      badge: '2.0x विन',
      badgeColor: 'bg-yellow-100 text-yellow-900 border-yellow-300',
      players: '1.9k लाइव',
      desc: '3D सिक्का उछालें और 2 गुना नकद इनाम पाएं।',
      svgType: 'coin'
    },
    {
      id: 'scratch',
      title: 'Scratch & Win',
      titleHi: 'स्क्रैच कार्ड',
      path: '/games/scratch',
      category: 'लॉटरी / Scratch Card',
      multiplier: 'मैच 3 = जीत',
      badge: '₹500 तक',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      players: '3.1k लाइव',
      desc: 'कार्ड स्क्रैच करें और 3 समान संख्याएं मिलाकर नकद जीतें।',
      svgType: 'scratch'
    },
    {
      id: 'slots',
      title: '777 Fruit Slots',
      titleHi: 'स्लॉट मशीन',
      path: '/games/slots',
      category: 'कैसीनो / Slots',
      multiplier: '10x मेगा विन',
      badge: '10x जैकपॉट',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      players: '4.2k लाइव',
      desc: '3 रील्स घुमाएं और 777 जैकपॉट मैच करें।',
      svgType: 'slots'
    },
    {
      id: 'wheel',
      title: 'Lucky Wheel',
      titleHi: 'लकी स्पिन पहिया',
      path: '/games/wheel',
      category: 'स्पिन / Wheel',
      multiplier: '₹10 - ₹1,000',
      badge: '100% विनिंग',
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
      players: '3.6k लाइव',
      desc: 'पहिया घुमाएं और हर स्पिन पर 100% गारंटीड इनाम पाएं।',
      svgType: 'wheel'
    },
    {
      id: 'mines',
      title: 'Cash Mines',
      titleHi: 'माइंस गेम',
      path: '/games/mines',
      category: 'माइनस्वीपर / Mines',
      multiplier: '1.2x - 25x',
      badge: '💎 25x मल्टी',
      badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300',
      players: '2.3k लाइव',
      desc: 'हीरे खोजें और कभी भी कैशआउट करें।',
      svgType: 'mines'
    },
    {
      id: 'aviator',
      title: 'Aviator Crash',
      titleHi: 'रॉकेट क्रैश',
      path: '/games/aviator',
      category: 'क्रैश / Multiplier',
      multiplier: '1x - 100x',
      badge: '🚀 100x तक',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      players: '6.1k लाइव',
      desc: 'रॉकेट के क्रैश होने से पहले कैशआउट दबाएं।',
      svgType: 'aviator'
    }
  ];

  const renderGameGraphic = (type) => {
    switch (type) {
      case 'dice':
        return (
          <svg className="w-12 h-12 drop-shadow" viewBox="0 0 100 100" fill="none">
            <rect x="10" y="25" width="48" height="48" rx="12" fill="#6366f1" />
            <circle cx="22" cy="37" r="4" fill="#ffffff" />
            <circle cx="42" cy="37" r="4" fill="#ffffff" />
            <circle cx="32" cy="47" r="4" fill="#ffffff" />
            <circle cx="22" cy="57" r="4" fill="#ffffff" />
            <circle cx="42" cy="57" r="4" fill="#ffffff" />
            <rect x="42" y="15" width="48" height="48" rx="12" fill="#a855f7" stroke="#e0e7ff" strokeWidth="1.5" />
            <circle cx="66" cy="39" r="4.5" fill="#ffffff" />
            <circle cx="54" cy="27" r="4.5" fill="#ffffff" />
            <circle cx="78" cy="51" r="4.5" fill="#ffffff" />
          </svg>
        );
      case 'color':
        return (
          <svg className="w-12 h-12 drop-shadow" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="#ffffff" stroke="#e2e8f0" strokeWidth="3" />
            <path d="M50 50 L50 10 A40 40 0 0 1 85 70 Z" fill="#10b981" />
            <path d="M50 50 L85 70 A40 40 0 0 1 15 70 Z" fill="#ef4444" />
            <path d="M50 50 L15 70 A40 40 0 0 1 50 10 Z" fill="#8b5cf6" />
            <circle cx="50" cy="50" r="14" fill="#1e1b4b" />
            <text x="50" y="55" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="900">30s</text>
          </svg>
        );
      case 'coin':
        return (
          <svg className="w-12 h-12 drop-shadow" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="#f59e0b" stroke="#78350f" strokeWidth="2" />
            <circle cx="50" cy="50" r="36" fill="#fbbf24" stroke="#fef08a" strokeWidth="2" />
            <text x="50" y="58" textAnchor="middle" fill="#78350f" fontSize="24" fontWeight="900" fontFamily="Rajdhani">₹</text>
          </svg>
        );
      case 'scratch':
        return (
          <svg className="w-12 h-12 drop-shadow" viewBox="0 0 100 100">
            <rect x="10" y="20" width="80" height="60" rx="10" fill="#10b981" stroke="#cbd5e1" strokeWidth="2" />
            <rect x="20" y="30" width="60" height="40" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 2" />
            <text x="50" y="55" textAnchor="middle" fill="#b45309" fontSize="16" fontWeight="900">₹500</text>
          </svg>
        );
      case 'slots':
        return (
          <svg className="w-12 h-12 drop-shadow" viewBox="0 0 100 100">
            <rect x="10" y="15" width="80" height="70" rx="12" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="2.5" />
            <rect x="18" y="25" width="64" height="40" rx="6" fill="#ffffff" />
            <text x="30" y="52" textAnchor="middle" fill="#dc2626" fontSize="20" fontWeight="900">7</text>
            <text x="50" y="52" textAnchor="middle" fill="#dc2626" fontSize="20" fontWeight="900">7</text>
            <text x="70" y="52" textAnchor="middle" fill="#dc2626" fontSize="20" fontWeight="900">7</text>
          </svg>
        );
      case 'wheel':
        return (
          <svg className="w-12 h-12 drop-shadow" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
            <path d="M50 50 L50 8 A42 42 0 0 1 92 50 Z" fill="#ef4444" />
            <path d="M50 50 L92 50 A42 42 0 0 1 50 92 Z" fill="#3b82f6" />
            <path d="M50 50 L50 92 A42 42 0 0 1 8 50 Z" fill="#10b981" />
            <path d="M50 50 L8 50 A42 42 0 0 1 50 8 Z" fill="#8b5cf6" />
            <circle cx="50" cy="50" r="10" fill="#ffffff" />
          </svg>
        );
      case 'mines':
        return (
          <svg className="w-12 h-12 drop-shadow" viewBox="0 0 100 100">
            <rect x="12" y="12" width="76" height="76" rx="14" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
            <path d="M50 25 L75 50 L50 75 L25 50 Z" fill="#22d3ee" />
          </svg>
        );
      case 'aviator':
        return (
          <svg className="w-12 h-12 drop-shadow" viewBox="0 0 100 100">
            <path d="M20 75 Q50 65 75 30" stroke="#f43f5e" strokeWidth="4" fill="none" />
            <path d="M60 40 L85 20 L80 45 L68 46 L65 52 L60 50 L62 45 Z" fill="#dc2626" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 text-white p-5 sm:p-7 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-amber-300 text-xs font-black uppercase">
            <Gamepad2 className="w-3.5 h-3.5" /> 8 रियल मनी गेम्स
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">
            गेम्स लॉबी & अरीना (Games Hub)
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100 max-w-lg">
            अपनी पसंद का गेम चुनें, खेलें और तुरंत अपनी जीत सीधे वॉलेट में प्राप्त करें!
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-xs">
          <span className="text-indigo-200 block">वॉलेट बैलेंस</span>
          <strong className="text-lg font-black text-amber-300">₹{totalBalance.toFixed(2)}</strong>
        </div>
      </div>

      {/* 8 Games Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {games.map((g) => (
          <Link
            key={g.id}
            to={g.path}
            className="group relative overflow-hidden rounded-3xl bg-white border-2 border-slate-200 hover:border-indigo-400 p-4 sm:p-5 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="p-2 rounded-2xl bg-slate-50 border border-slate-200">
                  {renderGameGraphic(g.svgType)}
                </div>
                <div className="text-right space-y-1">
                  <span className={`inline-block text-[10px] font-black px-2.5 py-0.5 rounded-full border shadow-sm ${g.badgeColor}`}>
                    {g.badge}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold block">
                    ● {g.players}
                  </span>
                </div>
              </div>

              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {g.category}
              </span>
              <h3 className="text-base font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                {g.title}
              </h3>
              <div className="text-xs font-bold text-indigo-700 mt-0.5">
                पेआउट: <span className="text-emerald-700 font-black">{g.multiplier}</span>
              </div>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                {g.desc}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-slate-900">
              <span className="text-indigo-600 group-hover:underline">अभी खेलें</span>
              <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

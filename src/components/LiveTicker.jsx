import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';

const RECENT_ACTIVITIES = [
  { user: 'Rohit K. (***4120)', text: 'ने ₹20 रेफरल बोनस कमाया', type: 'referral', amount: '+₹20' },
  { user: 'Sneha P. (***8921)', text: 'ने UPI से ₹1,450 सफलतापूर्वक विड्रॉ किया', type: 'withdraw', amount: '₹1,450' },
  { user: 'Amit V. (***3312)', text: 'ने Lucky 7 Dice में ₹400 जीता', type: 'win', amount: '+₹400' },
  { user: 'Deepak S. (***6754)', text: 'प्लेटफॉर्म से जुड़े और ₹10 वेलकम बोनस पाया', type: 'join', amount: '+₹10' },
  { user: 'Karan M. (***9011)', text: 'ने 777 Slots में ₹1,000 जैकपॉट जीता', type: 'win', amount: '+₹1,000' },
  { user: 'Priya R. (***5523)', text: 'ने Scratch Card में ₹500 जीता', type: 'win', amount: '+₹500' }
];

export default function LiveTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % RECENT_ACTIVITIES.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const current = RECENT_ACTIVITIES[index];

  return (
    <div className="bg-white border border-indigo-100 rounded-xl px-3 py-2 flex items-center justify-between gap-2 overflow-hidden shadow-sm text-xs sm:text-sm">
      <div className="flex items-center gap-2 min-w-0">
        <span className="flex h-2 w-2 relative flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-indigo-600 font-bold flex-shrink-0 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          लाइव:
        </span>
        <span className="text-slate-600 font-medium truncate">
          <strong className="text-slate-900 font-bold">{current.user}</strong> {current.text}
        </span>
      </div>
      <div className="flex-shrink-0 font-extrabold text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-0.5">
        <ArrowUpRight className="w-3 h-3" />
        {current.amount}
      </div>
    </div>
  );
}

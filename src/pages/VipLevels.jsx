import React from 'react';
import { 
  Crown, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { VIP_LEVELS, getUserVipLevel } from '../utils/vipLevels';
import { Link } from 'react-router-dom';

export default function VipLevels() {
  const { currentUser } = useAuth();
  const referralCount = currentUser?.referralCount || 0;
  const vip = getUserVipLevel(referralCount);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white p-5 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-amber-300 text-xs font-black uppercase">
              <Crown className="w-3.5 h-3.5 text-yellow-300" /> VIP क्लब & इनकम टियर
            </span>
            <h1 className="text-2xl sm:text-4xl font-black">
              आपका लेवल: <span className="text-amber-300">{vip.current.badge} {vip.current.name}</span>
            </h1>
            <p className="text-xs sm:text-sm text-purple-100 max-w-lg">
              जितने अधिक दोस्तों को जोड़ेंगे, आपका लेवल बढ़ेगा और प्रति रेफरल व दैनिक इनकम भी बढ़ेगी!
            </p>
          </div>

          <div className="bg-white text-slate-900 rounded-2xl p-4 text-center min-w-[170px] shadow-2xl">
            <div className="text-3xl mb-0.5">{vip.current.badge}</div>
            <div className="text-sm font-black text-slate-900">{vip.current.nameHi}</div>
            <div className="text-xs text-indigo-600 font-bold mt-0.5">
              {vip.current.dailyPotentialHi}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-5 pt-4 border-t border-white/20">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="text-purple-100">
              अगला लेवल: {vip.next ? `${vip.next.badge} ${vip.next.name}` : 'अधिकतम लेवल प्राप्त!'}
            </span>
            <span className="text-amber-300 font-black">
              {vip.next ? `${vip.neededForNext} और रेफरल चाहिए` : '100% Complete'}
            </span>
          </div>
          <div className="w-full h-3 bg-black/20 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full transition-all duration-500 shadow"
              style={{ width: `${vip.progressPercent}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[11px] text-purple-200 mt-1">
            <span>वर्तमान इनवाइट्स: {referralCount}</span>
            <span>{vip.progressPercent}% पूरा</span>
          </div>
        </div>
      </div>

      {/* Income Potential Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        <div className="game-card card-glow-gold space-y-1.5 bg-white p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-bold">रेफरल रिवॉर्ड रेट</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600">
            ₹{vip.current.rewardPerRefer} <span className="text-xs font-normal text-slate-400">/ रेफरल</span>
          </div>
          <p className="text-xs text-slate-500">
            नया यूजर जुड़ते ही तुरंत वॉलेट में क्रेडिट।
          </p>
        </div>

        <div className="game-card card-glow-green space-y-1.5 bg-white p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-bold">दैनिक संभावित आय</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600">
            {vip.current.dailyPotentialHi}
          </div>
          <p className="text-xs text-slate-500">
            रेफरल्स और एक्टिविटी से संभावित दैनिक आय।
          </p>
        </div>

        <div className="game-card card-glow-purple space-y-1.5 bg-white p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-bold">मासिक संभावित आय</span>
            <DollarSign className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-black text-indigo-600">
            {vip.current.monthlyPotentialHi}
          </div>
          <p className="text-xs text-slate-500">
            टियर लेवल बनाए रखने पर मासिक अनुमान।
          </p>
        </div>
      </div>

      {/* VIP Tiers Breakdown */}
      <div className="game-card space-y-4 bg-white p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-1.5">
            <Crown className="w-4 h-4 text-amber-500" />
            सभी VIP लेवल्स & फायदे
          </h3>
          <Link to="/refer" className="btn-gold py-1 px-3 text-xs flex items-center gap-1 min-h-0">
            <span>रेफर करें</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 pt-1">
          {VIP_LEVELS.map((lvl) => {
            const isCurrent = lvl.level === vip.current.level;
            return (
              <div
                key={lvl.level}
                className={`p-4 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'bg-purple-50/60 border-purple-300 ring-2 ring-purple-300 shadow-md'
                    : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{lvl.badge}</span>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">{lvl.name}</h4>
                      <span className="text-[11px] text-slate-500">
                        {lvl.minRefers === 0 ? '0 - 4 रेफरल' : lvl.maxRefers > 1000 ? '75+ रेफरल' : `${lvl.minRefers} - ${lvl.maxRefers} रेफरल`}
                      </span>
                    </div>
                  </div>
                  {isCurrent && (
                    <span className="px-2 py-0.5 rounded-full bg-purple-600 text-white font-black text-[10px] uppercase">
                      Current
                    </span>
                  )}
                </div>

                <div className="bg-white p-2 rounded-xl mb-2.5 space-y-1 text-xs border border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-500">प्रति रेफरल:</span>
                    <strong className="text-amber-600 font-black">₹{lvl.rewardPerRefer}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">संभावित आय:</span>
                    <strong className="text-emerald-600 font-black">{lvl.dailyPotentialHi}</strong>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-slate-600">
                  {lvl.perks.map((perk, idx) => (
                    <div key={idx} className="flex items-start gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="leading-tight text-[11px]">{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

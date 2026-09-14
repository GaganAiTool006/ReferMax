export const VIP_LEVELS = [
  {
    level: 1,
    name: 'Bronze Gamer',
    nameHi: 'कांस्य (Bronze)',
    badge: '🥉',
    minRefers: 0,
    maxRefers: 4,
    rewardPerRefer: 20,
    dailyPotentialHi: '₹200 - ₹500/दिन',
    monthlyPotentialHi: '₹6,000 - ₹15,000/महीना',
    color: '#cd7f32',
    bgGradient: 'from-amber-950/40 to-yellow-950/40',
    borderColor: 'border-amber-700/50',
    perks: [
      'साइनअप पर ₹10 वेलकम बोनस',
      'प्रति रेफरल ₹20 बोनस',
      'स्टैंडर्ड विड्रॉल सपोर्ट'
    ]
  },
  {
    level: 2,
    name: 'Silver Pro',
    nameHi: 'सिल्वर (Silver Pro)',
    badge: '🥈',
    minRefers: 5,
    maxRefers: 14,
    rewardPerRefer: 25,
    dailyPotentialHi: '₹500 - ₹1,500/दिन',
    monthlyPotentialHi: '₹15,000 - ₹45,000/महीना',
    color: '#cbd5e1',
    bgGradient: 'from-slate-800/40 to-slate-900/40',
    borderColor: 'border-slate-400/50',
    perks: [
      'प्रति रेफरल ₹25 बोनस',
      '+2% एक्स्ट्रा डिपॉजिट कैशबैक',
      'फास्ट विड्रॉल अप्रूवल'
    ]
  },
  {
    level: 3,
    name: 'Gold Champion',
    nameHi: 'गोल्ड (Gold Champion)',
    badge: '🥇',
    minRefers: 15,
    maxRefers: 34,
    rewardPerRefer: 30,
    dailyPotentialHi: '₹1,500 - ₹5,000/दिन',
    monthlyPotentialHi: '₹45,000 - ₹1,50,000/महीना',
    color: '#fbbf24',
    bgGradient: 'from-yellow-900/40 to-amber-950/40',
    borderColor: 'border-yellow-500/50',
    perks: [
      'प्रति रेफरल ₹30 बोनस',
      '+5% एक्स्ट्रा डिपॉजिट कैशबैक',
      'दैनिक ₹50 लकी चेक-इन स्पिन'
    ]
  },
  {
    level: 4,
    name: 'Platinum VIP',
    nameHi: 'प्लैटिनम (Platinum VIP)',
    badge: '💎',
    minRefers: 35,
    maxRefers: 74,
    rewardPerRefer: 35,
    dailyPotentialHi: '₹5,000 - ₹15,000/दिन',
    monthlyPotentialHi: '₹1,50,000 - ₹4,50,000/महीना',
    color: '#38bdf8',
    bgGradient: 'from-sky-950/40 to-cyan-950/40',
    borderColor: 'border-cyan-400/50',
    perks: [
      'प्रति रेफरल ₹35 बोनस',
      '+10% एक्स्ट्रा डिपॉजिट कैशबैक',
      '2-मिनट इंस्टेंट सुपरफास्ट विड्रॉल',
      'लकी व्हील में जैकपॉट चांस 2x'
    ]
  },
  {
    level: 5,
    name: 'Diamond Legend',
    nameHi: 'डायमंड (Diamond Legend)',
    badge: '👑',
    minRefers: 75,
    maxRefers: 999999,
    rewardPerRefer: 50,
    dailyPotentialHi: '₹25,000+ / दिन',
    monthlyPotentialHi: '₹7,50,000+ / महीना',
    color: '#a855f7',
    bgGradient: 'from-purple-950/40 to-fuchsia-950/40',
    borderColor: 'border-purple-500/50',
    perks: [
      'प्रति रेफरल ₹50 बंपर बोनस',
      '+15% लाइफटाइम डिपॉजिट कमीशन',
      '24/7 डेडिकेटेड पर्सनल VIP मैनेजर',
      '0% विड्रॉल चार्ज'
    ]
  }
];

export const getUserVipLevel = (referralCount = 0) => {
  const count = Number(referralCount) || 0;
  for (let i = VIP_LEVELS.length - 1; i >= 0; i--) {
    if (count >= VIP_LEVELS[i].minRefers) {
      const current = VIP_LEVELS[i];
      const next = VIP_LEVELS[i + 1] || null;
      const neededForNext = next ? next.minRefers - count : 0;
      const progressPercent = next
        ? Math.min(100, Math.round(((count - current.minRefers) / (next.minRefers - current.minRefers)) * 100))
        : 100;
      return {
        current,
        next,
        neededForNext,
        progressPercent,
        count
      };
    }
  }
  return {
    current: VIP_LEVELS[0],
    next: VIP_LEVELS[1],
    neededForNext: 5,
    progressPercent: 0,
    count
  };
};

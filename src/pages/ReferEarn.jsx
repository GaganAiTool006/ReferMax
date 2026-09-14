import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Gift, 
  Share2, 
  Copy, 
  Check, 
  QrCode, 
  Users, 
  Sparkles, 
  Zap,
  ArrowRight,
  Trophy,
  ShieldCheck,
  Award,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../context/WalletContext';
import { useToast } from '../context/ToastContext';
import { getUserVipLevel } from '../utils/vipLevels';

export default function ReferEarn() {
  const { currentUser, users, requestRegisterOtp } = useAuth();
  const { addReferralReward } = useWallet();
  const { showSuccess } = useToast();

  const [copied, setCopied] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeTab, setActiveTab] = useState('refer'); // 'refer' | 'leaderboard'

  const myRefCode = currentUser?.referralCode || 'VIKAS20';
  const referralLink = `${window.location.origin}/register?ref=${myRefCode}`;

  const vip = getUserVipLevel(currentUser?.referralCount || 0);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    showSuccess('रेफरल लिंक कॉपी हो गया! अब इसे अपने दोस्तों को भेजें।', 'कॉपी सफल');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(myRefCode);
    showSuccess(`रेफरल कोड ${myRefCode} कॉपी हो गया!`);
  };

  const handleShareWhatsapp = () => {
    const text = encodeURIComponent(
      `🔥 लूट ऑफर! इस लिंक से रजिस्टर करो और तुरंत ₹10 वेलकम बोनस पाओ। 8+ मिनी गेम्स खेलकर रोजाना ₹500-₹2000 कमाओ!\n\n👉 जॉइनिंग लिंक: ${referralLink}\n🔑 रेफरल कोड: ${myRefCode}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareTelegram = () => {
    const text = encodeURIComponent(
      `🔥 जॉइन करें और तुरंत ₹10 वेलकम बोनस पाएं! गेम्स खेलें और कमाएं। रेफरल कोड: ${myRefCode}\n${referralLink}`
    );
    window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${text}`, '_blank');
  };

  const handleSimulateNewReferral = () => {
    setIsSimulating(true);
    const rand = Math.floor(1000 + Math.random() * 9000);
    const testPhone = `98${Math.floor(10000000 + Math.random() * 90000000)}`;
    const testName = `Gamer_Friend_${rand}`;
    const testEmail = `friend${rand}@gmail.com`;

    requestRegisterOtp({
      name: testName,
      phone: testPhone,
      email: testEmail,
      password: 'password123',
      referralCode: myRefCode
    });

    setTimeout(() => {
      addReferralReward({
        referrerId: currentUser.id,
        newUserId: `usr_${Date.now()}`,
        newUserName: testName,
        newUserPhone: testPhone,
        amount: 20
      });
      setIsSimulating(false);
    }, 600);
  };

  const myReferredUsers = users.filter((u) => u.referredBy === currentUser?.id);

  const leaderboardUsers = [
    { rank: 1, name: 'अमित कुमार (Amit)', refers: 142, prize: '₹10,000', badge: '🥇' },
    { rank: 2, name: 'रोहित शर्मा (Rohit)', refers: 118, prize: '₹7,500', badge: '🥈' },
    { rank: 3, name: 'पूजा वर्मा (Pooja)', refers: 94, prize: '₹5,000', badge: '🥉' },
    { rank: 4, name: 'विकास यादव (Vikas)', refers: 76, prize: '₹2,500', badge: '4' },
    { rank: 5, name: 'संदीप सिंह (Sandeep)', refers: 61, prize: '₹1,000', badge: '5' }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* 🌟 Tab Navigation: Refer & Earn vs Leaderboard */}
      <div className="flex bg-slate-200/80 p-1.5 rounded-2xl max-w-md mx-auto border border-slate-300">
        <button
          type="button"
          onClick={() => setActiveTab('refer')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
            activeTab === 'refer'
              ? 'bg-white text-indigo-700 shadow-md scale-[1.02]'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          🎁 रेफर & अर्न (+₹20)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('leaderboard')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
            activeTab === 'leaderboard'
              ? 'bg-white text-indigo-700 shadow-md scale-[1.02]'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          🏆 वीकली लीडरबोर्ड (₹10k)
        </button>
      </div>

      {activeTab === 'refer' ? (
        <div className="space-y-5">
          {/* Header Hero Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 p-5 sm:p-8 shadow-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
              <div className="space-y-2 text-left">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 text-amber-300 text-xs font-black uppercase">
                  <Gift className="w-3.5 h-3.5" /> अनलिमिटेड रेफरल इनकम
                </span>
                <h1 className="text-2xl sm:text-4xl font-black text-slate-950">
                  दोस्त को इनवाइट करें और पाएं <span className="underline decoration-slate-950">₹20 तुरंत</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-900 font-semibold max-w-lg">
                  जैसे ही कोई आपके रेफरल लिंक से जुड़ेगा, <strong>हैंड-टू-हैंड ₹20</strong> आपके वॉलेट में ऐड हो जाएंगे और दोस्त को ₹10 वेलकम बोनस!
                </p>
              </div>

              {/* Quick Stats Pill */}
              <div className="w-full md:w-auto bg-white border-2 border-amber-300 rounded-2xl p-4 flex items-center justify-around sm:justify-start gap-4 sm:gap-6 shadow-xl">
                <div className="text-center">
                  <span className="text-[11px] text-slate-500 block font-bold">कुल इनवाइट्स</span>
                  <strong className="text-2xl sm:text-3xl font-black text-slate-900">
                    {currentUser?.referralCount || myReferredUsers.length}
                  </strong>
                </div>
                <div className="h-8 w-px bg-slate-200"></div>
                <div className="text-center">
                  <span className="text-[11px] text-slate-500 block font-bold">रेफरल कमाई</span>
                  <strong className="text-2xl sm:text-3xl font-black text-emerald-700">
                    ₹{((currentUser?.referralCount || myReferredUsers.length) * 20).toFixed(2)}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* Referral Link & QR Code Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
            <div className="lg:col-span-7 space-y-4">
              <div className="game-card bg-white p-5 space-y-4 border-2 border-slate-200 shadow-md">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-indigo-600" />
                  आपका पर्सनल रेफरल लिंक
                </h3>

                {/* Link Box */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-slate-50 border-2 border-slate-200 rounded-2xl p-2">
                  <input
                    type="text"
                    readOnly
                    value={referralLink}
                    className="bg-transparent border-none text-xs sm:text-sm text-slate-900 font-mono font-bold flex-1 outline-none truncate py-1 px-2"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="btn-primary py-2.5 px-4 text-xs font-black flex items-center justify-center gap-1.5 flex-shrink-0 cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'कॉपी हो गया!' : 'लिंक कॉपी करें'}</span>
                  </button>
                </div>

                {/* Code Box */}
                <div className="flex items-center justify-between bg-amber-50 border-2 border-amber-200 rounded-2xl p-3.5">
                  <div>
                    <span className="text-[11px] text-amber-800 block font-bold">रेफरल कोड:</span>
                    <strong className="text-lg sm:text-xl font-black text-amber-950 font-mono tracking-wider">
                      {myRefCode}
                    </strong>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="btn-outline text-xs py-1.5 px-3 flex items-center gap-1 border-amber-300 text-amber-900 bg-white hover:bg-amber-100 min-h-0"
                  >
                    <Copy className="w-3.5 h-3.5" /> कोड कॉपी
                  </button>
                </div>

                {/* Share CTAs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <button
                    onClick={handleShareWhatsapp}
                    className="btn-whatsapp py-3 px-4 text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>WhatsApp पर शेयर</span>
                  </button>
                  <button
                    onClick={handleShareTelegram}
                    className="bg-sky-600 hover:bg-sky-700 text-white font-black py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-transform cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Telegram पर शेयर</span>
                  </button>
                </div>
              </div>

              {/* Instant Test Simulator Tool */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-4 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs font-black text-indigo-900">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>लाइव रेफरल टेस्टिंग टूल</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium">
                    एक क्लिक में टेस्ट रेफरल करके तुरंत <strong>₹20 वॉलेट में जुड़ने</strong> का अनुभव करें।
                  </p>
                </div>
                <button
                  onClick={handleSimulateNewReferral}
                  disabled={isSimulating}
                  className="w-full sm:w-auto btn-gold py-2 px-4 text-xs font-black whitespace-nowrap min-h-0 cursor-pointer shadow-md"
                >
                  {isSimulating ? 'जोड़ा जा रहा है...' : '+₹20 टेस्ट करें'}
                </button>
              </div>
            </div>

            {/* Right: QR Code */}
            <div className="lg:col-span-5">
              <div className="game-card bg-white text-center space-y-3 flex flex-col items-center justify-center p-6 border-2 border-slate-200 shadow-md">
                <div className="flex items-center gap-1.5 text-sm font-black text-slate-900">
                  <QrCode className="w-4 h-4 text-amber-600" />
                  <span>स्कैन करके तुरंत जॉइन करवाएं</span>
                </div>

                <div className="p-3.5 bg-white rounded-2xl shadow-xl inline-block ring-4 ring-indigo-100 border border-slate-200">
                  <QRCodeSVG
                    value={referralLink}
                    size={150}
                    bgColor="#ffffff"
                    fgColor="#0f172a"
                    level="Q"
                    includeMargin={false}
                  />
                </div>

                <p className="text-xs text-slate-600 font-medium">
                  दोस्त से यह QR कोड स्कैन कराएं, आपका रेफरल कोड ऑटोमैटिकली अप्लाई होगा!
                </p>
              </div>
            </div>
          </div>

          {/* Invited Friends Table */}
          <div className="game-card bg-white p-5 space-y-3 border-2 border-slate-200 shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-600" />
                इनवाइट किए गए दोस्त (Referred Friends)
              </h3>
              <span className="text-xs font-bold text-slate-500">
                कुल: {myReferredUsers.length > 0 ? myReferredUsers.length : (currentUser?.referralCount || 0)}
              </span>
            </div>

            {myReferredUsers.length > 0 ? (
              <div className="overflow-x-auto -mx-2 sm:mx-0 px-2 sm:px-0">
                <table className="w-full text-left text-xs min-w-[340px]">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[10px]">
                      <th className="pb-2.5">दोस्त</th>
                      <th className="pb-2.5">मोबाइल</th>
                      <th className="pb-2.5">दिनांक</th>
                      <th className="pb-2.5 text-right">रिवॉर्ड</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {myReferredUsers.map((friend) => (
                      <tr key={friend.id}>
                        <td className="py-3 font-bold text-slate-900 truncate">{friend.name}</td>
                        <td className="py-3 font-mono text-xs">
                          {friend.phone.slice(0, 3)}****{friend.phone.slice(-3)}
                        </td>
                        <td className="py-3 text-slate-500 text-xs">
                          {new Date(friend.createdAt).toLocaleDateString('hi-IN')}
                        </td>
                        <td className="py-3 text-right font-black text-emerald-700">+₹20</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-7 space-y-2 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <Users className="w-10 h-10 text-slate-400 mx-auto" />
                <p className="text-xs font-bold text-slate-800">अभी तक कोई दोस्त इनवाइट नहीं हुआ है</p>
                <p className="text-[11px] text-slate-500">
                  WhatsApp पर शेयर करें और प्रति दोस्त <strong>₹20</strong> कमाना शुरू करें!
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* 🌟 Leaderboard Tab */
        <div className="space-y-4">
          <div className="p-5 sm:p-7 bg-gradient-to-r from-purple-700 to-indigo-800 text-white rounded-3xl shadow-xl flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase text-amber-300 bg-white/20 px-2.5 py-0.5 rounded-full">
                वीकली रेफरल टूर्नामेंट
              </span>
              <h2 className="text-xl sm:text-3xl font-black">₹10,000 वीकली कैश पूल!</h2>
              <p className="text-xs text-purple-100">सबसे ज्यादा रेफरल करने वाले टॉप खिलाड़ियों को मिलता है नकद इनाम</p>
            </div>
            <Trophy className="w-14 h-14 text-amber-400 animate-pulse hidden sm:inline" />
          </div>

          <div className="game-card bg-white p-5 space-y-3 border-2 border-slate-200 shadow-md">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              इस हफ्ते के टॉप रेफरल लीडर्स
            </h3>

            <div className="space-y-2">
              {leaderboardUsers.map((user) => (
                <div
                  key={user.rank}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl w-7 text-center">{user.badge}</span>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">{user.name}</h4>
                      <span className="text-[11px] text-slate-500 font-bold">{user.refers} इनवाइट्स</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block">कैश प्राइज़</span>
                    <strong className="text-xs sm:text-sm font-black text-emerald-700">{user.prize}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

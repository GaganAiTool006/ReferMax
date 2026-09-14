import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../context/WalletContext';
import { Users, ArrowRightLeft, Check, Sparkles } from 'lucide-react';

export default function DemoSwitcher() {
  const { users, currentUser, switchUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 sm:px-2.5 py-1 text-xs font-bold rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 transition-all min-h-0"
        title="Switch Account / Test Referrals"
      >
        <ArrowRightLeft className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">अकाउंट</span> ({users.length})
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1 text-indigo-600">
              <Users className="w-3.5 h-3.5" />
              टेस्टिंग अकाउंट्स ({users.length})
            </span>
            <span className="text-[10px] text-slate-400">Live Switch</span>
          </div>

          <div className="max-h-52 overflow-y-auto py-2 space-y-1">
            {users.map((u) => {
              const isSelected = currentUser && currentUser.id === u.id;
              return (
                <button
                  key={u.id}
                  onClick={() => {
                    switchUser(u.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-indigo-50 border border-indigo-200 text-indigo-900 font-bold'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="truncate pr-2">
                    <div className="font-bold text-slate-900 truncate">{u.name}</div>
                    <div className="text-[11px] text-slate-500">
                      📱 {u.phone} {u.referralCode ? `• Ref: ${u.referralCode}` : ''}
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
            <p className="leading-tight">
              💡 <em>टिप:</em> नए यूजर को अपने कोड ({currentUser?.referralCode}) से जोड़कर तुरंत <strong>₹20</strong> चेक करें!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

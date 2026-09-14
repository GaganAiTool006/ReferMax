import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const WalletContext = createContext(null);

const STORAGE_WALLETS_KEY = 'gaming_platform_wallets_v2';
const STORAGE_TRANSACTIONS_KEY = 'gaming_platform_transactions_v2';

const MIN_WITHDRAWAL_AMOUNT = 520;

export const WalletProvider = ({ children }) => {
  const { currentUser, markUserDeposited, triggerConfetti } = useAuth();
  const { showSuccess, showError, showBonus, showInfo } = useToast();

  // Wallets mapping: { [userId]: { depositBalance: number, winningBalance: number, bonusBalance: number } }
  const [wallets, setWallets] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_WALLETS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Seed default wallet for main demo user
    return {
      'usr_main_8899': {
        depositBalance: 200,
        winningBalance: 260,
        bonusBalance: 80
      }
    };
  });

  // Transactions list: Array of transaction objects
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_TRANSACTIONS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Seed initial transactions for main demo user
    return [
      {
        id: 'tx_seed_1',
        userId: 'usr_main_8899',
        type: 'signup_bonus',
        amount: 10,
        title: '🎁 वेलकम साइनअप बोनस',
        description: 'अकाउंट बनाने पर ₹10 बोनस प्राप्त हुआ',
        status: 'completed',
        date: new Date(Date.now() - 86400000 * 3).toISOString()
      },
      {
        id: 'tx_seed_2',
        userId: 'usr_main_8899',
        type: 'referral_bonus',
        amount: 20,
        title: '👥 रेफरल बोनस (Aman Sharma)',
        description: 'दोस्त अमन के जुड़ने पर ₹20 बोनस मिला',
        status: 'completed',
        date: new Date(Date.now() - 86400000 * 2).toISOString()
      },
      {
        id: 'tx_seed_3',
        userId: 'usr_main_8899',
        type: 'deposit',
        amount: 200,
        title: '💳 UPI QR कोड डिपॉजिट',
        description: 'UPI QR कोड से वॉलेट में पैसे जमा किए गए (UTR: 329104928192)',
        status: 'completed',
        date: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 'tx_seed_4',
        userId: 'usr_main_8899',
        type: 'game_win',
        amount: 250,
        title: '🏆 Color Prediction गेम जीत',
        description: 'Green कलर प्रेडिक्शन 2x मल्टीप्लायर जीत',
        status: 'completed',
        date: new Date(Date.now() - 3600000 * 4).toISOString()
      }
    ];
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_WALLETS_KEY, JSON.stringify(wallets));
  }, [wallets]);

  useEffect(() => {
    localStorage.setItem(STORAGE_TRANSACTIONS_KEY, JSON.stringify(transactions));
  }, [transactions]);

  // Current user's wallet
  const currentWallet = (currentUser && wallets[currentUser.id]) || {
    depositBalance: 0,
    winningBalance: 0,
    bonusBalance: 0
  };

  const totalBalance =
    currentWallet.depositBalance + currentWallet.winningBalance + currentWallet.bonusBalance;

  // Add raw transaction
  const addTransaction = (userId, txData) => {
    const newTx = {
      id: `tx_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      userId,
      ...txData,
      date: txData.date || new Date().toISOString()
    };

    setTransactions((prev) => [newTx, ...prev]);

    // Also update wallet balance if specified
    if (txData.type === 'signup_bonus') {
      setWallets((prev) => {
        const userWallet = prev[userId] || { depositBalance: 0, winningBalance: 0, bonusBalance: 0 };
        return {
          ...prev,
          [userId]: {
            ...userWallet,
            bonusBalance: userWallet.bonusBalance + (txData.amount || 10)
          }
        };
      });
    }

    return newTx;
  };

  // Referral Reward callback (adds ₹20 to referrer immediately)
  const addReferralReward = ({ referrerId, newUserId, newUserName, newUserPhone, amount = 20 }) => {
    setWallets((prev) => {
      const userWallet = prev[referrerId] || { depositBalance: 0, winningBalance: 0, bonusBalance: 0 };
      return {
        ...prev,
        [referrerId]: {
          ...userWallet,
          winningBalance: userWallet.winningBalance + amount
        }
      };
    });

    const newTx = {
      id: `tx_ref_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      userId: referrerId,
      type: 'referral_bonus',
      amount,
      title: `👥 हैंड-टू-हैंड रेफरल बोनस (+₹${amount})`,
      description: `नया यूजर ${newUserName || newUserPhone} आपके रेफरल लिंक से जुड़ा!`,
      status: 'completed',
      date: new Date().toISOString()
    };

    setTransactions((prev) => [newTx, ...prev]);

    // If current logged-in user is the referrer, trigger instant popup!
    if (currentUser && currentUser.id === referrerId) {
      triggerConfetti();
      showBonus(
        `बधाई हो! नया यूजर आपके रेफरल लिंक से जुड़ गया है। ₹${amount} सीधे आपके वॉलेट में ऐड हो गए!`,
        '🎉 ₹20 हैंड-टू-हैंड रेफरल रिवॉर्ड!'
      );
    }
  };

  // Deposit Money (via UPI QR Code / Gateway Simulation)
  const depositMoney = ({ amount, utr, method = 'UPI_QR' }) => {
    if (!currentUser) {
      showError('कृपया पहले लॉगिन करें');
      return false;
    }

    const numAmount = Number(amount);
    if (!numAmount || numAmount < 10) {
      showError('न्यूनतम डिपॉजिट राशि ₹10 है (Minimum deposit is ₹10)');
      return false;
    }

    // Update wallet
    setWallets((prev) => {
      const userWallet = prev[currentUser.id] || { depositBalance: 0, winningBalance: 0, bonusBalance: 0 };
      return {
        ...prev,
        [currentUser.id]: {
          ...userWallet,
          depositBalance: userWallet.depositBalance + numAmount
        }
      };
    });

    // Mark user as having deposited at least once
    markUserDeposited(currentUser.id);

    // Add transaction record
    const newTx = {
      id: `tx_dep_${Date.now()}`,
      userId: currentUser.id,
      type: 'deposit',
      amount: numAmount,
      title: `💳 UPI QR डिपॉजिट (+₹${numAmount})`,
      description: `UPI के माध्यम से वॉलेट में ₹${numAmount} सफलतापूर्वक जमा किए गए (UTR: ${utr || 'UPI' + Date.now().toString().slice(-8)})`,
      status: 'completed',
      date: new Date().toISOString()
    };

    setTransactions((prev) => [newTx, ...prev]);
    triggerConfetti();
    showSuccess(`₹${numAmount} आपके वॉलेट में सफलतापूर्वक जमा हो गए हैं!`, 'डिपॉजिट सफल (Deposit Success)');
    return true;
  };

  // Withdraw Money with Strict Checks (Min ₹520 & Has Deposited at least once)
  const withdrawMoney = ({ amount, method = 'UPI', upiId, bankDetails }) => {
    if (!currentUser) {
      showError('कृपया पहले लॉगिन करें');
      return { success: false, message: 'लॉगिन आवश्यक है' };
    }

    const numAmount = Number(amount);

    // Rule 1: Check minimum withdrawal amount
    if (!numAmount || numAmount < MIN_WITHDRAWAL_AMOUNT) {
      const msg = `न्यूनतम विड्रॉल सीमा ₹${MIN_WITHDRAWAL_AMOUNT} है! (Minimum withdrawal is ₹${MIN_WITHDRAWAL_AMOUNT})`;
      showError(msg);
      return { success: false, message: msg };
    }

    // Rule 2: Strict Deposit Check ("यूजर जब तक कुछ ऐड ना हो तब तक वह विड्रॉ ना हो")
    if (!currentUser.hasDepositedAtLeastOnce) {
      const msg = '⚠️ विड्रॉल अनलॉक करने के लिए आपको कम से कम एक बार डिपॉजिट (Add Money) करना अनिवार्य है!';
      showError(msg, 'डिपॉजिट आवश्यक (Deposit Required)');
      return {
        success: false,
        requiresDeposit: true,
        message: msg
      };
    }

    // Rule 3: Check wallet balance
    if (totalBalance < numAmount) {
      const msg = `अपर्याप्त बैलेंस! आपका कुल बैलेंस ₹${totalBalance.toFixed(2)} है।`;
      showError(msg);
      return { success: false, message: msg };
    }

    // Rule 4: Profile / Payout info check
    const payoutTarget = upiId || currentUser.upiId || bankDetails?.accountNumber || currentUser.accountNumber;
    if (!payoutTarget) {
      const msg = 'कृपया विड्रॉल के लिए अपनी UPI ID या बैंक खाता विवरण दर्ज करें।';
      showError(msg);
      return { success: false, message: msg };
    }

    // Deduct from wallet: prioritize winning -> deposit -> bonus
    let remainingToDeduct = numAmount;
    let newWinning = currentWallet.winningBalance;
    let newDeposit = currentWallet.depositBalance;
    let newBonus = currentWallet.bonusBalance;

    if (newWinning >= remainingToDeduct) {
      newWinning -= remainingToDeduct;
      remainingToDeduct = 0;
    } else {
      remainingToDeduct -= newWinning;
      newWinning = 0;
      if (newDeposit >= remainingToDeduct) {
        newDeposit -= remainingToDeduct;
        remainingToDeduct = 0;
      } else {
        remainingToDeduct -= newDeposit;
        newDeposit = 0;
        newBonus -= remainingToDeduct;
      }
    }

    setWallets((prev) => ({
      ...prev,
      [currentUser.id]: {
        depositBalance: Math.max(0, newDeposit),
        winningBalance: Math.max(0, newWinning),
        bonusBalance: Math.max(0, newBonus)
      }
    }));

    // Record Withdrawal Transaction
    const newTx = {
      id: `tx_wdr_${Date.now()}`,
      userId: currentUser.id,
      type: 'withdraw',
      amount: numAmount,
      title: `🏦 विड्रॉल रिक्वेस्ट (-₹${numAmount})`,
      description: `${method}: ${payoutTarget} पर ₹${numAmount} का भुगतान प्रोसेस किया जा रहा है।`,
      status: 'completed', // instant simulation for smooth testing
      payoutTarget,
      date: new Date().toISOString()
    };

    setTransactions((prev) => [newTx, ...prev]);
    triggerConfetti();
    showSuccess(
      `₹${numAmount} का विड्रॉल सफलतापूर्वक प्रोसेस हो गया है! पैसे आपके खाते (${payoutTarget}) में भेज दिए गए हैं।`,
      'विड्रॉल सफल (Withdrawal Success)'
    );

    return { success: true, transaction: newTx };
  };

  // Deduct Bet from Wallet (for games)
  const placeBet = (betAmount, gameName = 'Game') => {
    const numAmount = Number(betAmount);
    if (numAmount <= 0) return false;
    if (totalBalance < numAmount) {
      showError('गेम खेलने के लिए पर्याप्त बैलेंस नहीं है! कृपया पैसे जोड़ें।', 'अपर्याप्त बैलेंस');
      return false;
    }

    let remaining = numAmount;
    let newBonus = currentWallet.bonusBalance;
    let newDeposit = currentWallet.depositBalance;
    let newWinning = currentWallet.winningBalance;

    // First use bonus, then deposit, then winning
    if (newBonus >= remaining) {
      newBonus -= remaining;
      remaining = 0;
    } else {
      remaining -= newBonus;
      newBonus = 0;
      if (newDeposit >= remaining) {
        newDeposit -= remaining;
        remaining = 0;
      } else {
        remaining -= newDeposit;
        newDeposit = 0;
        newWinning -= remaining;
      }
    }

    setWallets((prev) => ({
      ...prev,
      [currentUser.id]: {
        depositBalance: Math.max(0, newDeposit),
        winningBalance: Math.max(0, newWinning),
        bonusBalance: Math.max(0, newBonus)
      }
    }));

    addTransaction(currentUser.id, {
      type: 'game_bet',
      amount: numAmount,
      title: `🎲 ${gameName} बेट (-₹${numAmount})`,
      description: `${gameName} में ₹${numAmount} की शर्त लगाई गई`,
      status: 'completed'
    });

    return true;
  };

  // Credit Win to Wallet (for games)
  const creditGameWin = (winAmount, gameName = 'Game', multiplier = '2x') => {
    const numAmount = Number(winAmount);
    if (numAmount <= 0) return;

    setWallets((prev) => {
      const userWallet = prev[currentUser.id] || { depositBalance: 0, winningBalance: 0, bonusBalance: 0 };
      return {
        ...prev,
        [currentUser.id]: {
          ...userWallet,
          winningBalance: userWallet.winningBalance + numAmount
        }
      };
    });

    addTransaction(currentUser.id, {
      type: 'game_win',
      amount: numAmount,
      title: `🏆 ${gameName} जीत (+₹${numAmount})`,
      description: `${gameName} में ${multiplier} से ₹${numAmount} की शानदार जीत!`,
      status: 'completed'
    });

    triggerConfetti();
    showSuccess(`बधाई हो! आपने ${gameName} में ₹${numAmount} जीत लिए!`, '🎉 जीत गए!');
  };

  // Filter transactions for current user
  const userTransactions = currentUser
    ? transactions.filter((t) => t.userId === currentUser.id)
    : [];

  return (
    <WalletContext.Provider
      value={{
        currentWallet,
        totalBalance,
        minWithdrawalAmount: MIN_WITHDRAWAL_AMOUNT,
        transactions: userTransactions,
        allTransactions: transactions,
        addTransaction,
        addReferralReward,
        depositMoney,
        withdrawMoney,
        placeBet,
        creditGameWin
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

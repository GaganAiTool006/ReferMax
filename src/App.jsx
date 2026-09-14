import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { WalletProvider } from './context/WalletContext';
import { LanguageProvider } from './context/LanguageContext';

// Layout
import GamingLayout from './layouts/GamingLayout';

// Core Pages
import Home from './pages/Home';
import ReferEarn from './pages/ReferEarn';
import VipLevels from './pages/VipLevels';
import WalletPage from './pages/Wallet';
import Profile from './pages/Profile';

// Games
import GamesHub from './pages/games/GamesHub';
import ColorPrediction from './pages/games/ColorPrediction';
import LuckyWheel from './pages/games/LuckyWheel';
import MinesGame from './pages/games/MinesGame';
import AviatorGame from './pages/games/AviatorGame';
import DiceGame from './pages/games/DiceGame';
import CoinFlip from './pages/games/CoinFlip';
import ScratchCard from './pages/games/ScratchCard';
import SlotMachine from './pages/games/SlotMachine';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Styles
import './styles/gaming.css';

export default function App() {
  return (
    <ToastProvider>
      <LanguageProvider>
        <AuthProvider>
          <WalletProvider>
            <Routes>
              {/* Main Application with Gaming Layout */}
              <Route element={<GamingLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/refer" element={<ReferEarn />} />
                <Route path="/leaderboard" element={<ReferEarn />} />
                <Route path="/vip" element={<VipLevels />} />
                <Route path="/wallet" element={<WalletPage />} />
                <Route path="/profile" element={<Profile />} />

                {/* 8 Mini Games Routes */}
                <Route path="/games" element={<GamesHub />} />
                <Route path="/games/color" element={<ColorPrediction />} />
                <Route path="/games/wheel" element={<LuckyWheel />} />
                <Route path="/games/dice" element={<DiceGame />} />
                <Route path="/games/coin" element={<CoinFlip />} />
                <Route path="/games/scratch" element={<ScratchCard />} />
                <Route path="/games/slots" element={<SlotMachine />} />
                <Route path="/games/mines" element={<MinesGame />} />
                <Route path="/games/aviator" element={<AviatorGame />} />
              </Route>

              {/* Authentication Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </WalletProvider>
        </AuthProvider>
      </LanguageProvider>
    </ToastProvider>
  );
}

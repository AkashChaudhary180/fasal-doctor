'use client';

import React from 'react';
import Image from 'next/image';
import { SupportedLanguage } from '../types';
import { translations } from '../lib/translations';
import { Globe, PhoneCall, Wifi, WifiOff } from 'lucide-react';

interface HeaderProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  isOnline?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  isOnline = true,
}) => {
  const t = translations[currentLang];

  return (
    <header className="sticky top-0 z-50 bg-kisan-dark text-white border-b-4 border-kisan-emerald shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* App Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-emerald-400 shadow-md bg-emerald-950 flex-shrink-0">
            <Image
              src="/logo.jpg"
              alt="Fasal Doctor Logo"
              width={48}
              height={48}
              className="object-cover"
              priority
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">
                {t.appName}
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-bold rounded-full bg-emerald-600 text-white">
                AI Doctor
              </span>
            </div>
            <p className="text-xs text-emerald-200 line-clamp-1 font-medium">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Right Section: Language Selector & Status */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Online/Offline Status Indicator */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
              isOnline
                ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-600'
                : 'bg-amber-900/80 text-amber-300 border border-amber-600'
            }`}
          >
            {isOnline ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="hidden md:inline">{t.onlineMode}</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden md:inline">{t.offlineMode}</span>
              </>
            )}
          </div>

          {/* Language Selector Dropdown / Pills */}
          <div className="relative flex items-center bg-emerald-950/90 rounded-xl p-1 border-2 border-emerald-500 shadow-inner">
            <Globe className="w-4 h-4 text-emerald-300 ml-1.5 mr-1 hidden sm:inline" />
            <select
              value={currentLang}
              onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
              aria-label={t.selectLanguage}
              className="bg-transparent text-white font-bold text-sm sm:text-base py-1 px-2 focus:outline-none cursor-pointer rounded-lg"
            >
              <option value="hi" className="bg-emerald-950 text-white font-semibold">
                🇮🇳 हिंदी (Hindi)
              </option>
              <option value="pa" className="bg-emerald-950 text-white font-semibold">
                🇮🇳 ਪੰਜਾਬੀ (Punjabi)
              </option>
              <option value="en" className="bg-emerald-950 text-white font-semibold">
                🌐 English
              </option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

'use client';

import React from 'react';
import { SupportedLanguage } from '../types';
import { translations } from '../lib/translations';
import { Camera, MapPin, History, PhoneCall } from 'lucide-react';

export type NavTab = 'scan' | 'stores' | 'history' | 'helpline';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  lang: SupportedLanguage;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  lang,
}) => {
  const t = translations[lang];

  const items: Array<{
    id: NavTab;
    label: string;
    icon: React.ReactNode;
    badge?: string;
  }> = [
    {
      id: 'scan',
      label: t.scanTab,
      icon: <Camera className="w-6 h-6" />,
    },
    {
      id: 'stores',
      label: t.storesTab,
      icon: <MapPin className="w-6 h-6" />,
      badge: '10km',
    },
    {
      id: 'history',
      label: t.historyTab,
      icon: <History className="w-6 h-6" />,
    },
    {
      id: 'helpline',
      label: t.helplineTab,
      icon: <PhoneCall className="w-6 h-6" />,
      badge: 'Toll-Free',
    },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-white border-t-3 border-emerald-600 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] py-1.5 px-2">
      <div className="max-w-md mx-auto grid grid-cols-4 gap-1">
        {items.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-2xl transition-all select-none active:scale-95 ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-zinc-600 hover:bg-emerald-50 hover:text-emerald-900'
              }`}
            >
              {/* Optional top badge */}
              {item.badge && !isActive && (
                <span className="absolute top-0.5 right-1 px-1.5 py-0.2 bg-amber-400 text-emerald-950 text-[9px] font-black rounded-full">
                  {item.badge}
                </span>
              )}

              <div className={isActive ? 'text-white' : 'text-emerald-700'}>
                {item.icon}
              </div>

              <span
                className={`text-[11px] sm:text-xs font-black tracking-tight mt-1 line-clamp-1 ${
                  isActive ? 'text-white font-black' : 'text-zinc-800'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

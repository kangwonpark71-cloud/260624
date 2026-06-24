'use client';

import { useStore } from '@/store/useStore';
import { NavTab } from '@/types';
import { motion } from 'framer-motion';
import { HiHome, HiMap, HiCalendar, HiGlobe, HiUser } from 'react-icons/hi';

const tabs: { id: NavTab; label: string; icon: React.ElementType }[] = [
  { id: 'home', label: '홈', icon: HiHome },
  { id: 'map', label: '지도', icon: HiMap },
  { id: 'schedule', label: '일정', icon: HiCalendar },
  { id: 'discover', label: '발견', icon: HiGlobe },
  { id: 'my', label: 'MY', icon: HiUser },
];

export default function BottomNav() {
  const { activeTab, setActiveTab } = useStore();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe">
      <div className="glass-strong mx-3 mb-2 rounded-2xl px-2 py-1">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="touch-btn relative flex flex-col items-center gap-0.5 px-3 py-1.5"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -top-1 h-1 w-8 rounded-full bg-jeju-primary"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <Icon
                  className={`text-xl transition-colors ${
                    isActive ? 'text-jeju-primary' : 'text-jeju-text-muted'
                  }`}
                />
                <span
                  className={`text-[10px] font-medium transition-colors ${
                    isActive ? 'text-jeju-primary' : 'text-jeju-text-muted'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

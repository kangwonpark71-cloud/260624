'use client';

import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import GlassCard from '@/components/ui/GlassCard';
import CongestionBadge from '@/components/ui/CongestionBadge';
import { places, getSeasonalRecommendations } from '@/data/places';
import { getGreeting, formatNumber, congestionEmoji } from '@/lib/utils';
import {
  HiHeart,
  HiShare,
  HiLocationMarker,
  HiClock,
  HiSun,
  HiFire,
  HiSparkles,
  HiArrowRight,
} from 'react-icons/hi';
import { useState, useEffect } from 'react';
import { Place } from '@/types';

function HeroSection() {
  const { preferences } = useStore();
  const greeting = getGreeting();
  const seasonEmoji = new Date().getMonth() >= 11 || new Date().getMonth() <= 1 ? '❄️' : '🌊';

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-jeju-primary/10 via-jeju-bg to-jeju-accent/10 px-5 pt-6 pb-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-2"
      >
        <h1 className="text-2xl font-bold text-jeju-text">
          {greeting} 👋
        </h1>
        <p className="mt-1 text-sm text-jeju-text-muted">
          {seasonEmoji} 지금 제주는 {getSeasonalRecommendations(new Date().getMonth() + 1)[0]?.name || '비자림'} 추천!
        </p>
      </motion.div>

      {/* Weather + AI CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-3 flex items-center gap-2"
      >
        <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs">
          <span>☀️</span>
          <span className="font-medium">22°C</span>
          <span className="text-jeju-text-muted">· 일몰 19:42</span>
        </div>
        <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs">
          <HiSparkles className="text-jeju-accent" />
          <span>AI 추천</span>
        </div>
      </motion.div>

      {/* Main CTA */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onClick={() => useStore.getState().setActiveTab('schedule')}
        className="mt-4 w-full rounded-2xl bg-jeju-primary p-4 text-white shadow-lg shadow-jeju-primary/25 transition-all active:scale-[0.98]"
      >
        <div className="flex items-center justify-between">
          <div className="text-left">
            <p className="text-sm font-medium opacity-90">AI 맞춤 코스</p>
            <p className="mt-0.5 text-lg font-bold">
              {preferences.travelStyle === 'healing' ? '힐링' :
               preferences.travelStyle === 'food' ? '미식' :
               preferences.travelStyle === 'active' ? '액티브' : '자연'} 여행 추천받기
            </p>
          </div>
          <HiArrowRight className="text-2xl" />
        </div>
      </motion.button>
    </div>
  );
}

function CardStack() {
  const [cards, setCards] = useState<Place[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const shuffled = [...places].sort(() => Math.random() - 0.5).slice(0, 8);
    setCards(shuffled);
  }, []);

  const handleSwipe = (dir: number) => {
    setDirection(dir);
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setDirection(0);
    }, 200);
  };

  if (cards.length === 0) return null;

  const currentCard = cards[currentIndex % cards.length];
  if (!currentCard) return null;

  return (
    <div className="px-5 py-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-jeju-text">
          <HiFire className="mr-1 inline text-jeju-accent" />
          오늘의 발견
        </h2>
        <button
          onClick={() => setActiveTab('discover')}
          className="text-xs font-medium text-jeju-primary"
        >
          더보기
        </button>
      </div>

      <motion.div
        key={currentCard.id}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: 1,
          x: direction * 300,
          rotate: direction * 10,
        }}
        exit={{ opacity: 0, x: direction * 300 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragEnd={(_, info) => {
          if (info.offset.x > 100) handleSwipe(1);
          else if (info.offset.x < -100) handleSwipe(-1);
        }}
        className="relative cursor-grab active:cursor-grabbing"
      >
        <GlassCard className="overflow-hidden">
          <div className="aspect-[16/9] bg-gradient-to-br from-jeju-primary/20 to-jeju-ocean/20 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl opacity-30">
                {currentCard.category === 'tourist' ? '🏝️' :
                 currentCard.category === 'restaurant' ? '🍽️' :
                 currentCard.category === 'stay' ? '🏨' : '🛍️'}
              </span>
            </div>
            <div className="absolute top-3 left-3">
              <CongestionBadge level={currentCard.congestionLevel} />
            </div>
            <div className="absolute top-3 right-3 glass rounded-full px-2 py-1">
              <span className="text-xs font-medium">
                {currentCard.region === 'jeju-si' ? '제주시' : '서귀포시'}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
              <h3 className="text-lg font-bold text-white drop-shadow-sm">
                {currentCard.name}
              </h3>
              <div className="mt-1 flex items-center gap-2 text-xs text-white/80">
                <span>{congestionEmoji(currentCard.congestionLevel)} 혼잡도 {currentCard.congestionScore}%</span>
                <span>·</span>
                <span>월 {formatNumber(currentCard.monthlyTrend[String(new Date().getMonth() + 1).padStart(2, '0')] || 0)}명</span>
              </div>
            </div>
          </div>
          <div className="p-3">
            <p className="text-xs text-jeju-text-muted leading-relaxed line-clamp-2">
              {currentCard.description}
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              {currentCard.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-jeju-bg px-2 py-0.5 text-[10px] text-jeju-text-muted"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Swipe hint */}
      <p className="mt-2 text-center text-[10px] text-jeju-text-muted">
        ← swipe to explore more places →
      </p>
    </div>
  );
}

function QuickActions() {
  const { setActiveTab } = useStore();

  const actions = [
    { icon: '🗺️', label: '실시간 혼잡도', tab: 'map' as const },
    { icon: '🌿', label: '시크릿 제주', tab: 'discover' as const },
    { icon: '📋', label: '내 일정', tab: 'schedule' as const },
    { icon: '💬', label: 'AI 여행비서', action: () => useStore.getState().setAIOpen(true) },
  ];

  return (
    <div className="px-5 pb-4">
      <h2 className="mb-3 text-lg font-bold text-jeju-text">빠른 메뉴</h2>
      <div className="grid grid-cols-4 gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => {
              if ('action' in action) (action as any).action();
              else setActiveTab((action as any).tab);
            }}
            className="flex flex-col items-center gap-1.5"
          >
            <div className="glass flex h-14 w-14 items-center justify-center rounded-2xl transition-all active:scale-90">
              <span className="text-2xl">{action.icon}</span>
            </div>
            <span className="text-[11px] font-medium text-jeju-text-muted">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function CongestionSummary() {
  const topCongested = [...places]
    .sort((a, b) => b.congestionScore - a.congestionScore)
    .slice(0, 3);
  const leastCongested = [...places]
    .sort((a, b) => a.congestionScore - b.congestionScore)
    .slice(0, 3);

  return (
    <div className="px-5 pb-6">
      <h2 className="mb-3 text-lg font-bold text-jeju-text">
        <HiSun className="mr-1 inline text-jeju-accent" />
        지금 제주 혼잡도
      </h2>

      <div className="glass rounded-2xl p-4">
        <div className="mb-3">
          <p className="mb-2 text-xs font-semibold text-red-500">
            🔥 지금 혼잡한 곳
          </p>
          <div className="space-y-2">
            {topCongested.map((place, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-jeju-text">
                    {place.name}
                  </span>
                </div>
                <CongestionBadge level={place.congestionLevel} size="sm" />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-3">
          <p className="mb-2 text-xs font-semibold text-green-500">
            🟢 지금 한적한 곳
          </p>
          <div className="space-y-2">
            {leastCongested.map((place, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm font-medium text-jeju-text">
                  {place.name}
                </span>
                <CongestionBadge level={place.congestionLevel} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function setActiveTab(tab: any) {
  useStore.getState().setActiveTab(tab);
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-jeju-bg">
      <HeroSection />
      <QuickActions />
      <CardStack />
      <CongestionSummary />
    </div>
  );
}

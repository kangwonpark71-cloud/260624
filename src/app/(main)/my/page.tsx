'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { useStore } from '@/store/useStore';
import {
  HiUser,
  HiCog,
  HiHeart,
  HiBookmark,
  HiStar,
  HiChartBar,
  HiLogout,
  HiChevronRight,
} from 'react-icons/hi';

function ProfileSection() {
  return (
    <div className="px-5 pt-6 pb-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-jeju-primary to-jeju-accent text-2xl text-white">
          👤
        </div>
        <div>
          <h1 className="text-xl font-bold text-jeju-text">제주 여행자</h1>
          <p className="text-xs text-jeju-text-muted">
            AI 맞춤 코스 3개 · 저장 12개
          </p>
        </div>
        <button className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-jeju-bg">
          <HiCog className="text-lg text-jeju-text-muted" />
        </button>
      </motion.div>
    </div>
  );
}

function TravelStats() {
  const stats = [
    { label: '방문한 곳', value: '0곳', emoji: '📍' },
    { label: '저장한 코스', value: '0개', emoji: '💾' },
    { label: '완료 챌린지', value: '0개', emoji: '🏆' },
    { label: '리뷰', value: '0개', emoji: '✍️' },
  ];

  return (
    <div className="px-5 pb-4">
      <div className="grid grid-cols-4 gap-2">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass flex flex-col items-center rounded-2xl py-3"
          >
            <span className="text-xl">{stat.emoji}</span>
            <span className="mt-1 text-sm font-bold text-jeju-text">{stat.value}</span>
            <span className="text-[9px] text-jeju-text-muted">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PreferencesCard() {
  const { preferences, setPreferences } = useStore();

  const styleLabels: Record<string, string> = {
    active: '🏃 액티브',
    healing: '🧘 힐링',
    food: '🍽️ 미식',
    nature: '🌿 자연',
    culture: '🏛️ 문화',
  };

  return (
    <div className="px-5 pb-4">
      <h2 className="mb-3 text-lg font-bold text-jeju-text">
        <HiChartBar className="mr-1 inline text-jeju-primary" />
        내 여행 취향
      </h2>
      <GlassCard className="divide-y divide-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm text-jeju-text-muted">여행 스타일</span>
          <span className="text-sm font-medium text-jeju-text">
            {styleLabels[preferences.travelStyle]}
          </span>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm text-jeju-text-muted">동행</span>
          <span className="text-sm font-medium text-jeju-text">
            {preferences.companion === 'solo' ? '🧑 혼자' :
             preferences.companion === 'couple' ? '💑 커플' :
             preferences.companion === 'family' ? '👨‍👩‍👧‍👦 가족' : '👫 친구'}
          </span>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm text-jeju-text-muted">혼잡도 허용</span>
          <span className="text-sm font-medium text-jeju-text">
            {preferences.congestionTolerance === 'low' ? '🟢 한적해야 함' :
             preferences.congestionTolerance === 'medium' ? '🟡 적당히' : '🔴 상관없음'}
          </span>
        </div>
      </GlassCard>
    </div>
  );
}

function QuickLinks() {
  const { setActiveTab } = useStore();
  const links = [
    { icon: '🌿', label: '시크릿 제주 보기', tab: 'discover' as const },
    { icon: '🗺️', label: '실시간 혼잡도', tab: 'map' as const },
    { icon: '📋', label: 'AI 코스 추천', tab: 'schedule' as const },
  ];

  return (
    <div className="px-5 pb-4">
      <h2 className="mb-3 text-lg font-bold text-jeju-text">바로가기</h2>
      <div className="space-y-2">
        {links.map((link, i) => (
          <motion.div
            key={link.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <GlassCard
              className="flex items-center justify-between p-3"
              onClick={() => setActiveTab(link.tab)}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{link.icon}</span>
                <span className="text-sm font-medium text-jeju-text">{link.label}</span>
              </div>
              <HiChevronRight className="text-jeju-text-muted" />
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ChallengeSection() {
  const challenges = [
    { title: '숨은 제주 발견', progress: 0, total: 5, emoji: '🌿' },
    { title: '오름 마스터', progress: 0, total: 3, emoji: '⛰️' },
    { title: '서귀포 탐방', progress: 0, total: 3, emoji: '📍' },
  ];

  return (
    <div className="px-5 pb-6">
      <h2 className="mb-3 text-lg font-bold text-jeju-text">
        🏆 제주 챌린지
      </h2>
      <div className="space-y-2">
        {challenges.map((ch) => (
          <GlassCard key={ch.title} className="p-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{ch.emoji}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-jeju-text">{ch.title}</span>
                  <span className="text-xs text-jeju-text-muted">
                    {ch.progress}/{ch.total}
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-jeju-bg">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(ch.progress / ch.total) * 100}%` }}
                    className="h-full rounded-full bg-jeju-primary"
                  />
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

export default function MyPage() {
  return (
    <div className="min-h-screen bg-jeju-bg">
      <ProfileSection />
      <TravelStats />
      <PreferencesCard />
      <QuickLinks />
      <ChallengeSection />
    </div>
  );
}

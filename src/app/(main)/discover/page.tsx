'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import CongestionBadge from '@/components/ui/CongestionBadge';
import { places } from '@/data/places';
import {
  HiHeart,
  HiShare,
  HiLocationMarker,
  HiSparkles,
  HiTrendingUp,
  HiFire,
} from 'react-icons/hi';
import { Place } from '@/types';

function SecretJejuSection() {
  const secretPlaces = places
    .filter((p) => p.congestionLevel === 'low' || p.congestionScore < 30)
    .slice(0, 5);

  return (
    <div className="px-5 pt-6 pb-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-3 flex items-center gap-2">
          <span className="text-xl">🌿</span>
          <div>
            <h2 className="text-lg font-bold text-jeju-text">시크릿 제주</h2>
            <p className="text-xs text-jeju-text-muted">
              데이터가 발견한 한적한 숨은 명소
            </p>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {secretPlaces.map((place, i) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="w-52 shrink-0"
            >
              <GlassCard className="overflow-hidden">
                <div className="aspect-[4/3] bg-gradient-to-br from-jeju-oreum/20 to-jeju-primary/20 flex items-center justify-center relative">
                  <span className="text-4xl opacity-30">
                    {place.category === 'tourist' ? '🏝️' : '🍽️'}
                  </span>
                  <div className="absolute top-2 left-2">
                    <CongestionBadge level={place.congestionLevel} size="sm" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent p-3">
                    <h3 className="text-sm font-bold text-white">{place.name}</h3>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-[11px] text-jeju-text-muted line-clamp-2">
                    {place.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {place.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-jeju-bg px-1.5 py-0.5 text-[9px] text-jeju-text-muted"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-[10px] text-green-600">
                    <span>🟢 혼잡도 {place.congestionScore}%</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function TrendingSection() {
  const trending = [...places]
    .sort((a, b) => {
      const aGrowth = a.monthlyTrend['12'] - a.monthlyTrend['08'];
      const bGrowth = b.monthlyTrend['12'] - b.monthlyTrend['08'];
      return bGrowth - aGrowth;
    })
    .slice(0, 5);

  return (
    <div className="px-5 pb-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="mb-3 flex items-center gap-2">
          <HiTrendingUp className="text-xl text-jeju-accent" />
          <div>
            <h2 className="text-lg font-bold text-jeju-text">뜨는 제주</h2>
            <p className="text-xs text-jeju-text-muted">요즘 사람들이 몰리는 곳</p>
          </div>
        </div>

        <div className="space-y-2">
          {trending.map((place, i) => {
            const growth =
              ((place.monthlyTrend['12'] - place.monthlyTrend['08']) /
                place.monthlyTrend['08']) *
              100;
            return (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <GlassCard className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-jeju-accent/20 to-jeju-primary/20 text-lg font-bold text-jeju-accent">
                      {i + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-jeju-text">
                        {place.name}
                      </h3>
                      <div className="mt-0.5 flex items-center gap-2 text-[10px] text-jeju-text-muted">
                        <span>{place.category === 'tourist' ? '관광지' : place.category === 'restaurant' ? '음식점' : place.category === 'stay' ? '숙박' : '쇼핑'}</span>
                        <span>·</span>
                        <span>{place.region === 'jeju-si' ? '제주시' : '서귀포시'}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-red-500">
                        +{growth > 1000 ? `${(growth / 100).toFixed(0)}x` : `${growth.toFixed(0)}%`}
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

function CategoryGrid() {
  const categories = [
    { name: '관광지', emoji: '🏝️', count: places.filter((p) => p.category === 'tourist').length, color: 'from-blue-400 to-cyan-400' },
    { name: '음식점', emoji: '🍽️', count: places.filter((p) => p.category === 'restaurant').length, color: 'from-orange-400 to-red-400' },
    { name: '숙박', emoji: '🏨', count: places.filter((p) => p.category === 'stay').length, color: 'from-purple-400 to-pink-400' },
    { name: '쇼핑', emoji: '🛍️', count: places.filter((p) => p.category === 'shopping').length, color: 'from-green-400 to-emerald-400' },
  ];

  return (
    <div className="px-5 pb-4">
      <h2 className="mb-3 text-lg font-bold text-jeju-text">카테고리</h2>
      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat) => (
          <GlassCard key={cat.name} className="p-4">
            <div className="flex items-center gap-3">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${cat.color} text-2xl`}>
                {cat.emoji}
              </div>
              <div>
                <h3 className="font-bold text-jeju-text">{cat.name}</h3>
                <p className="text-xs text-jeju-text-muted">{cat.count}곳</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-jeju-bg">
      <div className="px-5 pt-6 pb-2">
        <h1 className="text-xl font-bold text-jeju-text">
          <HiCompass className="mr-1 inline text-jeju-primary" />
          발견
        </h1>
        <p className="mt-1 text-xs text-jeju-text-muted">
          데이터가 찾아낸 제주의 새로운 매력
        </p>
      </div>
      <SecretJejuSection />
      <TrendingSection />
      <CategoryGrid />
    </div>
  );
}

function HiCompass({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      width={20}
      height={20}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.712 4.33a9 9 0 0 1 3.65 3.65m-3.65-3.65a9 9 0 0 0-3.65-3.65m3.65 3.65L12 12m-4.712-7.67a9 9 0 0 0-3.65 3.65m3.65-3.65L12 12m-7.67 4.712a9 9 0 0 0 3.65 3.65m-3.65-3.65L12 12m7.67 4.712a9 9 0 0 1-3.65 3.65m3.65-3.65L12 12"
      />
    </svg>
  );
}

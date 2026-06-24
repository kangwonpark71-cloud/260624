'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiSearch,
  HiLocationMarker,
  HiAdjustments,
  HiChevronRight,
} from 'react-icons/hi';
import GlassCard from '@/components/ui/GlassCard';
import CongestionBadge from '@/components/ui/CongestionBadge';
import { places } from '@/data/places';
import { congestionEmoji, formatNumber, congestionText } from '@/lib/utils';
import { Place, CongestionLevel } from '@/types';

function MapPlaceholder() {
  return (
    <div className="relative h-[45vh] w-full overflow-hidden bg-gradient-to-br from-jeju-ocean/30 via-jeju-primary/20 to-jeju-oreum/20">
      {/* Decorative map elements */}
      <div className="absolute inset-0 opacity-10">
        <svg viewBox="0 0 400 300" className="h-full w-full">
          <circle cx="200" cy="150" r="100" fill="none" stroke="#00B7A8" strokeWidth="0.5" />
          <circle cx="200" cy="150" r="70" fill="none" stroke="#00B7A8" strokeWidth="0.5" />
          <circle cx="200" cy="150" r="40" fill="none" stroke="#00B7A8" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Map markers */}
      {places.slice(0, 12).map((place, i) => {
        const angle = (i / 12) * 2 * Math.PI;
        const radius = 20 + Math.random() * 30;
        const left = 50 + Math.cos(angle) * radius;
        const top = 50 + Math.sin(angle) * radius * 0.7;
        return (
          <MapMarker
            key={place.id}
            style={{ left: `${left}%`, top: `${top}%` }}
            place={place}
          />
        );
      })}

      {/* Search overlay */}
      <div className="absolute left-0 right-0 top-0 z-10 p-4 pt-6">
        <div className="glass-strong flex items-center gap-2 rounded-2xl px-4 py-2.5">
          <HiSearch className="text-lg text-jeju-text-muted" />
          <input
            placeholder="장소, 지역 검색..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-jeju-text-muted"
          />
          <HiAdjustments className="text-lg text-jeju-primary" />
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 right-3 z-10">
        <div className="glass inline-flex items-center gap-3 rounded-full px-3 py-1.5 text-[10px]">
          <span><span className="text-green-500">🟢</span> 여유</span>
          <span><span className="text-yellow-500">🟡</span> 보통</span>
          <span><span className="text-orange-500">🟠</span> 혼잡</span>
          <span><span className="text-red-500">🔥</span> 매우혼잡</span>
        </div>
      </div>
    </div>
  );
}

function MapMarker({ style, place }: { style: React.CSSProperties; place: Place }) {
  const [isHovered, setIsHovered] = useState(false);
  const colorMap: Record<CongestionLevel, string> = {
    low: 'bg-green-500',
    mid: 'bg-yellow-500',
    high: 'bg-orange-500',
    very_high: 'bg-red-500',
  };

  return (
    <div
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{ scale: isHovered ? 1.2 : 1 }}
        className={`flex items-center justify-center w-6 h-6 rounded-full shadow-lg ${colorMap[place.congestionLevel]} text-white text-xs font-bold`}
      >
        {congestionEmoji(place.congestionLevel)}
      </motion.div>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-1/2 -translate-x-1/2 top-8 whitespace-nowrap glass-strong rounded-lg px-2 py-1 text-[10px] font-medium"
        >
          {place.name}
        </motion.div>
      )}
    </div>
  );
}

function PlaceList() {
  const [filter, setFilter] = useState<{
    category: string;
    region: string;
    congestion: string;
  }>({ category: 'all', region: 'all', congestion: 'all' });
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = places.filter((p) => {
    if (filter.category !== 'all' && p.category !== filter.category) return false;
    if (filter.region !== 'all' && p.region !== filter.region) return false;
    if (filter.congestion !== 'all' && p.congestionLevel !== filter.congestion) return false;
    if (searchQuery && !p.name.includes(searchQuery) && !p.tags.some((t) => t.includes(searchQuery))) return false;
    return true;
  });

  return (
    <div className="px-4 py-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-bold text-jeju-text">주변 장소</h2>
        <span className="text-xs text-jeju-text-muted">총 {filtered.length}곳</span>
      </div>

      {/* Filters */}
      <div className="mb-3 flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {[
          { label: '전체', value: 'all' },
          { label: '관광지', value: 'tourist' },
          { label: '음식점', value: 'restaurant' },
          { label: '숙박', value: 'stay' },
          { label: '쇼핑', value: 'shopping' },
        ].map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter({ ...filter, category: f.value })}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
              filter.category === f.value
                ? 'bg-jeju-primary text-white'
                : 'glass text-jeju-text-muted'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Place cards */}
      <div className="space-y-2">
        {filtered.map((place) => (
          <GlassCard key={place.id} className="p-3">
            <div className="flex items-start gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-jeju-primary/20 to-jeju-accent/20 text-2xl">
                {place.category === 'tourist' ? '🏝️' :
                 place.category === 'restaurant' ? '🍽️' :
                 place.category === 'stay' ? '🏨' : '🛍️'}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-jeju-text line-clamp-1">
                    {place.name}
                  </h3>
                  <CongestionBadge level={place.congestionLevel} size="sm" />
                </div>
                <p className="mt-0.5 text-xs text-jeju-text-muted line-clamp-1">
                  {place.address}
                </p>
                <div className="mt-1 flex items-center gap-2 text-[10px] text-jeju-text-muted">
                  <span>{place.region === 'jeju-si' ? '📍 제주시' : '📍 서귀포시'}</span>
                  <span>·</span>
                  <span>혼잡도 {place.congestionScore}%</span>
                  <span>·</span>
                  <span>월 {formatNumber(Object.values(place.monthlyTrend)[0])}명</span>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

export default function MapPage() {
  return (
    <div className="min-h-screen bg-jeju-bg">
      <MapPlaceholder />
      <PlaceList />
    </div>
  );
}

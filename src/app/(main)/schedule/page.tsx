'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import CongestionBadge from '@/components/ui/CongestionBadge';
import { places } from '@/data/places';
import {
  HiPlus,
  HiTrash,
  HiShare,
  HiCalendar,
  HiLocationMarker,
  HiClock,
  HiSun,
  HiChevronDown,
  HiChevronUp,
  HiSparkles,
} from 'react-icons/hi';
import { Place, CourseDay, CoursePlace, UserPreferences } from '@/types';

function PreferencesStep({
  onComplete,
}: {
  onComplete: (prefs: UserPreferences) => void;
}) {
  const [step, setStep] = useState(0);
  const [prefs, setPrefs] = useState<UserPreferences>({
    travelStyle: 'nature',
    companion: 'couple',
    duration: '2night',
    preferredRegion: 'any',
    congestionTolerance: 'medium',
  });

  const steps = [
    {
      title: '여행 스타일은?',
      emoji: '🎯',
      key: 'travelStyle' as const,
      options: [
        { value: 'active', label: '액티브', emoji: '🏃' },
        { value: 'healing', label: '힐링', emoji: '🧘' },
        { value: 'food', label: '미식', emoji: '🍽️' },
        { value: 'nature', label: '자연', emoji: '🌿' },
        { value: 'culture', label: '문화', emoji: '🏛️' },
      ],
    },
    {
      title: '누구와 함께?',
      emoji: '👥',
      key: 'companion' as const,
      options: [
        { value: 'solo', label: '혼자', emoji: '🧑' },
        { value: 'couple', label: '커플', emoji: '💑' },
        { value: 'family', label: '가족', emoji: '👨‍👩‍👧‍👦' },
        { value: 'friends', label: '친구', emoji: '👫' },
      ],
    },
    {
      title: '얼마나 머물까요?',
      emoji: '📅',
      key: 'duration' as const,
      options: [
        { value: '1night', label: '1박 2일', emoji: '🌙' },
        { value: '2night', label: '2박 3일', emoji: '🌙🌙' },
        { value: '3night+', label: '3박 이상', emoji: '🌙🌙🌙' },
      ],
    },
  ];

  const current = steps[step];
  if (!current) {
    onComplete(prefs);
    return null;
  }

  return (
    <div className="px-5 pt-8 pb-4">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-center"
      >
        <span className="text-4xl">{current.emoji}</span>
        <h2 className="mt-3 text-xl font-bold text-jeju-text">{current.title}</h2>

        <div className="mt-6 flex flex-col gap-2">
          {current.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setPrefs({ ...prefs, [current.key]: opt.value as any });
                setStep(step + 1);
              }}
              className="glass flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-all active:scale-[0.98]"
            >
              <span className="text-2xl">{opt.emoji}</span>
              <span className="font-semibold text-jeju-text">{opt.label}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function GeneratedCourse({ prefs }: { prefs: UserPreferences }) {
  const [expandedDay, setExpandedDay] = useState(0);

  const durationDays =
    prefs.duration === '1night' ? 2 : prefs.duration === '2night' ? 3 : 4;

  // Generate mock course based on preferences
  const generateCourse = (): CourseDay[] => {
    const days: CourseDay[] = [];
    for (let d = 0; d < durationDays; d++) {
      const dayPlaces: CoursePlace[] = [];
      const dayPlacesRaw = places.slice(d * 4, d * 4 + 4);
      dayPlacesRaw.forEach((p, i) => {
        dayPlaces.push({
          place: p,
          order: i,
          arrivalTime: `${9 + i * 2}:00`,
          stayDuration: 90 + i * 30,
          congestionAtTime: p.congestionLevel,
        });
      });
      days.push({
        day: d + 1,
        places: dayPlaces,
        totalCongestionScore: 35 + d * 5,
        totalDistance: 25 + d * 10,
      });
    }
    return days;
  };

  const course = generateCourse();

  return (
    <div className="px-5 py-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-jeju-text">
              <HiSparkles className="mr-1 inline text-jeju-accent" />
              AI 추천 코스
            </h2>
            <p className="text-xs text-jeju-text-muted">
              {prefs.companion === 'couple' ? '💑 커플' :
               prefs.companion === 'family' ? '👨‍👩‍👧‍👦 가족' :
               prefs.companion === 'friends' ? '👫 친구' : '🧑 혼자'} 여행 ·{' '}
              {prefs.travelStyle === 'healing' ? '힐링' :
               prefs.travelStyle === 'food' ? '미식' :
               prefs.travelStyle === 'active' ? '액티브' : '자연'} 스타일
            </p>
          </div>
          <button className="flex items-center gap-1 rounded-full bg-jeju-primary px-3 py-1.5 text-xs text-white">
            <HiShare /> 공유
          </button>
        </div>

        <div className="mb-3 flex items-center gap-2">
          <div className="glass rounded-full px-3 py-1 text-[10px]">
            🟢 예상 혼잡도: 대부분 여유
          </div>
          <div className="glass rounded-full px-3 py-1 text-[10px]">
            📍 총 {course.reduce((a, d) => a + d.places.length, 0)}곳
          </div>
        </div>

        {/* Day timeline */}
        {course.map((day) => (
          <GlassCard key={day.day} className="mb-3 overflow-hidden">
            <button
              onClick={() => setExpandedDay(expandedDay === day.day ? -1 : day.day)}
              className="flex w-full items-center justify-between bg-jeju-primary/5 px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <HiCalendar className="text-jeju-primary" />
                <span className="font-bold text-jeju-text">
                  Day {day.day}
                </span>
                <span className="text-xs text-jeju-text-muted">
                  · {day.places.length}곳 · {day.totalDistance}km
                </span>
              </div>
              {expandedDay === day.day ? (
                <HiChevronUp className="text-jeju-text-muted" />
              ) : (
                <HiChevronDown className="text-jeju-text-muted" />
              )}
            </button>

            <AnimatePresence>
              {expandedDay === day.day && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="relative px-4 py-3">
                    {/* Timeline line */}
                    <div className="absolute left-[26px] top-4 bottom-4 w-0.5 bg-jeju-primary/20" />

                    {day.places.map((cp, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative mb-4 ml-8 last:mb-0"
                      >
                        {/* Timeline dot */}
                        <div className="absolute -left-8 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-jeju-primary text-[10px] text-white">
                          {i + 1}
                        </div>

                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-sm font-semibold text-jeju-text">
                              {cp.place.name}
                            </h4>
                            <div className="mt-0.5 flex items-center gap-2 text-[10px] text-jeju-text-muted">
                              <span>⏰ {cp.arrivalTime}</span>
                              <span>·</span>
                              <span>📍 {cp.place.region === 'jeju-si' ? '제주시' : '서귀포시'}</span>
                            </div>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {cp.place.tags.slice(0, 2).map((t) => (
                                <span key={t} className="rounded-full bg-jeju-bg px-1.5 py-0.5 text-[9px] text-jeju-text-muted">
                                  #{t}
                                </span>
                              ))}
                            </div>
                          </div>
                          <CongestionBadge level={cp.congestionAtTime} size="sm" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        ))}
      </motion.div>
    </div>
  );
}

export default function SchedulePage() {
  const [preferencesSet, setPreferencesSet] = useState(false);
  const [prefs, setPrefs] = useState<UserPreferences | null>(null);

  const handleComplete = (p: UserPreferences) => {
    setPrefs(p);
    setPreferencesSet(true);
  };

  if (!preferencesSet || !prefs) {
    return (
      <div className="min-h-screen bg-jeju-bg">
        <div className="px-5 pt-6 pb-2">
          <h1 className="text-xl font-bold text-jeju-text">
            AI 여행 플래너
          </h1>
          <p className="mt-1 text-xs text-jeju-text-muted">
            간단한 질문에 답하면 최적의 코스를 만들어드려요
          </p>
        </div>
        <PreferencesStep onComplete={handleComplete} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-jeju-bg">
      <GeneratedCourse prefs={prefs} />
    </div>
  );
}

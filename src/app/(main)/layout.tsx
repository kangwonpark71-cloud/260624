'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import BottomNav from '@/components/layout/BottomNav';
import FloatingAI from '@/components/ui/FloatingAI';
import HomePage from '@/app/(main)/page';
import MapPage from '@/app/(main)/map/page';
import SchedulePage from '@/app/(main)/schedule/page';
import DiscoverPage from '@/app/(main)/discover/page';
import MyPage from '@/app/(main)/my/page';

const pages = {
  home: HomePage,
  map: MapPage,
  schedule: SchedulePage,
  discover: DiscoverPage,
  my: MyPage,
} as const;

export default function MainLayout() {
  const { activeTab } = useStore();
  const PageComponent = pages[activeTab];

  return (
    <div className="relative mx-auto min-h-screen max-w-lg bg-jeju-bg">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.15 }}
          className="pb-24"
        >
          <PageComponent />
        </motion.div>
      </AnimatePresence>

      <FloatingAI />
      <BottomNav />
    </div>
  );
}

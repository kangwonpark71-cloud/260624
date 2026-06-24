'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { HiChat, HiX, HiPaperAirplane } from 'react-icons/hi';

export default function FloatingAI() {
  const { isAIOpen, setAIOpen, aiMessages, addAIMessage } = useStore();
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    addAIMessage({ role: 'user', text: input });
    setInput('');

    // Simulated AI response
    setTimeout(() => {
      const responses = [
        '지금 성산일출봉은 혼잡해요. 대신 우도나 지미봉을 추천합니다! 🌊',
        '오늘 날씨가 맑아서 한라산 영실코스 걷기 좋아요. 오전 9시 전에 도착하면 한적해요! 🏔️',
        '주변에 한적한 흑돼지 맛집을 찾고 계신가요? 서귀포시 중문동에 현지인 추천 맛집이 있어요! 🐷',
        '8월에 아이와 가기 좋은 곳: 비자림🌿, 휴애리자연생활공원, 카멜리아힐 모두 한적해요!',
      ];
      addAIMessage({
        role: 'ai',
        text: responses[Math.floor(Math.random() * responses.length)],
      });
    }, 800);
  };

  return (
    <>
      {/* FAB Button */}
      <motion.button
        onClick={() => setAIOpen(!isAIOpen)}
        className="fixed bottom-24 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-jeju-primary text-white shadow-lg shadow-jeju-primary/30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -4, 0] }}
        transition={{ y: { repeat: Infinity, duration: 2, ease: 'easeInOut' } }}
      >
        {isAIOpen ? <HiX className="text-xl" /> : <HiChat className="text-xl" />}
      </motion.button>

      {/* AI Chat Panel */}
      <AnimatePresence>
        {isAIOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-40 right-4 z-50 w-[340px] max-w-[calc(100vw-32px)]"
          >
            <div className="glass-strong rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-2 bg-jeju-primary px-4 py-3 text-white">
                <span className="text-lg">🟢</span>
                <span className="font-semibold text-sm">제주 AI</span>
                <span className="text-xs opacity-70">· 실시간</span>
              </div>

              {/* Messages */}
              <div className="flex h-[320px] flex-col gap-2 overflow-y-auto p-3">
                {aiMessages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                        msg.role === 'user'
                          ? 'bg-jeju-primary text-white'
                          : 'bg-jeju-bg text-jeju-text'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input */}
              <div className="flex items-center gap-2 border-t border-white/10 p-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="여행 질문하기..."
                  className="flex-1 rounded-xl bg-jeju-bg px-3 py-2 text-sm outline-none placeholder:text-jeju-text-muted"
                />
                <button
                  onClick={handleSend}
                  className="touch-btn rounded-xl bg-jeju-primary p-2 text-white"
                >
                  <HiPaperAirplane className="text-lg" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

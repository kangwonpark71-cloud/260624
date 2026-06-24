'use client';

import { motion } from 'framer-motion';
import { getWeatherEmoji } from '@/lib/utils';
import { WeatherInfo } from '@/types';

interface WeatherWidgetProps {
  weather: WeatherInfo;
}

export default function WeatherWidget({ weather }: WeatherWidgetProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass inline-flex items-center gap-3 rounded-full px-4 py-2"
    >
      <span className="text-xl">{getWeatherEmoji(weather.condition)}</span>
      <span className="text-sm font-semibold text-jeju-text">
        {weather.temp}°C
      </span>
      <span className="text-xs text-jeju-text-muted">
        · 일몰 {weather.sunset}
      </span>
      <span className="text-xs text-jeju-text-muted">
        · 풍속 {weather.windSpeed}m/s
      </span>
    </motion.div>
  );
}

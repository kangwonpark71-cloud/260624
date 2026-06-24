'use client';

import { CongestionLevel } from '@/types';
import { congestionText, congestionEmoji, congestionBadgeClass } from '@/lib/utils';

interface CongestionBadgeProps {
  level: CongestionLevel;
  size?: 'sm' | 'md' | 'lg';
  showEmoji?: boolean;
}

export default function CongestionBadge({
  level,
  size = 'sm',
  showEmoji = true,
}: CongestionBadgeProps) {
  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5',
    md: 'text-xs px-2 py-1',
    lg: 'text-sm px-3 py-1.5',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${congestionBadgeClass(level)} ${sizeClasses[size]}`}
    >
      {showEmoji && <span>{congestionEmoji(level)}</span>}
      {congestionText(level)}
    </span>
  );
}

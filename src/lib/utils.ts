import { CongestionLevel, Place, WeatherInfo } from '@/types';

/** Format congestion level to display text */
export function congestionText(level: CongestionLevel): string {
  const map: Record<CongestionLevel, string> = {
    low: '여유',
    mid: '보통',
    high: '혼잡',
    very_high: '매우혼잡',
  };
  return map[level];
}

/** Format congestion level to emoji + color class */
export function congestionEmoji(level: CongestionLevel): string {
  const map: Record<CongestionLevel, string> = {
    low: '🟢',
    mid: '🟡',
    high: '🟠',
    very_high: '🔥',
  };
  return map[level];
}

/** Get Tailwind badge class for congestion */
export function congestionBadgeClass(level: CongestionLevel): string {
  const map: Record<CongestionLevel, string> = {
    low: 'badge-low',
    mid: 'badge-mid',
    high: 'badge-high',
    very_high: 'badge-very-high',
  };
  return map[level];
}

/** Format number with commas */
export function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

/** Calculate distance between two coordinates (km) */
export function calcDistance(
  lat1: number, lon1: number,
  lat2: number, lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/** Get recommended time to visit based on congestion pattern */
export function getBestTimeToVisit(place: Place): string {
  // Simplified logic - in production this uses the congestion data model
  const weekendRatio = place.weekendRatio;
  if (weekendRatio < 0.25) return '주말 오전';
  if (weekendRatio < 0.35) return '평일 오전';
  return '평일 오후';
}

/** Get alternative places when a place is crowded */
export function getAlternatives(
  place: Place,
  allPlaces: Place[]
): Place[] {
  const sameRegion = allPlaces.filter(
    (p) => p.id !== place.id && p.region === place.region
  );
  const lessCrowded = sameRegion
    .filter((p) => {
      const levelOrder = { low: 0, mid: 1, high: 2, very_high: 3 };
      return (
        levelOrder[p.congestionLevel] < levelOrder[place.congestionLevel]
      );
    })
    .slice(0, 3);

  if (lessCrowded.length >= 2) return lessCrowded;

  // Fallback: same category, different region
  const sameCategory = allPlaces.filter(
    (p) => p.id !== place.id && p.category === place.category
  );
  return sameCategory.slice(0, 3);
}

/** Generate a time-based greeting */
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 6) return '늦은 밤';
  if (hour < 10) return '좋은 아침';
  if (hour < 12) return '즐거운 오전';
  if (hour < 14) return '따뜻한 오후';
  if (hour < 18) return '즐거운 오후';
  if (hour < 21) return '아름다운 저녁';
  return '평온한 밤';
}

/** Get weather icon based on condition */
export function getWeatherEmoji(condition: WeatherInfo['condition']): string {
  const map = {
    sunny: '☀️',
    cloudy: '☁️',
    rainy: '🌧️',
    snowy: '❄️',
    windy: '🌬️',
  };
  return map[condition];
}

/** Generate a shareable course URL */
export function generateShareUrl(courseId: string): string {
  return `${window.location.origin}/course/${courseId}`;
}

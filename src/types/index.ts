export type Category = 'tourist' | 'restaurant' | 'stay' | 'shopping';
export type CongestionLevel = 'low' | 'mid' | 'high' | 'very_high';
export type TravelStyle = 'active' | 'healing' | 'food' | 'nature' | 'culture';
export type Companion = 'solo' | 'couple' | 'family' | 'friends';
export type Duration = 'day' | '1night' | '2night' | '3night+';
export type Region = 'jeju-si' | 'seogwipo-si' | 'any';

export interface Place {
  id: string;
  name: string;
  category: Category;
  address: string;
  region: Region;
  latitude: number;
  longitude: number;
  imageUrl: string;
  description: string;
  congestionLevel: CongestionLevel;
  congestionScore: number; // 0-100
  weekendRatio: number; // 0-1
  monthlyTrend: Record<string, number>; // month -> visitors
  tags: string[];
}

export interface CongestionData {
  placeId: string;
  dayOfWeek: number; // 0=Mon, 6=Sun
  hour: number;
  level: CongestionLevel;
  visitors: number;
  predicted: boolean;
}

export interface CourseDay {
  day: number;
  places: CoursePlace[];
  totalCongestionScore: number;
  totalDistance: number;
}

export interface CoursePlace {
  place: Place;
  order: number;
  arrivalTime: string;
  stayDuration: number; // minutes
  congestionAtTime: CongestionLevel;
}

export interface UserCourse {
  id: string;
  name: string;
  days: CourseDay[];
  duration: Duration;
  style: TravelStyle;
  companion: Companion;
  createdAt: string;
}

export interface UserPreferences {
  travelStyle: TravelStyle;
  companion: Companion;
  duration: Duration;
  preferredRegion: Region;
  congestionTolerance: 'high' | 'medium' | 'low';
}

export interface AIRecommendation {
  title: string;
  subtitle: string;
  places: Place[];
  reason: string;
  congestionSummary: string;
}

export interface WeatherInfo {
  temp: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'windy';
  humidity: number;
  windSpeed: number;
  sunset: string;
}

export type NavTab = 'home' | 'map' | 'schedule' | 'discover' | 'my';

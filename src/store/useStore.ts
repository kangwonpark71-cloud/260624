'use client';

import { create } from 'zustand';
import {
  NavTab,
  UserPreferences,
  UserCourse,
  AIRecommendation,
  WeatherInfo,
  Place,
} from '@/types';

interface AppState {
  // Navigation
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;

  // User Preferences
  preferences: UserPreferences;
  setPreferences: (prefs: Partial<UserPreferences>) => void;

  // Courses
  savedCourses: UserCourse[];
  addCourse: (course: UserCourse) => void;
  removeCourse: (id: string) => void;

  // AI Recommendations
  currentRecommendation: AIRecommendation | null;
  setRecommendation: (rec: AIRecommendation) => void;

  // Weather
  weather: WeatherInfo | null;
  setWeather: (weather: WeatherInfo) => void;

  // Selected Place
  selectedPlace: Place | null;
  setSelectedPlace: (place: Place | null) => void;

  // AI Assistant
  isAIOpen: boolean;
  setAIOpen: (open: boolean) => void;
  aiMessages: { role: 'user' | 'ai'; text: string }[];
  addAIMessage: (msg: { role: 'user' | 'ai'; text: string }) => void;

  // UI State
  isMapLoading: boolean;
  setMapLoading: (loading: boolean) => void;
}

const defaultPreferences: UserPreferences = {
  travelStyle: 'nature',
  companion: 'couple',
  duration: '2night',
  preferredRegion: 'any',
  congestionTolerance: 'medium',
};

export const useStore = create<AppState>((set) => ({
  // Navigation
  activeTab: 'home',
  setActiveTab: (tab) => set({ activeTab: tab }),

  // User Preferences
  preferences: defaultPreferences,
  setPreferences: (prefs) =>
    set((state) => ({
      preferences: { ...state.preferences, ...prefs },
    })),

  // Courses
  savedCourses: [],
  addCourse: (course) =>
    set((state) => ({
      savedCourses: [...state.savedCourses, { ...course, id: crypto.randomUUID() }],
    })),
  removeCourse: (id) =>
    set((state) => ({
      savedCourses: state.savedCourses.filter((c) => c.id !== id),
    })),

  // AI Recommendations
  currentRecommendation: null,
  setRecommendation: (rec) => set({ currentRecommendation: rec }),

  // Weather
  weather: null,
  setWeather: (weather) => set({ weather }),

  // Selected Place
  selectedPlace: null,
  setSelectedPlace: (place) => set({ selectedPlace: place }),

  // AI Assistant
  isAIOpen: false,
  setAIOpen: (open) => set({ isAIOpen: open }),
  aiMessages: [
    {
      role: 'ai',
      text: '안녕하세요! 제주 여행 도우미 제주피디아입니다. 궁금하신 여행 정보를 물어보세요! 🏝️',
    },
  ],
  addAIMessage: (msg) =>
    set((state) => ({
      aiMessages: [...state.aiMessages, msg],
    })),

  // UI State
  isMapLoading: false,
  setMapLoading: (loading) => set({ isMapLoading: loading }),
}));

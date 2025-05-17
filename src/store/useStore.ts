import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SearchHistoryWeatherData } from '../types/openWeatherMapTypes';

type State = {
    theme: 'light' | 'dark';
    searchHistory: SearchHistoryWeatherData[];
    setTheme: (theme: 'light' | 'dark') => void;
    addToSearchHistory: (item: Omit<SearchHistoryWeatherData, 'timestamp'>) => void;
    clearSearchHistory: () => void;
    removeFromSearchHistory: (id: number) => void;
};

export const useGlobalStore = create<State>()(
    persist(
        (set) => ({
            theme: 'light',
            searchHistory: [],
            setTheme: (theme) => set({ theme }),
            addToSearchHistory: (item) => set((state) => {
                const existingIndex = state.searchHistory.findIndex(historyItem => historyItem.id === item.id);
                if (existingIndex !== -1) {
                    // Remove the existing item and add it to the top with new timestamp
                    const updatedHistory = [...state.searchHistory];
                    updatedHistory.splice(existingIndex, 1);
                    return {
                        searchHistory: [
                            { ...item, timestamp: Date.now() },
                            ...updatedHistory
                        ]
                    };
                }
                // If no existing item found, add as new entry
                return {
                    searchHistory: [
                        { ...item, timestamp: Date.now() },
                        ...state.searchHistory
                    ]
                };
            }),
            clearSearchHistory: () => set({ searchHistory: [] }),
            removeFromSearchHistory: (id) => set((state) => ({
                searchHistory: state.searchHistory.filter(item => item.id !== id)
            })),
        }),
        { name: 'aquariux-weather-app-data' } // key in localStorage
    )
);
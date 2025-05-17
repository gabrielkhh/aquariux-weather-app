import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SearchHistoryItem = {
    id: number
    name: string;
    country: string;
    lat: number;
    lon: number;
    timestamp: number;
};

type State = {
    theme: 'light' | 'dark';
    searchHistory: SearchHistoryItem[];
    setTheme: (theme: 'light' | 'dark') => void;
    addToSearchHistory: (item: Omit<SearchHistoryItem, 'timestamp'>) => void;
    clearSearchHistory: () => void;
    removeFromSearchHistory: (id: number) => void;
};

export const useGlobalStore = create<State>()(
    persist(
        (set) => ({
            theme: 'light',
            searchHistory: [],
            setTheme: (theme) => set({ theme }),
            addToSearchHistory: (item) => set((state) => ({
                searchHistory: [
                    { ...item, timestamp: Date.now() },
                    ...state.searchHistory
                ]
            })),
            clearSearchHistory: () => set({ searchHistory: [] }),
            removeFromSearchHistory: (id) => set((state) => ({
                searchHistory: state.searchHistory.filter(item => item.id !== id)
            })),
        }),
        { name: 'aquariux-weather-app-data' } // key in localStorage
    )
);
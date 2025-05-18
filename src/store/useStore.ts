import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Coordinates, LocationCountryInfo, LocationInformation, PageView, SearchHistoryWeatherData, Theme, Units } from '../types/store';
import { DEFAULT_LOCATION_SINGAPORE } from '../constants';

type State = {
    theme: Theme;
    searchHistory: SearchHistoryWeatherData[];
    currentLocation: LocationInformation;
    preferredUnits: Units;
    currentView: PageView;
    autoLocateIsSet: boolean;
    setTheme: (theme: Theme) => void;
    setCurrentView: (view: PageView) => void;
    setCurrentLocation: (location: LocationInformation) => void;
    setCurrentLocationCountryInfo: (countryInfo: LocationCountryInfo) => void;
    setCurrentLocationCoordinates: (coordinates: Coordinates) => void;
    setCurrentLocationTimezoneOffset: (timezoneOffset: number) => void;
    setPreferredUnits: (unit: Units) => void;
    setAutoLocateIsSet: (flag: boolean) => void;
    addToSearchHistory: (item: Omit<SearchHistoryWeatherData, 'timestamp'>) => void;
    clearSearchHistory: () => void;
    removeFromSearchHistory: (id: number) => void;
};

export const useGlobalStore = create<State>()(
    persist(
        (set) => ({
            theme: 'light',
            searchHistory: [],
            currentLocation: {
                lat: DEFAULT_LOCATION_SINGAPORE.coord.lat,
                lon: DEFAULT_LOCATION_SINGAPORE.coord.lon,
                name: DEFAULT_LOCATION_SINGAPORE.name,
                country: DEFAULT_LOCATION_SINGAPORE.sys.country,
                timezoneOffset: 28800
            },
            autoLocateIsSet: false,
            preferredUnits: "metric",
            currentView: "home",
            setTheme: (theme) => set({ theme }),
            setCurrentView: (view) => set({ currentView: view }),
            setCurrentLocation: (location) => set({ currentLocation: location }),
            setCurrentLocationCountryInfo: (countryInfo) => set((state) => {
                return {
                    currentLocation: {
                        ...state.currentLocation,
                        name: countryInfo.name,
                        country: countryInfo.country
                    }
                }
            }),
            setCurrentLocationCoordinates: (coordinates) => set((state) => {
                return {
                    currentLocation: {
                        ...state.currentLocation,
                        lat: coordinates.lat,
                        lon: coordinates.lon
                    }
                }
            }),
            setCurrentLocationTimezoneOffset: (timezoneOffset) => set((state) => {
                return {
                    currentLocation: {
                        ...state.currentLocation,
                        timezoneOffset
                    }
                }
            }),
            setAutoLocateIsSet: (flag) => set({
                autoLocateIsSet: flag
            }),
            setPreferredUnits: (unit) => set({
                preferredUnits: unit
            }),
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
        {
            name: 'aquariux-weather-app-data', // key in localStorage
            partialize: (state) => ({
                theme: state.theme,
                searchHistory: state.searchHistory,
                preferredUnits: state.preferredUnits
            })
        }
    )
);
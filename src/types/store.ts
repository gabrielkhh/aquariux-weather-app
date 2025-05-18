import type { SearchResultWeatherData } from "./openWeatherMapTypes";

export type SearchHistoryWeatherData = SearchResultWeatherData & {
    timestamp: number;
}

export type Coordinates = {
    lon: number;
    lat: number;
    name: string;
    country: string;
    timezoneOffset: number;
};

export type Theme = "light" | "dark"

export type Units = "metric" | "imperial" | "standard"

export type PageView = "home" | "search";


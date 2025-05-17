import type { SearchResultWeatherData } from "./openWeatherMapTypes";

export type SearchHistoryWeatherData = SearchResultWeatherData & {
    timestamp: number;
}

export type Coordinates = {
    lon: number;
    lat: number;
};

export type Theme = "light" | "dark"

export type Units = "metric" | "imperial" | "standard"

export type PageView = "home" | "search";


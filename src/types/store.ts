import type { SearchResultWeatherData } from "./openWeatherMapTypes";

export type SearchHistoryWeatherData = SearchResultWeatherData & {
    timestamp: number;
}

export type LocationInformation = {
    lon: number;
    lat: number;
    name: string;
    country: string;
    timezoneOffset: number;
};

export type Coordinates = {
    lon: number;
    lat: number;
}

export type LocationCountryInfo = {
    name: string;
    country: string;
}

export type Theme = "light" | "dark"

export type Units = "metric" | "imperial" | "standard"

export type PageView = "home" | "search";


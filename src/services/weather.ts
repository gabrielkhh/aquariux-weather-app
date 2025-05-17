import axios from "axios";
import type { SearchLocationResult } from "../types/openWeatherMapTypes";

export const searchLocation = async (searchTerm: string) => {
    const result = await axios.get<SearchLocationResult>(`https://api.openweathermap.org/data/2.5/find?q=${searchTerm}&appid=5796abbde9106b7da4febfae8c44c232&units=metric`);
    if (result.status === 200) {
        // Dedupe identical results (Not sure why the API returns duplicates sometimes e.g. searching "KUL")
        if (result.data && Array.isArray(result.data.list)) {
            const seen = new Set();
            result.data.list = result.data.list.filter((location) => {
                if (seen.has(location.id)) {
                    return false;
                }
                seen.add(location.id);
                return true;
            });
            result.data.count = result.data.list.length;
        }
        return result.data;
    }
    console.warn(`The search for locations resulted in status code ${result.status}`, result.data)
    return undefined
}

export const getFiveDayForecast = async (lat: number, lon: number) => {
    const result = await axios.get<any>(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=5796abbde9106b7da4febfae8c44c232&units=metric`)
    if (result.status === 200) {
        return result.data
    }
    return undefined
}
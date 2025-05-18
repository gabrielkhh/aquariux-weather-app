import axios from "axios";
import type { CurrentWeatherData, FiveDayForecastResult, SearchLocationResult } from "../types/openWeatherMapTypes";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import type { Units } from "../types/store";

dayjs.extend(utc);

export const searchLocation = async (searchTerm: string, preferredUnits: Units) => {
    // This request is proxied via an Express server at /server
    const result = await axios.get<SearchLocationResult>(`http://localhost:3001/api/search?searchTerm=${searchTerm}&units=${preferredUnits}`);
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

export const getFiveDayForecast = async (lat: number, lon: number, preferredUnits: Units) => {
    const currentWeatherResult = await getCurrentWeather(lat, lon, preferredUnits)
    let timezoneOffsetInMinutes = 0;
    if (currentWeatherResult) {
        timezoneOffsetInMinutes = currentWeatherResult.timezone / 60;
    }

    // This request is proxied via an Express server at /server
    const result = await axios.get<FiveDayForecastResult>(`http://localhost:3001/api/forecast?lat=${lat}&lon=${lon}&units=${preferredUnits}`)
    if (result.status === 200) {
        if (result.data.list.length > 0) {
            // Group the forecast by day
            const groupedForecast = result.data.list.reduce((acc: any, item) => {
                const date = dayjs.unix(item.dt).utcOffset(timezoneOffsetInMinutes).format('DD MMM'); // group by day
                if (!acc[date]) {
                    acc[date] = [];
                }
                acc[date].push({
                    ...item,
                    offsetMinutes: timezoneOffsetInMinutes
                });
                return acc;
            }, {});

            return {
                ...result.data,
                grouped: groupedForecast
            }
        } else {
            return {
                ...result.data,
                grouped: {}
            }
        }
    }
    return undefined
}

export const getCurrentWeather = async (lat: number, lon: number, preferredUnits: Units) => {
    // This request is proxied via an Express server at /server
    const result = await axios.get<CurrentWeatherData>(`http://localhost:3001/api/weather?lat=${lat}&lon=${lon}&units=${preferredUnits}`)
    if (result.status === 200) {
        return result.data
    }
    return undefined
}
import useSWR from 'swr';
import type { CurrentWeatherData } from '../types/openWeatherMapTypes'
import { getCurrentWeather } from '../services/weather';
import { useGlobalStore } from '../store/useStore';
import dayjs from "dayjs";
import { metresToKm } from '../utils';

const WeatherSummary = () => {
    const { currentLocation } = useGlobalStore();

    const { data: currentWeatherData, isLoading: currentWeatherDataIsLoading, error: currentWeatherError } = useSWR<CurrentWeatherData | undefined>(currentLocation ? `openweathermap/forecast/${currentLocation.lat}/${currentLocation.lon}` : null, async () => {
        return await getCurrentWeather(currentLocation.lat, currentLocation.lon)
    })

    console.log("c", currentWeatherData)

    return (
        <div className="bg-white/20 p-2 md:p-3 rounded-lg flex flex-col gap-1">
            <span>{dayjs().format("DD MMM YYYY")}</span>
            <div className="flex items-center">
                <img src={`https://openweathermap.org/img/wn/${currentWeatherData?.weather[0].icon}@2x.png`}></img>
                <div className="flex flex-col">
                    <span className="text-3xl font-bold">{currentWeatherData?.main.temp}°C</span>
                    <span>{currentWeatherData?.weather[0].description}</span>
                </div>
            </div>

            <div className="flex items-center justify-around gap-3">
                <div className="flex flex-col items-center bg-amber-400/10">
                    <span>Humidity</span>
                    <span>{currentWeatherData?.main.humidity}%</span>
                </div>
                <div className="flex flex-col items-center bg-amber-400/10">
                    <span>Winds</span>
                    <span>{currentWeatherData?.wind.speed}m/s</span>
                </div>
                <div className="flex flex-col items-center bg-amber-400/10">
                    <span>Visibility</span>
                    <span>{metresToKm(currentWeatherData?.visibility ?? 0)} KM</span>
                </div>
            </div>

        </div>
    )
}

export default WeatherSummary
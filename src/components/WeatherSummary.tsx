import useSWR from 'swr';
import type { CurrentWeatherData } from '../types/openWeatherMapTypes'
import { getCurrentWeather } from '../services/weather';
import { useGlobalStore } from '../store/useStore';
import dayjs from "dayjs";
import { metresToKm } from '../utils';
import WeatherIcon from './WeatherIcon';
import { useEffect } from 'react';

const WeatherSummary = () => {
    const { currentLocation, setCurrentLocationTimezoneOffset } = useGlobalStore();

    const { data: currentWeatherData, isLoading: currentWeatherDataIsLoading, error: currentWeatherError } = useSWR<CurrentWeatherData | undefined>(currentLocation ? `openweathermap/currentWeather/${currentLocation.lat}/${currentLocation.lon}` : null, async () => {
        return await getCurrentWeather(currentLocation.lat, currentLocation.lon)
    })

    useEffect(() => {
        if (currentWeatherData) {
            setCurrentLocationTimezoneOffset(currentWeatherData.timezone)
        }
    }, [currentWeatherData])

    console.log("c", currentWeatherData)

    return (
        <div className="bg-white/20 p-2 md:p-3 rounded-lg flex flex-col gap-1">
            <span className="text-2xl font-bold">{dayjs().utcOffset((currentWeatherData?.timezone !== undefined ? currentWeatherData?.timezone : 0) / 60).format("DD MMM YYYY")}</span>
            <div className="flex items-center">
                <WeatherIcon icon={currentWeatherData?.weather[0].icon} size={4} />
                <div className="flex flex-col">
                    <span className="text-4xl font-bold">{currentWeatherData?.main.temp}°C</span>
                    <span className="text-lg font-medium">{currentWeatherData?.weather[0].description}</span>
                </div>
            </div>

            <div className="flex items-center justify-around gap-3">
                <div className="flex flex-col items-center bg-amber-400/10">
                    <span>Humidity</span>
                    <span>{currentWeatherData?.main.humidity}%</span>
                </div>
                <div className="flex flex-col items-center bg-amber-400/10">
                    <span>{currentWeatherData?.wind.deg}</span>
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
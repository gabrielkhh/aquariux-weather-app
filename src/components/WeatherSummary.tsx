import useSWR from 'swr';
import type { CurrentWeatherData } from '../types/openWeatherMapTypes'
import { getCurrentWeather } from '../services/weather';
import { useGlobalStore } from '../store/useStore';
import dayjs from "dayjs";
import { metresToKm } from '../utils';
import WeatherIcon from './WeatherIcon';
import { useEffect } from 'react';
import useGetCurrentWeather from '../hooks/useGetCurrentWeather';
import { IconArrowNarrowUp } from '@tabler/icons-react';

const WeatherSummary = () => {
    const { currentLocation, setCurrentLocationCountryInfo, preferredUnits } = useGlobalStore();

    const { data: currentWeatherData, isLoading: currentWeatherDataIsLoading, error: currentWeatherError } = useGetCurrentWeather();

    useEffect(() => {
        if (currentWeatherData) {
            setCurrentLocationCountryInfo({
                name: currentWeatherData.name,
                country: currentWeatherData.sys.country
            })
        }
    }, [currentWeatherData])

    return (
        <div className="bg-white/20 p-3 md:p-5 rounded-lg flex flex-col gap-1">
            <span className="text-2xl font-bold">{dayjs().utcOffset((currentWeatherData?.timezone !== undefined ? currentWeatherData?.timezone : 0) / 60).format("DD MMM YYYY")}</span>
            <div className="flex items-center">
                <WeatherIcon icon={currentWeatherData?.weather[0].icon} size={4} />
                <div className="flex flex-col">
                    <span className="text-4xl font-bold">{currentWeatherData?.main.temp}{preferredUnits === "metric" ? "°C" : "°F"}</span>
                    <span className="text-lg font-medium">{currentWeatherData?.weather[0].description}</span>
                </div>
            </div>

            <div className="flex items-center justify-around gap-3">
                <div className="flex flex-col items-center p-2">
                    <span className="text-gray-500 font-medium text-sm">Humidity</span>
                    <span className="font-bold">{currentWeatherData?.main.humidity}%</span>
                </div>

                <div className="flex flex-col items-center p-2">
                    <span className="text-gray-500 font-medium text-sm">Winds</span>
                    <div className="flex items-center">
                        <IconArrowNarrowUp style={{ transform: `rotate(${currentWeatherData?.wind.deg}deg)` }} />
                        <span className="font-bold">{currentWeatherData?.wind.speed} {preferredUnits === "metric" ? "m/s" : "mph"}</span>
                    </div>
                </div>

                <div className="flex flex-col items-center p-2">
                    <span className="text-gray-500 font-medium text-sm">Visibility</span>
                    <span className="font-bold">{metresToKm(currentWeatherData?.visibility ?? 0)} {preferredUnits === "metric" ? "KM" : "miles"}</span>
                </div>
            </div>
        </div>
    )
}

export default WeatherSummary
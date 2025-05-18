import { useEffect, useState } from 'react'
import { useGlobalStore } from '../store/useStore';
import WeatherSummary from '../components/WeatherSummary';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import ForecastCard from '../components/ForecastCard';
import { useSWRConfig } from 'swr';
import { IconReload } from '@tabler/icons-react';
import useGetCurrentWeather from '../hooks/useGetCurrentWeather';
import useGetFiveDayForecast from '../hooks/useGetFiveDayForecast';

dayjs.extend(utc);

const Home = () => {
    const { setCurrentLocationCoordinates, autoLocateIsSet, setAutoLocateIsSet } = useGlobalStore();
    const { mutate: mutateCurrentWeather, isValidating: currentWeatherIsValidating } = useGetCurrentWeather()
    const { mutate: mutateFiveDayForecast, isValidating: fiveDayForecastIsValidating } = useGetFiveDayForecast()

    useEffect(() => {
        if (!navigator.geolocation) {
            console.error("Client browser does not support geolocation")
            return;
        }

        if (autoLocateIsSet) {
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCurrentLocationCoordinates({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
                setAutoLocateIsSet(true)
            },
            (err) => {
                console.error(`Error getting user's location: ${err.message}`);
            }
        );
    }, [autoLocateIsSet]);

    return (
        <div className="w-full min-h-screen flex-col">
            <button
                className="flex mb-2 items-center gap-1 justify-self-end p-2 text-sm font-medium hover:bg-neutral-300 rounded-lg transition-colors duration-200 cursor-pointer"
                onClick={() => {
                    mutateCurrentWeather()
                    mutateFiveDayForecast()
                }}
            >
                <IconReload size={16} stroke={2.5} className={fiveDayForecastIsValidating || currentWeatherIsValidating ? `animate-spin` : ""} />
                Refresh Data
            </button>
            <div className="flex flex-col xl:flex-row xl:items-start gap-3">
                <WeatherSummary />
                <ForecastCard />
            </div>
        </div>
    )
}

export default Home
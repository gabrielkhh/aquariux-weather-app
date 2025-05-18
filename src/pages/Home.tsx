import { useEffect } from 'react'
import { useGlobalStore } from '../store/useStore';
import { getFiveDayForecast } from '../services/weather';
import useSWR from 'swr';
import type { FiveDayForecastProcessedResult } from '../types/openWeatherMapTypes';
import WeatherSummary from '../components/WeatherSummary';
import WeatherIcon from '../components/WeatherIcon';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import useGetFiveDayForecast from '../hooks/useGetFiveDayForecast';
import ForecastCard from '../components/ForecastCard';

dayjs.extend(utc);

const Home = () => {
    const { currentLocation, setCurrentLocationCoordinates, autoLocateIsSet, setAutoLocateIsSet } = useGlobalStore();

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
        <div className="flex flex-col xl:flex-row xl:items-start w-full min-h-screen gap-3">
            <WeatherSummary />
            <ForecastCard />
        </div>
    )
}

export default Home
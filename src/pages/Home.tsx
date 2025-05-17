import { useEffect, useState } from 'react'
import { useGlobalStore } from '../store/useStore';
import { getFiveDayForecast } from '../services/weather';
import useSWR from 'swr';
import type { FiveDayForecastResult } from '../types/openWeatherMapTypes';
import WeatherSummary from '../components/WeatherSummary';

const Home = () => {
    const { currentLocation, setCurrentLocation } = useGlobalStore();

    const { data: forecast, isLoading: forecastIsLoading, error: forecastError } = useSWR<FiveDayForecastResult | undefined>(currentLocation ? `openweathermap/forecast/${currentLocation.lat}/${currentLocation.lon}` : null, async () => {
        return await getFiveDayForecast(currentLocation.lat, currentLocation.lon)
    })

    // useEffect(() => {
    //     if (!navigator.geolocation) {
    //         console.error("Client browser does not support geolocation")
    //         return;
    //     }

    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             setCurrentLocation({
    //                 lat: position.coords.latitude,
    //                 lon: position.coords.longitude,
    //             });
    //         },
    //         (err) => {
    //             console.error(`Error getting user's location: ${err.message}`);
    //         }
    //     );
    // }, []);

    useEffect(() => {
        if (forecast) {
            console.log("forecast", forecast)
        }
    }, [forecast])

    return (
        <div className="flex flex-col w-full h-screen">
            <WeatherSummary />
            {currentLocation?.lat}
            {currentLocation?.lon}
        </div>
    )
}

export default Home
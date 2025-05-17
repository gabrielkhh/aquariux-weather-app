import { useEffect, useState } from 'react'
import { useGlobalStore } from '../store/useStore';
import { getFiveDayForecast } from '../services/weather';
import useSWR from 'swr';
import type { FiveDayForecastResult } from '../types/openWeatherMapTypes';

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
            <div className="bg-white/20 p-2 md:p-3 rounded-lg flex flex-col gap-1">
                <span>January 20, 2024</span>
                <div className="flex items-center">
                    <img src={`https://openweathermap.org/img/wn/${forecast?.list[0].weather[0].icon}@2x.png`}></img>
                    <div className="flex flex-col">
                        <span>{forecast?.list[0].main.temp}</span>
                        <span>{forecast?.list[0].weather[0].description}</span>
                    </div>
                </div>

                <div className="flex items-center justify-around gap-3">
                    <div className="flex flex-col items-center bg-amber-400/10">
                        <span>Humidity</span>
                        <span>{forecast?.list[0].main.humidity}%</span>
                    </div>
                    <div className="flex flex-col items-center bg-amber-400/10">
                        <span>Winds</span>
                        <span>1.54m/s</span>
                    </div>
                    <div className="flex flex-col items-center bg-amber-400/10">
                        <span>Visibility</span>
                        <span>99km</span>
                    </div>
                </div>
                
            </div>
            {currentLocation?.lat}
            {currentLocation?.lon}
        </div>
    )
}

export default Home
import { useEffect, useState } from 'react'
import { useGlobalStore } from '../store/useStore';
import { getFiveDayForecast } from '../services/weather';
import useSWR from 'swr';
import type { FiveDayForecastProcessedResult, FiveDayForecastResult } from '../types/openWeatherMapTypes';
import WeatherSummary from '../components/WeatherSummary';
import WeatherIcon from '../components/WeatherIcon';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const Home = () => {
    const { currentLocation, setCurrentLocation } = useGlobalStore();

    const { data: forecast, isLoading: forecastIsLoading, error: forecastError } = useSWR<FiveDayForecastProcessedResult | undefined>(currentLocation ? `openweathermap/forecast/${currentLocation.lat}/${currentLocation.lon}` : null, async () => {
        return await getFiveDayForecast(currentLocation.lat, currentLocation.lon, currentLocation.timezoneOffset / 60)
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
            console.log("forecast", forecast?.grouped)
            Object.entries(forecast?.grouped).map(([a, b]) => console.log("DSa", a, b))
        }
    }, [forecast])

    return (
        <div className="flex flex-col w-full min-h-screen h-full gap-3">
            <WeatherSummary />

            <span className="font-semibold text-lg">5-day Forecast (3 Hours)</span>
            <div className="flex flex-col gap-2 bg-white/10 p-2 md:p-3">
                {forecast?.grouped && Object.entries(forecast?.grouped).map(([date, forecastData]) => (
                    <>
                        <span>{date}</span>
                        {forecastData.map((data) => {
                            return (
                                <div className="flex items-center">
                                    <span>{dayjs.unix(data.dt).utcOffset(data.offsetMinutes).format("DD MMM YYYY, h:mm A")}</span>
                                    <div className="flex items-center gap-2">
                                        <WeatherIcon icon={data.weather[0].icon} />
                                        <span className="text-amber-400">{data.main.temp_min} / {data.main.temp_max}</span>
                                        <span>{data.weather[0].description}</span>
                                    </div>
                                    <span>{data.offsetMinutes}</span>
                                </div>
                            )
                        })}
                    </>
                ))}
                {/* {forecast?.list.map((forecastData) => {
                    return (
                        <div className="flex items-center">
                            <span>{dayjs.unix(forecastData.dt).format("DD MMM YYYY, h:mm A")}</span>
                            <div className="flex items-center gap-2">
                                <WeatherIcon icon={forecastData.weather[0].icon} />
                                <span className="text-amber-400">{forecastData.main.temp_min} / {forecastData.main.temp_max}</span>
                                <span>{forecastData.weather[0].description}</span>
                            </div>
                        </div>
                    )
                })} */}

            </div>
        </div>
    )
}

export default Home
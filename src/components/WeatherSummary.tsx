import { useGlobalStore } from '../store/useStore';
import dayjs from "dayjs";
import { metresToKm } from '../utils';
import WeatherIcon from './WeatherIcon';
import { useEffect } from 'react';
import useGetCurrentWeather from '../hooks/useGetCurrentWeather';
import { IconArrowNarrowUp, IconExclamationCircle, IconLoader2 } from '@tabler/icons-react';

const WeatherSummary = () => {
    const { setCurrentLocationCountryInfo, preferredUnits } = useGlobalStore();
    const { data: currentWeatherData, isLoading: currentWeatherDataIsLoading, mutate, isValidating: currentWeatherDataIsValidating, error: currentWeatherError } = useGetCurrentWeather();

    useEffect(() => {
        if (currentWeatherData) {
            setCurrentLocationCountryInfo({
                name: currentWeatherData.name,
                country: currentWeatherData.sys.country
            })
        }
    }, [currentWeatherData])

    return (
        <div className="bg-white p-3 md:p-5 rounded-xl flex flex-col gap-1 shadow-xl">
            {currentWeatherDataIsLoading || currentWeatherDataIsValidating && (
                <div className="my-30 justify-center font-medium text-neutral-400 flex items-center gap-2">
                    <IconLoader2 size={18} className="animate-spin" />
                    Weather summary is loading
                </div>
            )}
            {!currentWeatherData && currentWeatherError && (
                <div className="flex my-30 gap-2 justify-center">
                    <div className="flex flex-col gap-2">
                        <div className="font-medium text-neutral-400 flex items-center gap-2">
                            <IconExclamationCircle size={18} />
                            There was an error fetching the Weather Summary. Please try again.
                        </div>
                        <button
                            className="bg-cyan-400 hover:bg-cyan-500 flex-initial rounded-lg p-2 text-white font-medium cursor-pointer"
                            onClick={() => mutate()}
                        >
                            Refresh Weather Summary
                        </button>
                    </div>
                </div>
            )}

            {currentWeatherData && !currentWeatherDataIsLoading && !currentWeatherDataIsValidating && (
                <>
                    <span className="text-2xl font-bold">{dayjs().utcOffset((currentWeatherData?.timezone !== undefined ? currentWeatherData?.timezone : 0) / 60).format("DD MMM YYYY")}</span>
                    <div className="flex flex-col md:flex-row xl:flex-col gap-5 xl:gap-3">
                        <div className="flex items-center">
                            <WeatherIcon icon={currentWeatherData?.weather[0].icon} size={4} />
                            <div className="flex flex-col flex-grow-1">
                                <span className="text-3xl sm:text-4xl font-bold">{currentWeatherData?.main.temp}{preferredUnits === "metric" ? "°C" : "°F"}</span>
                                <span className="text-lg font-medium">{currentWeatherData?.weather[0].description}</span>
                            </div>
                        </div>

                        <div className="flex flex-row md:flex-col md:flex-1 xl:flex-row items-center justify-around gap-3">
                            <div className="flex flex-col items-center p-2">
                                <span className="text-gray-500 font-medium text-sm">Humidity</span>
                                <span className="font-bold">{currentWeatherData?.main.humidity}%</span>
                            </div>

                            <div className="flex flex-col items-center p-2">
                                <span className="text-gray-500 font-medium text-sm">Winds</span>
                                <div className="flex items-center">
                                    <IconArrowNarrowUp style={{ transform: `rotate(${currentWeatherData?.wind.deg}deg)` }} className='z-0' />
                                    <span className="font-bold">{currentWeatherData?.wind.speed} {preferredUnits === "metric" ? "m/s" : "mph"}</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-center p-2">
                                <span className="text-gray-500 font-medium text-sm">Visibility</span>
                                <span className="font-bold">{metresToKm(currentWeatherData?.visibility ?? 0)} KM</span>
                            </div>
                        </div>
                    </div>
                </>
            )}

        </div>
    )
}

export default WeatherSummary
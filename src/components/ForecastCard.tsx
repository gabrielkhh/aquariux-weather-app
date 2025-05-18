import dayjs from 'dayjs';
import useGetFiveDayForecast from '../hooks/useGetFiveDayForecast';
import WeatherIcon from './WeatherIcon';
import { useGlobalStore } from '../store/useStore';

const ForecastCard = () => {
    const { preferredUnits } = useGlobalStore();
    const { data: forecast, isLoading: forecastIsLoading, error: forecastError } = useGetFiveDayForecast();

    return (
        <div className="flex flex-col gap-3 flex-1 bg-white shadow-xl p-2 md:p-3 rounded-xl">
            <span className="font-semibold text-lg">5-day Forecast (3 Hourly)</span>
            <div className="flex flex-col xl:flex-row xl:flex-wrap gap-2 bg-white/10">
                {forecast?.grouped && Object.entries(forecast?.grouped).map(([date, forecastData]) => (
                    <div className="flex flex-col gap-1 bg-neutral-100 p-3 rounded-lg xl:flex-grow-1">
                        <span className="font-bold text-neutral-500 text-lg">{date}</span>
                        {forecastData.map((data) => {
                            return (
                                <div className="flex items-center rounded-lg justify-between gap-2 font-medium">
                                    <span className="w-18">{dayjs.unix(data.dt).utcOffset(data.offsetMinutes).format("h:mm A")}</span>
                                    <div className="flex items-center gap-1 flex-1 justify-left">
                                        <div className="relative">
                                            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(0,0,0,0.4)_0%,_rgba(0,0,0,0)_40%)] blur-lg" />

                                            <WeatherIcon icon={data.weather[0].icon} className="rounded-full relative" />
                                        </div>
                                        <span className="text-neutral-400 text-sm">{data.main.temp_min}{preferredUnits === "metric" ? "°C" : "°F"} / {data.main.temp_max}{preferredUnits === "metric" ? "°C" : "°F"}</span>
                                    </div>
                                    <span className="w-32 justify-end">{data.weather[0].description}</span>
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ForecastCard
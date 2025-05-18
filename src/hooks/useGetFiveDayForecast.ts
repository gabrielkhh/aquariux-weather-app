import useSWR from 'swr';
import { useGlobalStore } from '../store/useStore';
import type { FiveDayForecastProcessedResult } from '../types/openWeatherMapTypes';
import { getFiveDayForecast } from '../services/weather';

const useGetFiveDayForecast = () => {
    const { currentLocation, preferredUnits } = useGlobalStore();

    return useSWR<FiveDayForecastProcessedResult | undefined>(currentLocation ? `openweathermap/${preferredUnits}/${currentLocation.lat}/${currentLocation.lon}/forecast` : null, async () => {
        return await getFiveDayForecast(currentLocation.lat, currentLocation.lon, preferredUnits)
    })
}

export default useGetFiveDayForecast
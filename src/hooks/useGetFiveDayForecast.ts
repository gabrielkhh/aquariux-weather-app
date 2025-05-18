import useSWR from 'swr';
import { useGlobalStore } from '../store/useStore';
import type { FiveDayForecastProcessedResult } from '../types/openWeatherMapTypes';
import { getFiveDayForecast } from '../services/weather';

const useGetFiveDayForecast = () => {
    const { currentLocation, preferredUnits } = useGlobalStore();

    const response = useSWR<FiveDayForecastProcessedResult | undefined>(currentLocation ? `openweathermap/forecast/${preferredUnits}/${currentLocation.lat}/${currentLocation.lon}` : null, async () => {
        return await getFiveDayForecast(currentLocation.lat, currentLocation.lon, preferredUnits)
    })

    return response
}

export default useGetFiveDayForecast
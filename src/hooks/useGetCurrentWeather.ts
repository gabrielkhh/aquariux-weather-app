import useSWR from 'swr';
import { getCurrentWeather } from '../services/weather';
import { useGlobalStore } from '../store/useStore';
import type { CurrentWeatherData } from '../types/openWeatherMapTypes';

const useGetCurrentWeather = () => {
  const { currentLocation, preferredUnits } = useGlobalStore();

  return useSWR<CurrentWeatherData | undefined>(currentLocation ? `openweathermap/${preferredUnits}/${currentLocation.lat}/${currentLocation.lon}/currentWeather` : null, async () => {
      return await getCurrentWeather(currentLocation.lat, currentLocation.lon, preferredUnits)
  })
}

export default useGetCurrentWeather
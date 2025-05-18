import useSWR from 'swr';
import { searchLocation } from '../services/weather';
import type { SearchLocationResult } from '../types/openWeatherMapTypes';
import { useGlobalStore } from '../store/useStore';

const useSearchLocation = (searchTerm: string) => {
    const { preferredUnits } = useGlobalStore();

    return useSWR<SearchLocationResult | undefined>(searchTerm !== "" ? `openweathermap/${preferredUnits}/search/${searchTerm}` : null, async () => {
        return await searchLocation(searchTerm, preferredUnits)
    });
}

export default useSearchLocation
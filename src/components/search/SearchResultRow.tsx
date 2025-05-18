import type { SearchResultWeatherData } from '../../types/openWeatherMapTypes';
import { useGlobalStore } from '../../store/useStore';
import WeatherIcon from '../WeatherIcon';

interface SearchResultRowProps {
    result: SearchResultWeatherData;
    handleSearchResultClick: (result: SearchResultWeatherData) => void; 
}

const SearchResultRow = (props: SearchResultRowProps) => {
    const { handleSearchResultClick, result } = props;
    const { preferredUnits } = useGlobalStore();

    return (
        <div
            className="flex items-center justify-between hover:bg-neutral-300 cursor-pointer rounded-lg px-2 py-1"
            onClick={() => handleSearchResultClick(result)}
        >
            <div className="flex flex-col">
                <span className="text-lg font-semibold">{result.name}, {result.sys.country}</span>
                <span className="text-xs">{result.coord.lat} {result.coord.lon}</span>
            </div>
            <div className="flex items-center">
                <span className="text-sm font-medium text-neutral-500">{result.main.temp}{preferredUnits === "metric" ? "°C" : "°F"}</span>
                <WeatherIcon icon={result.weather[0].icon} />
            </div>
        </div>
    )
}

export default SearchResultRow
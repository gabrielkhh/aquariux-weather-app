import { useState } from 'react'
import useSWR from 'swr';
import { searchLocation } from '../services/weather';
import type { SearchLocationResult, SearchResultWeatherData } from '../types/openWeatherMapTypes';
import { useGlobalStore } from '../store/useStore';
import { IconTrash } from '@tabler/icons-react';
import SearchHistoryRow from '../components/search/SearchHistoryRow';
import useSearchLocation from '../hooks/useSearchLocation';
import WeatherIcon from '../components/WeatherIcon';

const Search = () => {
    const [searchInput, setSearchInput] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const { searchHistory, addToSearchHistory, removeFromSearchHistory, setCurrentLocation, setCurrentView, preferredUnits } = useGlobalStore();
    const { data: searchResults, isLoading: searchResultsIsLoading, error: searchResultsError } = useSearchLocation(searchTerm);

    const handleSearch = () => {
        setSearchTerm(searchInput);
    };

    const handleSearchResultClick = (searchItem: SearchResultWeatherData) => {
        setCurrentLocation({
            lat: searchItem.coord.lat,
            lon: searchItem.coord.lon,
            name: searchItem.name,
            country: searchItem.sys.country,
            timezoneOffset: 0
        })
        addToSearchHistory(searchItem);
        setCurrentView("home");
    }

    return (
        <div className="flex flex-col gap-1 h-screen">
            <div className="flex gap-2 items-center">
                <input
                    className="bg-neutral-200 p-2 rounded-lg flex flex-1 focus:border-none"
                    placeholder="Search a country or city"
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                />
                <button className="bg-cyan-500 hover:bg-cyan-600 duration-200 transition-colors cursor-pointer px-2 rounded-lg h-full font-medium text-white" onClick={handleSearch}>Search</button>
            </div>

            <div className="flex flex-col gap-2">
                {searchResultsIsLoading && (
                    <span className="text-neutral-400 font-medium text-sm">Searching...</span>
                )}
                {!searchResultsIsLoading && searchResults && searchResults.list.length === 0 && (
                    <span className="text-neutral-400 font-medium text-sm">No results found for "{searchTerm}"</span>
                )}
                {searchResultsError && (
                    <span className="text-red-400 font-medium text-sm">Invalid country or city</span>
                )}
            </div>
            <div className="mt-1">
                {searchResults && searchResults.list.length > 0 && searchResults.list.map((result, index) => {
                    return (
                        <div
                            className="flex items-center justify-between hover:bg-neutral-300 cursor-pointer rounded-lg px-2 py-1"
                            onClick={(e) => handleSearchResultClick(result)}
                            key={index}
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
                })}
            </div>

            <div className="flex flex-col gap-1 mt-3">
                <span className="font-medium text-neutral-500">Search History</span>

                {searchHistory.length > 0 ? (
                    searchHistory.map((historyItem, index) => {
                        return (
                            <SearchHistoryRow historyItem={historyItem} handleSearchResultClick={handleSearchResultClick} removeFromSearchHistory={removeFromSearchHistory} key={index} />
                        )
                    })
                ) : (
                    <span>You have no recent search history</span>
                )}
            </div>
        </div>
    )
}

export default Search
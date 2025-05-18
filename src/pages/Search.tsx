import { useState } from 'react'
import useSWR from 'swr';
import { searchLocation } from '../services/weather';
import type { SearchLocationResult, SearchResultWeatherData } from '../types/openWeatherMapTypes';
import { useGlobalStore } from '../store/useStore';
import { IconTrash } from '@tabler/icons-react';

const Search = () => {
    const [searchInput, setSearchInput] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const { searchHistory, addToSearchHistory, removeFromSearchHistory, setCurrentLocation, setCurrentView } = useGlobalStore();

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

    const { data: searchResults, isLoading: searchResultsIsLoading, error: searchResultsError } = useSWR<SearchLocationResult | undefined>(searchTerm !== "" ? `openweathermap/search/${searchTerm}` : null, async () => {
        return await searchLocation(searchTerm)
    });

    return (
        <div className="flex flex-col gap-2 h-screen">
            <div className="flex gap-2 items-center">
                <input
                    className="bg-black p-2 rounded-lg flex flex-1"
                    placeholder="Search a country or city"
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                />
                <button className="bg-yellow-500 px-2 rounded-lg h-full" onClick={handleSearch}>Search</button>
            </div>

            <div className="flex flex-col gap-2">
                {searchResults && searchResults.list.length > 0 && searchResults.list.map((result, index) => {
                    return (
                        <div
                            className="flex items-center hover:bg-white/10 cursor-pointer rounded-lg px-2 py-1"
                            onClick={(e) => handleSearchResultClick(result)}
                            key={index}
                        >
                            <div className="flex flex-col">
                                <span className="text-lg font-semibold">{result.name}, {result.sys.country}</span>
                                <span className="text-xs">{result.coord.lat} {result.coord.lon}</span>
                            </div>
                        </div>
                    )
                })}
                {searchResults && searchResults.list.length === 0 && (
                    <span>No results found for "{searchTerm}"</span>
                )}
                {searchResultsError && (
                    <span className="text-red-400">Invalid country or city</span>
                )}
            </div>

            <div className="flex flex-col gap-1">
                Search History

                {searchHistory.length > 0 ? (
                    searchHistory.map((historyItem, index) => {
                        return (
                            <div className="flex items-center gap-1">
                                <div
                                    className="flex items-center hover:bg-white/10 cursor-pointer rounded-lg px-2 py-1"
                                    onClick={() => handleSearchResultClick(historyItem)}
                                    key={index}
                                >
                                    <div className="flex flex-col">
                                        <span className="text-lg font-semibold">{historyItem.name}, {historyItem.sys.country}</span>
                                        <span className="text-xs">{historyItem.coord.lat} {historyItem.coord.lon}</span>
                                    </div>
                                </div>
                                <button
                                    className="bg-red-400 rounded-lg p-2 flex items-center cursor-pointer"
                                    onClick={() => removeFromSearchHistory(historyItem.id)}
                                >
                                    <IconTrash />
                                </button>
                            </div>
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
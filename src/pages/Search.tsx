import React, { useState } from 'react'
import useSWR from 'swr';
import { searchLocation } from '../services/weather';
import type { SearchLocationResult } from '../types/openWeatherMapTypes';

const Search = () => {
    const [searchInput, setSearchInput] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");

    const { data: searchResults, isLoading, error } = useSWR<SearchLocationResult | undefined>(searchTerm !== "" ? `openweathermap/search/${searchTerm}` : null, async () => {
        return await searchLocation(searchTerm)
    });

    return (
        <div className="flex flex-col gap-2 h-screen container">
            <div className="flex gap-2">
                <input
                    className="bg-black p-2 rounded-lg flex flex-1"
                    placeholder="Search a country or city"
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <button className="bg-yellow-500 px-2 rounded-lg" onClick={() => setSearchTerm(searchInput)}>Search</button>
            </div>

            <div className="flex flex-col gap-2">
                {searchResults && searchResults.list.map((result, index) => {
                    return (
                        <div className="flex items-center hover:bg-white/10 cursor-pointer rounded-lg px-2 py-1 ">
                            <div key={index} className="flex flex-col">
                                <span className="text-lg font-semibold">{result.name}, {result.sys.country}</span>
                                <span className="text-xs">{result.coord.lat} {result.coord.lon}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Search
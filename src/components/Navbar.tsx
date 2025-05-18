import React, { useEffect } from 'react'
import { IconMapPin, IconSearch } from '@tabler/icons-react';
import { useGlobalStore } from '../store/useStore';

const Navbar = () => {
    const { currentView, setCurrentView, currentLocation, preferredUnits } = useGlobalStore();

    useEffect(() => {
        console.log("curre", currentLocation.lat, currentLocation.lon, currentLocation)
    }, [currentLocation, currentLocation.lat, currentLocation.lon])

    return (
        <div className="bg-white/10 backdrop-blur-2xl p-3 sticky top-0 w-full">
            <div className="flex items-center w-full">
                <button
                    onClick={() => setCurrentView("home")}
                    className="flex items-center gap-1 font-semibold text-lg hover:bg-white/10 duration-150 transition-colors p-2 rounded-lg cursor-pointer">
                    <IconMapPin />
                    <span>{currentLocation.name}, {currentLocation.country}</span>
                </button>
                <button onClick={() => setCurrentView("search")} className="flex items-center gap-1 hover:bg-white/10 duration-150 transition-colors p-2 rounded-lg cursor-pointer">
                    <IconSearch />
                    Search
                </button>
                <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-800 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-500 rounded-full peer peer-checked:bg-green-500 transition-all duration-300"></div>
                    <div className="absolute ml-1 w-5 h-5 bg-white dark:bg-gray-200 rounded-full shadow transform peer-checked:translate-x-5 transition-all duration-300"></div>
                </label>

                <div className="inline-flex bg-gray-200 rounded-lg p-1 text-sm font-medium">
                    <button
                        id="metricBtn"
                        className={`px-3 py-1 rounded-lg ${preferredUnits === "metric" ? ("bg-white text-gray-900 shadow") : ("text-gray-600")}`}
                        // onclick="toggleUnits('metric')"
                    >
                        Metric: °C, m/s
                    </button>
                    <button
                        id="imperialBtn"
                        className={`px-3 py-1 rounded-lg ${preferredUnits === "imperial" ? ("bg-white text-gray-900 shadow") : ("text-gray-600")}`}
                        // onClick="toggleUnits('imperial')"
                    >
                        Imperial: °F, mph
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar
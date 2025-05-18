import React, { useEffect } from 'react'
import { IconMapPin, IconSearch } from '@tabler/icons-react';
import { useGlobalStore } from '../store/useStore';

const Navbar = () => {
    const { setCurrentView, currentLocation, preferredUnits, setPreferredUnits } = useGlobalStore();

    return (
        <div className="bg-white/10 backdrop-blur-2xl p-3 sticky top-0 w-full z-10">
            <div className="flex items-center w-full justify-between">
                <button
                    onClick={() => setCurrentView("home")}
                    className="flex items-center gap-1 font-semibold text-lg hover:bg-neutral-300 dark:hover:bg-white/10 duration-150 transition-colors p-2 rounded-lg cursor-pointer">
                    <IconMapPin />
                    <span>{currentLocation.name}, {currentLocation.country}</span>
                </button>

                <div className="flex items-center gap-3">
                    <button onClick={() => setCurrentView("search")} className="flex items-center gap-1 hover:bg-neutral-300 dark:hover:bg-white/10 duration-150 transition-colors p-2 rounded-lg cursor-pointer">
                        <IconSearch />
                        Search
                    </button>

                    <div className="bg-gray-200 border border-gray-300 rounded-lg p-1 text-sm font-medium relative hidden sm:inline-flex">
                        <button
                            id="metricBtn"
                            className={`px-3 py-1 rounded-lg transition-colors duration-200 ${preferredUnits === "metric" ? ("bg-white text-gray-900 shadow") : ("text-gray-600")}`}
                            onClick={() => setPreferredUnits("metric")}
                        >
                            Metric: °C, m/s
                        </button>
                        <button
                            id="imperialBtn"
                            className={`px-3 py-1 rounded-lg transition-colors duration-200 ${preferredUnits === "imperial" ? ("bg-white text-gray-900 shadow") : ("text-gray-600")}`}
                            onClick={() => setPreferredUnits("imperial")}
                        >
                            Imperial: °F, mph
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
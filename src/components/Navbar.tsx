import React from 'react'
import { IconMapPin, IconSearch } from '@tabler/icons-react';
import { useGlobalStore } from '../store/useStore';

const Navbar = () => {
    const { currentView, setCurrentView, currentLocation } = useGlobalStore();

    return (
        <div className="bg-white/10 backdrop-blur-2xl p-3 sticky top-0 w-full">
            <div className="flex items-center w-full">
                <button onClick={() => setCurrentView("home")} className="hover:bg-white/10 duration-150 transition-colors p-2 rounded-lg cursor-pointer">Home</button>
                <div className="flex items-center">
                    <IconMapPin />
                    <span>{currentLocation.name}, {currentLocation.country}</span>
                </div>
                <button onClick={() => setCurrentView("search")} className="flex items-center gap-1 hover:bg-white/10 duration-150 transition-colors p-2 rounded-lg cursor-pointer">
                    <IconSearch />
                    Search
                </button>
            </div>
        </div>
    )
}

export default Navbar
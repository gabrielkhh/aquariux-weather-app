import React from 'react'
import type { PageView } from '../App';
import { IconSearch } from '@tabler/icons-react';

const Navbar = ({
    view,
    setView
}: {
    view: PageView;
    setView: React.Dispatch<React.SetStateAction<PageView>>;
}) => {
    return (
        <div className="bg-white/10 backdrop-blur-2xl p-3 sticky top-0 w-full">
            <div className="flex items-center w-full">
                <button onClick={() => setView("home")} className="hover:bg-white/10 duration-150 transition-colors p-2 rounded-lg cursor-pointer">Home</button>
                <button onClick={() => setView("search")} className="flex items-center gap-1 hover:bg-white/10 duration-150 transition-colors p-2 rounded-lg cursor-pointer">
                    <IconSearch />
                    Search
                </button>
            </div>
        </div>
    )
}

export default Navbar
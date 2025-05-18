import type { SearchHistoryWeatherData } from '../../types/store';
import { IconTrash } from '@tabler/icons-react';

interface SearchHistoryRowProps {
    historyItem: SearchHistoryWeatherData;
    handleSearchResultClick: (historyItem: SearchHistoryWeatherData) => void; 
    removeFromSearchHistory: (id: number) => void;
}

const SearchHistoryRow = (props: SearchHistoryRowProps) => {
    const { historyItem, handleSearchResultClick, removeFromSearchHistory } = props;

    return (
        <div className="flex items-center flex-1 justify-between">
            <div
                className="flex items-center cursor-pointer flex-1 hover:bg-neutral-300 gap-1 rounded-lg justify-between px-2 py-1"
                onClick={() => handleSearchResultClick(historyItem)}
            >
                <div className="flex flex-col">
                    <span className="text-lg font-semibold">{historyItem.name}, {historyItem.sys.country}</span>
                    <span className="text-xs">{historyItem.coord.lat} {historyItem.coord.lon}</span>
                </div>

            </div>
            <button
                className="text-red-400 h-full hover:bg-neutral-300 rounded-lg p-2 flex items-center cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation();
                    removeFromSearchHistory(historyItem.id)
                }}
            >
                <IconTrash />
            </button>
        </div>
    )
}

export default SearchHistoryRow
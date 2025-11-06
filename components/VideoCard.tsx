
import React from 'react';
import { LockIcon, PlayIcon, CheckIcon } from './icons';

interface VideoCardProps {
  dayNumber: number;
  currentDay: number;
  onClick: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ dayNumber, currentDay, onClick }) => {
    const isLocked = dayNumber > currentDay;
    const isPlayable = dayNumber === currentDay;
    const isWatched = dayNumber < currentDay;

    const getCardClasses = () => {
        let classes = 'aspect-square rounded-xl flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 transform ';
        if (isLocked) {
            classes += 'bg-gray-800 border-2 border-gray-700';
        } else if (isWatched) {
            classes += 'bg-green-900/50 border-2 border-green-700/50';
        } else if (isPlayable) {
            classes += 'bg-purple-600 border-2 border-purple-400 cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 animate-pulse';
        }
        return classes;
    };
    
    const getNumberClasses = () => {
        let classes = 'text-3xl font-bold ';
        if (isLocked) {
            classes += 'text-gray-600';
        } else if (isWatched) {
            classes += 'text-green-500';
        } else {
            classes += 'text-white';
        }
        return classes;
    }

    return (
        <div className={getCardClasses()} onClick={isPlayable ? onClick : undefined}>
            <span className={getNumberClasses()}>{dayNumber}</span>
            <div className="absolute top-2 right-2 text-white">
                {isLocked && <LockIcon className="w-4 h-4 text-gray-500" />}
                {isPlayable && <PlayIcon className="w-4 h-4 text-white" />}
                {isWatched && <CheckIcon className="w-4 h-4 text-green-500" />}
            </div>
        </div>
    );
};

export default VideoCard;

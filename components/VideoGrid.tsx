
import React from 'react';
import type { Video } from '../types';
import VideoCard from './VideoCard';

interface VideoGridProps {
    videos: Video[];
    currentDay: number;
    onSelectVideo: (videoId: number) => void;
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, currentDay, onSelectVideo }) => {
    return (
        <div className="grid grid-cols-4 gap-4 px-4">
            {videos.map(video => (
                <VideoCard 
                    key={video.id} 
                    dayNumber={video.id}
                    currentDay={currentDay}
                    onClick={() => onSelectVideo(video.id)}
                />
            ))}
        </div>
    );
};

export default VideoGrid;

import React from 'react';
import { useDailyVideo } from './hooks/useDailyVideo';
import VideoGrid from './components/VideoGrid';

const App: React.FC = () => {
    const { videos, currentDay, isLoading } = useDailyVideo();

    const handleSelectVideo = (videoId: number) => {
        const videoToPlay = videos.find(v => v.id === videoId);
        if (videoToPlay && videoToPlay.id === currentDay) {
            // This will open the YouTube app if installed, or the browser otherwise.
            window.open(videoToPlay.url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center font-sans p-4 bg-gray-900 text-white">
            <div className="w-full max-w-sm h-[85vh] max-h-[800px] bg-black rounded-[40px] shadow-2xl border-4 border-gray-700 overflow-hidden flex flex-col relative">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl border-x-2 border-b-2 border-gray-700 z-10"></div>
                
                <header className="pt-8 pb-4 px-6 text-center">
                    <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                        Quaresma de São Miguel Arcanjo
                    </h1>
                    <p className="text-sm text-gray-400">Dia {currentDay} de 40</p>
                </header>

                <main className="flex-1 overflow-y-auto pb-4 scrollbar-hide">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
                        </div>
                    ) : (
                        <VideoGrid 
                            videos={videos} 
                            currentDay={currentDay} 
                            onSelectVideo={handleSelectVideo} 
                        />
                    )}
                </main>
            </div>
        </div>
    );
};

// Custom scrollbar utility CSS in JS as we can't create a separate CSS file.
const style = document.createElement('style');
style.textContent = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
document.head.append(style);

export default App;
import { useState, useEffect } from 'react';
import type { Video } from '../types';
import { youtubeVideoIds } from '../data/videos';

const TOTAL_VIDEOS = 40;
const LOCAL_STORAGE_KEY = 'dailyVideoFirstUseDate';

const generateYouTubeVideos = (): Video[] => {
  return youtubeVideoIds.map((videoId, index) => ({
    id: index + 1,
    title: `Day ${index + 1} Video`,
    url: `https://www.youtube.com/watch?v=${videoId}`,
  }));
};

const getUTCDate = (date: Date): Date => {
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
};

export const useDailyVideo = () => {
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [videos] = useState<Video[]>(generateYouTubeVideos());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedDate = localStorage.getItem(LOCAL_STORAGE_KEY);
    const today = new Date();
    const todayUTC = getUTCDate(today);

    let dayNumber: number;

    if (!storedDate) {
      localStorage.setItem(LOCAL_STORAGE_KEY, todayUTC.toISOString());
      dayNumber = 1;
    } else {
      const firstUseDate = new Date(storedDate);
      const firstUseDateUTC = getUTCDate(firstUseDate);

      const diffTime = todayUTC.getTime() - firstUseDateUTC.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      dayNumber = diffDays + 1;
    }
    
    setCurrentDay(Math.min(dayNumber, TOTAL_VIDEOS));
    setIsLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { videos, currentDay, isLoading };
};
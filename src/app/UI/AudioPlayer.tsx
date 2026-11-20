"use client"

import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { RiForward10Line, RiReplay10Line } from "react-icons/ri";

interface Book {
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  totalRating: number;
  averageRating: number;
  keyIdeas: number;
  type: string;
  status: string;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
}

interface AudioPlayerProps {
    book: Book;
    onEnded?: () => void;
}

export default function AudioPlayer({ book, onEnded }: AudioPlayerProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const formatTime = (timeInSeconds: number) => {
        if (!timeInSeconds || isNaN(timeInSeconds)) return "00:00";
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`; 
    };

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if(isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play();
            setIsPlaying(true);
        }
    };

    const skipTime = (seconds: number) => {
        const audio = audioRef.current;
        if(!audio) return;

        const newTime = Math.min(
            Math.max(audio.currentTime + seconds, 0),
            duration 
        );
        audio.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (!audio) return;

        const newTime = Number(e.target.value);
        audio.currentTime = newTime;
        setCurrentTime(newTime);
    };

    useEffect(() => {
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
    }, [book.id]);

    const progressPercent = duration ?  (currentTime / duration) * 100 : 0;

    return (
        <div className="w-full h-auto md:h-20 py-4 flex flex-col md:flex-row items-center justify-between bg-[#042330] px-6 md:px-10 fixed bottom-0 left-0 z-50 gap-4 md:gap-0">
             <audio
                ref={audioRef}
                src={book.audioLink}
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                onEnded={() => {
                    setIsPlaying(false);
                    onEnded?.();
                }}
            />

            <div className="flex items-center gap-3 w-full md:w-1/3 justify-center md:justify-start">
                <figure className="w-12 h-12 min-w-12">
                    <img
                        src={book.imageLink}
                        alt={book.title}
                        className="w-full h-full object-contain"
                    />
                </figure>
                <div className="text-sm">
                    <div className="text-white font-medium line-clamp-1">{book.title}</div>
                    <div className="text-[#bac8ce] line-clamp-1">{book.author}</div>
                </div>
            </div>
            <div className="flex items-center justify-center gap-6 w-full md:w-1/3">
                <button
                    type="button"
                    onClick={() => skipTime(-10)}
                    aria-label="Rewind 10 seconds"
                    className="text-white hover:opacity-80 cursor-pointer transition-opacity"
                >
                    <RiReplay10Line className="w-7 h-7" />
                </button>
                <button
                    type="button"
                    onClick={togglePlayPause}
                    aria-label={isPlaying ? "Pause" : "Play"}
                    className="w-10 h-10 rounded-full bg-white text-[#042330] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                >
                {isPlaying ? (
                <FaPause className="w-4 h-4" />
                ) : (
                <FaPlay className="w-4 h-4 ml-0.5" />
                )}
                </button>
                <button
                    type="button"
                    onClick={() => skipTime(10)}
                    aria-label="Skip forward 10 seconds"
                    className="text-white hover:opacity-80 cursor-pointer transition-opacity"
                >
                <RiForward10Line className="w-7 h-7" />
                </button>
            </div>
            <div className="flex items-center gap-4 w-full md:w-1/3 justify-center md:justify-end">
                <div className="text-white text-sm w-11 text-right">
                    {formatTime(currentTime)}
                </div>
                <input
                    type="range"
                    min={0}
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleScrub}
                    style={{
                        background: `linear-gradient(to right, #2bd97c ${progressPercent}%, #6d787d ${progressPercent}%)`,                        
                    }}
                    className="w-full max-w-75 h-1 rounded-lg appearance-none cursor-pointer accent-white"
                />
                <div className="text-white text-sm w-11">
                    {formatTime(duration)}
                </div>
            </div>
        </div>
    );
}
import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from "react";
import type { Song } from "../api";

interface AudioContextProps {
    isPlaying: boolean;
    volume: number;
    progress: number;
    songs?: Song[];
    currentSongIndex: number;
    currentTime: number;
    duration: number;
    inLoop: boolean;
    play: (index: number) => void;
    playAsUniqueTrack: (song: Song) => void;
    pause: () => void;
    resume: () => void;
    toggle: () => void;
    seek: (percentage: number) => void;
    setVolume: (value: number) => void;
    setTracks: (songs: Song[]) => void;
    activateLoop: () => void;
    deactivateLoop: () => void;
    nextTrack: () => void;
    prevTrack: () => void;
}

const AudioContext = createContext<AudioContextProps | null>(null);

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) throw new Error("useAudio must be used within AudioProvider");
    return context;
};

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
    const audioRef = useRef<HTMLAudioElement>(new Audio());
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolumeState] = useState(1);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [songs, setSongs] = useState<Song[]>([]);
    const [inLoop, setInLoop] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(-1);

    const play = useCallback((index: number) => {
        if (index < 0 || index >= songs.length) return;
        const audio = audioRef.current;
        const newSrc = songs[index].file!;

        if (audio.src !== newSrc) {
            audio.src = newSrc;
            audio.load();
        }

        audio.play().catch(error => console.error("Error playing audio:", error));
        setIsPlaying(true);
        setCurrentSongIndex(index);
    }, [songs]);

    const resume = useCallback(() => {
        audioRef.current.play().catch(error => console.error("Error resuming audio:", error));
        setIsPlaying(true);
    }, []);

    const pause = useCallback(() => {
        audioRef.current.pause();
        setIsPlaying(false);
    }, []);

    const toggle = useCallback(() => {
        isPlaying ? pause() : resume();
    }, [isPlaying, pause, resume]);

    const setTracks = useCallback((newSongs: Song[]) => {
        setSongs(newSongs);
        if (newSongs.length > 0 && (currentSongIndex === -1 || currentSongIndex >= newSongs.length)) {
            setCurrentSongIndex(0);
        }
    }, [currentSongIndex]);

    const activateLoop = useCallback(() => {
        setInLoop(true);
    }, []);

    const deactivateLoop = useCallback(() => {
        setInLoop(false);
    }, []);

    const seek = useCallback((percentage: number) => {
        const audio = audioRef.current;
        const newTime = (percentage / 100) * audio.duration;
        if (!isNaN(newTime) && audio.duration > 0 && Math.abs(audio.currentTime - newTime) > 0.1) {
            audio.currentTime = newTime;
        }
    }, []);

    const setVolume = useCallback((value: number) => {
        const newVolume = value / 100;
        audioRef.current.volume = newVolume;
        setVolumeState(newVolume);
    }, []);

    const setTrackIndex = (index: number) => {
        if (songs.length === 0) return;

        if (index < 0 && index >= songs.length && !inLoop) {
            setIsPlaying(false);
            setCurrentSongIndex(-1);
            return;
        }

        if (index < 0) index = songs.length - 1;
        else if (index >= songs.length) index = 0;

        play(index);
    };

    const nextTrack = useCallback(() => {
        setTrackIndex(currentSongIndex + 1);
    }, [songs, currentSongIndex, inLoop, play]);

    const prevTrack = useCallback(() => {
        setTrackIndex(currentSongIndex - 1);
    }, [songs, currentSongIndex, inLoop, play]);

    const handleEnd = useCallback(() => {
        nextTrack();
    }, [nextTrack]);

    const playAsUniqueTrack = useCallback((song: Song) => {
        setTracks([song]);
        play(0);
    }, [songs]);

    useEffect(() => {
        const audio = audioRef.current;

        const updateProgress = () => {
            if (!audio.duration) return;

            setDuration(audio.duration);
            setCurrentTime(audio.currentTime);
            setProgress((audio.currentTime / audio.duration) * 100);
        };

        audio.addEventListener("timeupdate", updateProgress);
        audio.addEventListener("ended", handleEnd);
        audio.addEventListener("canplaythrough", () => {
            if (isPlaying && audio.paused) {
                audio.play().catch(error => console.error("Error playing after canplaythrough:", error));
            }
        });

        audio.volume = volume;

        return () => {
            audio.removeEventListener("timeupdate", updateProgress);
            audio.removeEventListener("ended", handleEnd);
            audio.removeEventListener("canplaythrough", () => { });
        };
    }, [handleEnd, isPlaying]);

    useEffect(() => {
        audioRef.current.volume = volume;
    }, [volume]);

    useEffect(() => {
        if (currentSongIndex !== -1 && songs.length > 0) {
            play(currentSongIndex);
        }
    }, [currentSongIndex, songs, play]);

    return (
        <AudioContext.Provider
            value={{
                isPlaying,
                volume,
                progress,
                duration,
                currentTime,
                currentSongIndex,
                songs,
                inLoop,
                play,
                playAsUniqueTrack,
                resume,
                pause,
                toggle,
                seek,
                setVolume,
                activateLoop,
                deactivateLoop,
                setTracks,
                nextTrack,
                prevTrack,
            }}
        >
            {children}
        </AudioContext.Provider>
    );
};
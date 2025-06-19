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
    addTrack: (song: Song) => void;
    removeTrack: (song: Song) => void;
    setTracks: (songs: Song[], shuffle?: boolean) => void;
    activateLoop: () => void;
    deactivateLoop: () => void;
    nextTrack: () => void;
    prevTrack: () => void;
}

const AudioContext = createContext<AudioContextProps | null>(null);
const localStorageKey = "app.settings.audio-player";

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) throw new Error("useAudio must be used within AudioProvider");
    return context;
};

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
    const audioRef = useRef<HTMLAudioElement>(new Audio());

    const getInitialState = useCallback(() => {
        try {
            const savedState = localStorage.getItem(localStorageKey);
            if (savedState) {
                const parsedState = JSON.parse(savedState);
                return {
                    songs: parsedState.songs || [],
                    currentSongIndex: parsedState.currentSongIndex !== undefined ? parsedState.currentSongIndex : -1,
                    volume: parsedState.volume !== undefined ? parsedState.volume : 1,
                    inLoop: parsedState.inLoop || false,
                    currentTime: parsedState.currentTime || 0,
                    duration: parsedState.duration || 0,
                    progress: parsedState.progress || 0,
                };
            }
        } catch (e) {
            console.error("Failed to load audio state from localStorage:", e);
            localStorage.removeItem(localStorageKey);
        }
        return { songs: [], currentSongIndex: -1, volume: 1, inLoop: false, currentTime: 0, duration: 0, progress: 0 };
    }, []);

    const initialState = getInitialState();

    const [isMounted, setIsMounted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolumeState] = useState(initialState.volume);
    const [progress, setProgress] = useState(initialState.progress);
    const [duration, setDuration] = useState(initialState.duration);
    const [currentTime, setCurrentTime] = useState(initialState.currentTime);
    const [songs, setSongs] = useState<Song[]>(initialState.songs);
    const [inLoop, setInLoop] = useState(initialState.inLoop);
    const [currentSongIndex, setCurrentSongIndex] = useState(initialState.currentSongIndex);

    const songsRef = useRef(songs);
    useEffect(() => {
        songsRef.current = songs;
    }, [songs]);

    useEffect(() => {
        audioRef.current.preload = 'auto';
    }, []);

    useEffect(() => {
        if (!isPlaying) return;
        play(currentSongIndex);
    }, [currentSongIndex, songs, isPlaying]);

    const play = useCallback((index: number) => {
        const audio = audioRef.current;
        const latestSongs = songsRef.current;

        if (index < 0 || index >= latestSongs.length) {
            setIsPlaying(false);
            setCurrentSongIndex(-1);
            audio.pause();
            audio.src = "";
            return;
        }

        try {
            const newSrc = latestSongs[index].file!;
            if (audio.src !== newSrc) {
                audio.src = newSrc;
                audio.load();
                audio.currentTime = 0;
            }

            audioRef.current.play();
            setIsPlaying(true);
        } catch (e) {
            console.log('Failed to play', e);
        }
    }, [setIsPlaying, setCurrentSongIndex]);

    const resume = useCallback(() => {
        audioRef.current.play().catch(console.error);
        setIsPlaying(true);
    }, [setIsPlaying]);

    const pause = useCallback(() => {
        audioRef.current.pause();
        setIsPlaying(false);
    }, [setIsPlaying]);

    const toggle = useCallback(() => {
        if (isPlaying) {
            pause();
        } else if (currentSongIndex === -1 && songs.length > 0) {
            setCurrentSongIndex(0);
        } else {
            resume();
        }
    }, [isPlaying, pause, resume, currentSongIndex, songs, setCurrentSongIndex]);

    const activateLoop = useCallback(() => {
        setInLoop(true);
    }, []);

    const deactivateLoop = useCallback(() => {
        setInLoop(false);
    }, []);

    const seek = useCallback((percentage: number) => {
        const audio = audioRef.current;
        const newTime = (percentage / 100) * audio.duration;
        if (!isNaN(newTime) && audio.duration > 0 && Math.abs(audio.currentTime - newTime) > 0.05) {
            audio.currentTime = newTime;
        }
    }, []);

    const setVolume = useCallback((value: number) => {
        const newVolume = value / 100;
        audioRef.current.volume = newVolume;
        setVolumeState(newVolume);
    }, []);

    const navigateToTrack = useCallback((offset: number) => {
        const latestSongs = songsRef.current;

        if (latestSongs.length === 0) {
            setIsPlaying(false);
            setCurrentSongIndex(-1);
            return;
        }

        let targetIndex = currentSongIndex + offset;

        if (targetIndex < 0) {
            if (inLoop) {
                targetIndex = latestSongs.length - 1;
            } else {
                setIsPlaying(false);
                setCurrentSongIndex(0);
                return;
            }
        } else if (targetIndex >= latestSongs.length) {
            if (inLoop) {
                targetIndex = 0;
            } else {
                setIsPlaying(false);
                setCurrentSongIndex(-1);
                return;
            }
        }
        setCurrentSongIndex(targetIndex);
    }, [currentSongIndex, inLoop, setCurrentSongIndex, setIsPlaying, setCurrentSongIndex]);

    const nextTrack = useCallback(() => {
        navigateToTrack(1);
    }, [navigateToTrack]);

    const prevTrack = useCallback(() => {
        navigateToTrack(-1);
    }, [navigateToTrack]);

    const addTrack = useCallback((newSong: Song) => {
        setSongs((prevSongs) => [...prevSongs, newSong]);
    }, []);

    const removeTrack = useCallback((songToRemove: Song) => {
        setSongs((prevSongs) => prevSongs.filter((s) => s.uuid !== songToRemove.uuid));
    }, []);

    const setTracks = useCallback((newSongs: Song[], shuffle: boolean = false) => {
        let songsToSet = [...newSongs];
        if (shuffle) {
            for (let i = songsToSet.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = songsToSet[i];
                songsToSet[i] = songsToSet[j];
                songsToSet[j] = temp;
            }
        }

        setSongs(songsToSet);
        if (songsToSet.length > 0) {
            setIsPlaying(true);
            setCurrentSongIndex(0);
        } else {
            pause();
            setCurrentSongIndex(-1);
        }
    }, [pause, setCurrentSongIndex]);

    const handleEnd = useCallback(() => {
        nextTrack();
    }, [nextTrack]);

    const playAsUniqueTrack = useCallback((song: Song) => {
        setTracks([song], false);
    }, [setTracks]);

    useEffect(() => {
        const audio = audioRef.current;
        const latestSongs = songsRef.current;

        const updateProgress = () => {
            if (isNaN(audio.duration) || audio.duration === 0) {
                setProgress(0);
                setCurrentTime(0);
                setDuration(0);
                return;
            }
            setDuration(audio.duration);
            setCurrentTime(audio.currentTime);
            setProgress((audio.currentTime / audio.duration) * 100);
        };

        const handleEnded = () => nextTrack();

        audio.addEventListener("timeupdate", updateProgress);
        audio.addEventListener("ended", handleEnded);

        if (currentSongIndex !== -1 && latestSongs.length > 0 && latestSongs[currentSongIndex] && latestSongs[currentSongIndex].file) {
            const newSrc = latestSongs[currentSongIndex].file!;
            if (audio.src !== newSrc) {
                audio.src = newSrc;
                audio.load();
                audio.currentTime = 0;
            }
        } else if (audio.src) {
            audio.pause();
            audio.src = "";
            setIsPlaying(false);
            setProgress(0);
            setCurrentTime(0);
            setDuration(0);
        }

        const flattenSong = (songList: Song[]): string => songList.flatMap((s) => s.uuid).join(',');
        if (!isMounted && currentSongIndex === initialState.currentSongIndex && flattenSong(songs) === flattenSong(initialState.songs)) {
            if (initialState.currentSongIndex !== -1 && initialState.songs && initialState.songs[initialState.currentSongIndex] && initialState.songs[initialState.currentSongIndex].file) {
                audio.currentTime = initialState.currentTime;
            }

            setIsMounted(true);
        }

        return () => {
            audio.removeEventListener("timeupdate", updateProgress);
            audio.removeEventListener("ended", handleEnded);
            audio.removeEventListener("canplaythrough", () => {});
        };
    }, [currentSongIndex, songs, handleEnd, volume, initialState, isMounted, setIsMounted]);

    useEffect(() => {
        if (audioRef.current.volume !== volume) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        const stateToSave = {
            songs: songs,
            currentSongIndex: currentSongIndex,
            volume: volume,
            inLoop: inLoop,
            currentTime: currentTime,
            duration: duration,
            progress: progress,
        };
        localStorage.setItem(localStorageKey, JSON.stringify(stateToSave));
    }, [songs, currentSongIndex, volume, inLoop, currentTime, duration, progress]);

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
                addTrack,
                removeTrack,
                setTracks,
                nextTrack,
                prevTrack,
            }}
        >
            {children}
        </AudioContext.Provider>
    );
};
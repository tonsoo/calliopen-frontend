import { useCallback, useState, type ReactNode } from "react";
import type DefaultProps from "../../../../traits/DefaultProps";
import IconButton from "../../buttons/icon-button/IconButton";
import PlaySvg from '../../../../assets/icons/generics/play.svg';
import PauseSvg from '../../../../assets/icons/controls/pause.svg';
import PreviousSvg from '../../../../assets/icons/controls/previous.svg';
import NextSvg from '../../../../assets/icons/controls/next.svg';
import RepeatOnceSvg from '../../../../assets/icons/controls/repeat-once.svg';
import ShuffleSvg from '../../../../assets/icons/controls/shuffle.svg';
import VolumeSvg from '../../../../assets/icons/controls/volume.svg';
import VolumeDecreasedSvg from '../../../../assets/icons/controls/volume-decreased.svg';
import VolumeOffSvg from '../../../../assets/icons/controls/volume-off.svg';
import './CurrentTrackWrapper.scss';
import ControlButton from "../../buttons/control-button/ControllButton";
import DraggableProgressBar from "../../bars/draggable-progress-bar/DraggableProgressBar";
import './CurrentTrackWrapper.scss';
import { useAudio } from "../../../../providers/AudioProvider";

interface CurrentTrackerWrapperProps extends DefaultProps {
    children?: ReactNode
}

export default function CurrentTrackerWrapper({
    className = "", children
}: CurrentTrackerWrapperProps) {
    const {
        isPlaying,
        progress,
        activateLoop,
        deactivateLoop,
        inLoop,
        seek,
        volume,
        setVolume,
        toggle,
        nextTrack,
        prevTrack,
        currentSongIndex,
        songs,
    } = useAudio();
    const [oldVolume, setOldVolume] = useState(volume);

    const handleSeek = useCallback((newProgress: number) => {
        seek(newProgress);
    }, [seek]);

    const setNewOldVolume = (value: number) => {
        if (value >= 1) {
            setOldVolume(value);
        }
    };

    const handleVolumeClick = useCallback(() => {
        setNewOldVolume(volume);
        setVolume(volume == 0 ? oldVolume : 0);
    }, [oldVolume, volume]);

    const handleVolumeChange = useCallback((newProgress: number) => {
        setNewOldVolume(newProgress);
        setVolume(newProgress);
    }, [setVolume]);

    const handleVolumeDragEnd = useCallback((newProgress: number) => {
        setNewOldVolume(newProgress);
        setVolume(newProgress);
    }, [setVolume]);

    const currentSong = currentSongIndex !== -1 ? songs?.[currentSongIndex] : null;

    let volumeIcon = VolumeSvg;
    if (volume == 0) {
        volumeIcon = VolumeOffSvg;
    } else if (volume < .5) {
        volumeIcon = VolumeDecreasedSvg;
    }

    return (
        <div className={["app-current-track-wrapper has-transitions", className, currentSong ? "playing" : ""].join(" ")}>
            <div className="current-track">
                <div className="track-information-container">
                    {currentSong?.cover
                        ? <img className="cover" src={currentSong?.cover} alt="" />
                        : <div className="cover"></div>}
                    <div className="track-information">
                        <p className="title">{currentSong?.name || "No song playing"}</p>
                        {currentSong?.album?.creator?.name && <p className="author">{currentSong?.album?.creator?.name}</p>}
                    </div>
                </div>

                <div className="controls-container">
                    <div className="controls">
                        <ControlButton src={ShuffleSvg} />
                        <ControlButton src={PreviousSvg} onClick={prevTrack} />
                        <IconButton src={isPlaying ? PauseSvg : PlaySvg} onClick={toggle} />
                        <ControlButton src={NextSvg} onClick={nextTrack} />
                        <ControlButton onClick={inLoop ? deactivateLoop : activateLoop} src={RepeatOnceSvg} />
                    </div>

                    <DraggableProgressBar
                        initialPercentage={progress}
                        onDragEnd={handleSeek}
                    />
                </div>

                <div className="volume">
                    <ControlButton onClick={handleVolumeClick} src={volumeIcon} />
                    <div className="volume-bar">
                        <DraggableProgressBar
                            initialPercentage={volume * 100}
                            onChange={handleVolumeChange}
                            onDragEnd={handleVolumeDragEnd}
                        />
                    </div>
                </div>
            </div>

            {children}
        </div>
    );
}
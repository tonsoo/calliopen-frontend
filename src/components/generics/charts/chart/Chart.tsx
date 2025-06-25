import type DefaultProps from "../../../../traits/DefaultProps";
import './Chart.scss';
import type { Song } from "../../../../api";
import formatDuration from "../../../../helpers/time";
import { useAudio } from "../../../../providers/AudioProvider";
import SongContextWrapper from "../../wrappers/contexts/song-context-wrapper/SongContextWrapper";
import { useState } from "react";
import FavoriteSongButton from "../../buttons/favorite-song-button/FavoriteSongButton";

interface ChartProps extends DefaultProps {
    song: Song;
}

export default function Chart({
    className = "", song,
} : ChartProps) {
    const { playAsUniqueTrack } = useAudio();
    const [songValue, setSong] = useState(song);

    const handleClick = () => playAsUniqueTrack(song);
    const handleSongChange = (song:Song) => setSong(song);
    
    return (
        <SongContextWrapper song={song}>
            <div onClick={handleClick} className={"app-chart hoverable " + className}>
                <img className="cover" src={song.cover!} alt={song.album! + song.name!} />

                <div className="information">
                    <p className="title">{song.name}</p>
                    <p className="author">{song.album?.creator?.name}</p>
                    <p className="time">{formatDuration(song.duration! / 1000, true)}</p>
                </div>

                <FavoriteSongButton className="like" song={songValue} onChanged={handleSongChange} />
            </div>
        </SongContextWrapper>
    );
}
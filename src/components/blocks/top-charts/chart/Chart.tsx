import { ReactSVG } from "react-svg";
import type DefaultProps from "../../../../traits/DefaultProps";
import HeartSvg from "../../../../assets/icons/actions/empty-heart.svg";
import './Chart.scss';
import type { Song } from "../../../../api";
import formatDuration from "../../../../helpers/time";
import { useAudio } from "../../../../providers/AudioProvider";

interface ChartProps extends DefaultProps {
    song: Song;
}

export default function Chart({
    className = "", song,
} : ChartProps) {
    const { playAsUniqueTrack } = useAudio();
    const handleClick = () => playAsUniqueTrack(song);
    
    return (
        <div onClick={handleClick} className={"app-chart hoverable " + className}>
            <img className="cover" src={song.cover!} alt={song.album! + song.name!} />

            <div className="information">
                <p className="title">{song.name}</p>
                <p className="author">{song.album?.creator?.name}</p>
                <p className="time">{formatDuration(song.duration! / 1000)}</p>
            </div>

            <button type="button" className="like">
                <ReactSVG className="icon has-icon aspect-square" src={HeartSvg} />
            </button>
        </div>
    );
}
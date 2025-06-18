import type { Song } from "../../../../api";
import formatDuration from "../../../../helpers/time";
import type DefaultProps from "../../../../traits/DefaultProps";
import IconButton from "../../buttons/icon-button/IconButton";
import './TableViewChart.scss';
import EmptyHeartSvg from '../../../../assets/icons/actions/empty-heart.svg';
import MenuSvg from '../../../../assets/icons/generics/menu.svg';
import { useAudio } from "../../../../providers/AudioProvider";

interface TableViewChartProps extends DefaultProps {
    song: Song;
}

export default function TableViewChart({
    song, className = ""
}: TableViewChartProps) {
    const { playAsUniqueTrack } = useAudio();
    const handleClick = () => playAsUniqueTrack(song);

    return (
        <div onClick={handleClick} className={"app-table-view-chart hoverable " + className}>
            <div className="close-info grow max-w-[50%]">
                <img className="cover" src={song.cover!} alt={song.name} />

                <IconButton src={EmptyHeartSvg} />

                <p className="text name grow">{song.name}</p>
            </div>

            <p className="text duration">{formatDuration(song.duration! / 1000)}</p>

            <IconButton fillClass="golden-icon golden-stroke" src={MenuSvg} />
        </div>
    )
}
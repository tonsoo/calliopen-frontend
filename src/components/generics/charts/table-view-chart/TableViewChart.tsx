import type { Song } from "../../../../api";
import formatDuration from "../../../../helpers/time";
import type DefaultProps from "../../../../traits/DefaultProps";
import IconButton from "../../buttons/icon-button/IconButton";
import './TableViewChart.scss';
import EmptyHeartSvg from '../../../../assets/icons/actions/empty-heart.svg';
import HeartSvg from '../../../../assets/icons/actions/heart.svg';
import MenuSvg from '../../../../assets/icons/generics/menu.svg';
import { useAudio } from "../../../../providers/AudioProvider";
import SongContextWrapper from "../../wrappers/contexts/song-context-wrapper/SongContextWrapper";
import { handleFavoriteChange } from "../../buttons/favorite-song-button/FavoriteSongButton";
import { useState } from "react";
import { Query, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../App";

interface TableViewChartProps extends DefaultProps {
    song: Song;
}

export default function TableViewChart({
    song, className = ""
}: TableViewChartProps) {
    const { playAsUniqueTrack } = useAudio();
    const [songValue, setSong] = useState(song);
    const client = useQueryClient();

    const handleClick = () => playAsUniqueTrack(song);
    const handleFavorite = async (e:React.MouseEvent<Element, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        const newSong = await handleFavoriteChange(songValue);
        client.invalidateQueries({
            predicate: (query: Query) =>
                [
                    queryKeys.favorites,
                    queryKeys.songs,
                    queryKeys.playlists,
                    queryKeys.albums
                ].some((v) => query.queryKey.includes(v))
        });
        setSong(newSong);
    };

    return (
        <SongContextWrapper song={song}>
            <div onClick={handleClick} className={"app-table-view-chart hoverable " + className}>
                <div className="close-info grow max-w-[50%]">
                    <img className="cover" src={song.cover!} alt={song.name} />

                    <IconButton onClick={handleFavorite} src={songValue.is_favorite ? HeartSvg : EmptyHeartSvg} />

                    <p className="text name grow">{song.name}</p>
                </div>

                <p className="text duration">{formatDuration(song.duration! / 1000, true)}</p>

                <IconButton fillClass="golden-icon golden-stroke" src={MenuSvg} />
            </div>
        </SongContextWrapper>
    )
}
import { Query, useQueryClient } from "@tanstack/react-query";
import type { Song } from "../../../../api";
import SongsService from "../../../../http/services/songs-service";
import type DefaultProps from "../../../../traits/DefaultProps";
import { ReactSVG } from "react-svg";
import HeartSvg from "../../../../assets/icons/actions/empty-heart.svg";
import FullHeartSvg from "../../../../assets/icons/actions/heart.svg";
import './FavoriteSongButton.scss';
import { queryKeys } from "../../../../App";

interface FavoriteSongButtonProps extends DefaultProps {
    song: Song;
    onChanged?: (song:Song) => void;
}

export async function handleFavoriteChange(song:Song) : Promise<Song> {
    const newSong = await new SongsService().favoriteSong(song.uuid!);
    return newSong!;
}

export default function FavoriteSongButton({
    song, onChanged, className = ""
} : FavoriteSongButtonProps) {
    const client = useQueryClient();
    
    const handleFavorite = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const newSong = await handleFavoriteChange(song);
        client.invalidateQueries({
            predicate: (query: Query) =>
                [
                    queryKeys.favorites,
                    queryKeys.songs,
                    queryKeys.playlists,
                    queryKeys.albums
                ].some((v) => query.queryKey.includes(v))
        });
        if (onChanged) {
            onChanged(newSong!);
        }
    };
    
    return (
        <button onClick={handleFavorite} type="button" className={"app-favorite-song-button " + className}>
            <ReactSVG className="icon has-icon aspect-square" src={song.is_favorite ? FullHeartSvg : HeartSvg} />
        </button>
    );
}
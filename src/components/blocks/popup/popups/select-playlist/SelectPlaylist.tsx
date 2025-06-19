import { useEffect } from "react";
import type PopupProps from "../../../../../traits/PopupProps";
import { ApiError, PlaylistsService, type Playlist } from "../../../../../api";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../loading/Loading";
import ApiErrorBlock from "../../../api-error-block/ApiErrorBlock";
import PlaylistSelection from "../../../../generics/playlists/playlist-selection/PlaylistSelection";
import './SelectPlaylist.scss';

interface SelectPlaylistProps extends PopupProps {
    userUuid: string;
    onSelect: (playlist: Playlist) => void;
}

export default function SelectPlaylist({
    className = "", onClose, userUuid, onSelect
} : SelectPlaylistProps) {
    const playlistsQuery = useQuery({
        queryKey: ['load-playlists'],
        staleTime: 1000 * 60 * 10,
        retry: false,
        queryFn: () => PlaylistsService.getUserPlaylists(userUuid, -1)
    });

    useEffect(() => {
        if (playlistsQuery.isLoading || !playlistsQuery.isFetched) return;

        if (playlistsQuery.isError) {
            // const error = albumsQuery.error as ApiError;
            // @TODO: handle errors
            return;
        }
    });

    if (playlistsQuery.isLoading) return <Loading />;
    if (playlistsQuery.isError) return <ApiErrorBlock error={playlistsQuery.error as ApiError} />;

    const handlePlaylistClick = (playlist: Playlist) => {
        onSelect(playlist);
        onClose();
    }
    
    const playlists = playlistsQuery.data;

    return (
        <div className={"app-select-playlist " + className}>
            <p className="select-title">Select your playlist</p>
            <div className="playlist-collection">
                {playlists?.map((p) => <PlaylistSelection playlist={p} onClick={() => handlePlaylistClick(p)} />)}
            </div>
        </div>
    );
}
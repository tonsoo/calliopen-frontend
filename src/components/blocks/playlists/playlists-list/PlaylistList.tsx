import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../../http/token";
import { routesList } from "../../../../AppRoutes";
import { useQuery } from "@tanstack/react-query";
import { ApiError, PlaylistsService } from "../../../../api";
import Loading from "../../loading/Loading";
import ApiErrorBlock from "../../api-error-block/ApiErrorBlock";
import ErrorText from "../../../partials/error-text/ErrorText";
import PlaylistCard from "../../playlist-card/PlaylistCard";
import { queryKeys } from "../../../../App";

export default function PlaylistList() {
    const navigate = useNavigate();
    
    const user = getUser();
    if (!user) {
        navigate(routesList.login);
        return;
    }

    const playlistsQuery = useQuery({
        queryKey: [queryKeys.playlists],
        staleTime: 1000 * 60 * 10,
        retry: false,
        queryFn: () => PlaylistsService.getUserPlaylists(user.uuid!, -1)
    });

    useEffect(() => {
        if (playlistsQuery.isLoading || !playlistsQuery.isFetched) return;

        if (playlistsQuery.isError) {
            // const error = albumsQuery.error as ApiError;
            // @TODO: handle errors
            return;
        }
    });

    if (playlistsQuery.isLoading) return <Loading />
    if (playlistsQuery.isError) return <ApiErrorBlock error={playlistsQuery.error as ApiError} />;

    const playlists = playlistsQuery.data;

    return (
        <div className="app-playlist-list">
            {playlists?.length == 0 && <ErrorText text="No playlists found" />}
            {playlists?.map((p) => <PlaylistCard key={p.uuid} playlist={p} />)}
        </div>
    );
}
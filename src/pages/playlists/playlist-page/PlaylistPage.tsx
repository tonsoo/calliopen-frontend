import { useNavigate, useParams } from "react-router-dom";
import SidebarWrapper from "../../../components/generics/wrappers/sidebar-wrapper/SidebarWrapper";
import SearchBar from "../../../components/generics/inputs/search-bar/SearchBar";
import { useQuery } from "@tanstack/react-query";
import { ApiError, PlaylistsService } from "../../../api";
import { routesList } from "../../../AppRoutes";
import { useEffect } from "react";
import Loading from "../../../components/blocks/loading/Loading";
import TableViewChart from "../../../components/generics/charts/table-view-chart/TableViewChart";
import CurrentTrackerWrapper from "../../../components/generics/wrappers/current-track-wrapper/CurrentTrackWrapper";
import ScrollableContent from "../../../components/generics/wrappers/scrollable-content/ScrollableContent";
import PlaylistCover from "../../../components/generics/covers/playlist-cover/PlaylistCover";
import ApiErrorBlock from "../../../components/blocks/api-error-block/ApiErrorBlock";
import { queryKeys } from "../../../App";

export default function PlaylistPage() {
    const navigate = useNavigate();

    const { uuid, userUuid } = useParams<{ uuid: string, userUuid: string }>();

    if (!uuid || !userUuid) navigate(routesList.dashboard);

    const playlistQuery = useQuery({
        queryKey: [queryKeys.playlists, queryKeys.playlist(uuid)],
        staleTime: 1000 * 60 * 10,
        retry: false,
        queryFn: () => PlaylistsService.getSpecificPlaylist(userUuid!, uuid!)
    });

    useEffect(() => {
        if (playlistQuery.isLoading || !playlistQuery.isFetched) return;

        if (playlistQuery.isError) {
            // const error = songsQuery.error as ApiError;
            // @TODO: handle errors
            return;
        }
    });

    if (playlistQuery.isLoading) return <Loading />
    if (playlistQuery.isError) {
        const apiError = playlistQuery.error as ApiError;
        // 403: Tried accessing a private playlist
        if (![403].includes(apiError.status)) {
            return <ApiErrorBlock error={apiError} />;
        }
    }

    if (!playlistQuery.data) navigate(routesList.dashboard);

    const playlist = playlistQuery.data!;

    return (
        <CurrentTrackerWrapper>
            <div className="default-page page-playlists-playlist">
                <SidebarWrapper>
                    <SearchBar className="mb-9" />
                    <ScrollableContent className="has-current-track">
                        <PlaylistCover className="mb-14" playlist={playlist} />

                        <div className="app-songs-table flex flex-col items-stretch justify-start gap-4">
                            {playlist.songs?.map((song) => <TableViewChart key={song.song?.uuid} song={song.song!} />)}
                        </div>
                    </ScrollableContent>
                </SidebarWrapper>
            </div>
        </CurrentTrackerWrapper>
    );
}
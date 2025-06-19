import CollectionButton from "../../../components/generics/buttons/collection-button/CollectionButton";
import SearchBar from "../../../components/generics/inputs/search-bar/SearchBar";
import CurrentTrackerWrapper from "../../../components/generics/wrappers/current-track-wrapper/CurrentTrackWrapper";
import ScrollableContent from "../../../components/generics/wrappers/scrollable-content/ScrollableContent";
import SidebarWrapper from "../../../components/generics/wrappers/sidebar-wrapper/SidebarWrapper";
import ContextMenu from "../../../components/partials/context-menu/ContextMenu";
import PlaylistCard from "../../../components/blocks/playlist-card/PlaylistCard";
import './MyPlaylists.scss';
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ApiError, PlaylistsService } from "../../../api";
import { getUser } from "../../../http/token";
import { useNavigate } from "react-router-dom";
import { routesList } from "../../../AppRoutes";
import Loading from "../../../components/blocks/loading/Loading";
import ApiErrorBlock from "../../../components/blocks/api-error-block/ApiErrorBlock";
import ErrorText from "../../../components/partials/error-text/ErrorText";

export default function MyPlaylists() {
    const navigate = useNavigate();
    const user = getUser();
    if (!user) {
        navigate(routesList.login);
        return;
    }

    const playlistsQuery = useQuery({
        queryKey: ['load-playlists'],
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

    console.log(playlists, user);

    return (
        <CurrentTrackerWrapper>
            <ContextMenu />
            <div className="default-page page-my-playlists">
                <SidebarWrapper>
                    <SearchBar className="mb-8" />

                    <ScrollableContent className="mb-10 shrink-0" axis="horizontal" scrollBarVisible={false}>
                        <div className="collection-list">
                            <CollectionButton text="My collection" selected={true} />
                            <CollectionButton text="Likes" selected={false} />
                        </div>
                    </ScrollableContent>

                    <ScrollableContent>
                        <div className="collection-list">
                            {playlists?.length == 0 && <ErrorText text="No playlists found" />}
                            {playlists?.map((p) => <PlaylistCard key={p.uuid} playlist={p} />)}
                        </div>
                    </ScrollableContent>
                </SidebarWrapper>
            </div>
        </CurrentTrackerWrapper>
    );
}
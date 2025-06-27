import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../../http/token";
import { routesList } from "../../../../AppRoutes";
import { useQuery } from "@tanstack/react-query";
import { ApiError, PlaylistsService } from "../../../../api";
import Loading from "../../loading/Loading";
import ApiErrorBlock from "../../api-error-block/ApiErrorBlock";
import PlaylistCard from "../../playlist-card/PlaylistCard";
import { queryKeys } from "../../../../App";
import Card from "../../card/Card";
import { ReactSVG } from "react-svg";
import AddSongSvg from '../../../../assets/icons/generics/add-song.svg';
import './PlaylistList.scss';
import ScrollableContent from "../../../generics/wrappers/scrollable-content/ScrollableContent";
import { usePopup } from "../../../../providers/PopupProvider";
import PlaylistCreationForm from "../../forms/playlist-creation-form/PlaylistCreationForm";

export default function PlaylistList() {
    const navigate = useNavigate();
    const { openPopup } = usePopup();
    
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

    const handlePopupCreation = () => {
        openPopup(PlaylistCreationForm);
    };

    return (
        <ScrollableContent className="app-playlist-list">
            <Card
                onClick={handlePopupCreation}
                background={<div className="create-playlist-background"></div>}
                content={
                    <div className="create-playlist-content">
                        <ReactSVG className="icon has-icon aspect-square" src={AddSongSvg} />
                    </div>
                }
                />
            {playlists?.map((p) => <PlaylistCard key={p.uuid} playlist={p} />)}    
        </ScrollableContent>
    );
}
import { useNavigate, useParams } from "react-router-dom";
import SidebarWrapper from "../../../components/generics/wrappers/sidebar-wrapper/SidebarWrapper";
import SearchBar from "../../../components/generics/inputs/search-bar/SearchBar";
import { useQuery } from "@tanstack/react-query";
import { AlbumsService } from "../../../api";
import { routesList } from "../../../AppRoutes";
import { useEffect } from "react";
import Loading from "../../../components/blocks/loading/Loading";
import TableViewChart from "../../../components/generics/charts/table-view-chart/TableViewChart";
import AlbumCover from "../../../components/generics/covers/album-cover/AlbumCover";

export default function AlbumPage() {
    const navigate = useNavigate();

    const { uuid } = useParams<{ uuid: string }>();

    if (!uuid) navigate(routesList.dashboard);

    const albumQuery = useQuery({
        queryKey: [`load-album-${uuid}`],
        staleTime: 1000 * 60 * 10,
        retry: false,
        queryFn: () => AlbumsService.getAlbum(uuid!)
    });

    useEffect(() => {
        if (albumQuery.isLoading || !albumQuery.isFetched) return;

        if (albumQuery.isError) {
            // const error = songsQuery.error as ApiError;
            // @TODO: handle errors
            return;
        }
    });

    if (albumQuery.isLoading) return <Loading />
    if (albumQuery.isError) return "Error loading!";

    if (!albumQuery.data) navigate(routesList.dashboard);

    const album = albumQuery.data!;

    return (
        <div className="page-albums-album">
            <SidebarWrapper>
                <SearchBar className="mb-9" />
                <AlbumCover className="mb-14" album={album} />

                <div className="app-songs-table flex flex-col items-stretch justify-start gap-4">
                    {album.songs?.map((song) => <TableViewChart key={song.uuid} song={song} />)}
                </div>
            </SidebarWrapper>
        </div>
    );
}
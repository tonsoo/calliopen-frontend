import { useQuery } from "@tanstack/react-query";
import ScrollList from "../../generics/wrappers/scroll-list/ScrollList";
import TitleWrapper from "../../generics/wrappers/title-wrapper/TitleWrapper";
import { AlbumsService } from "../../../api";
import { useEffect } from "react";
import Loading from "../loading/Loading";
import type DefaultProps from "../../../traits/DefaultProps";
import Album from "./album/Album";

interface NewReleasesProps extends DefaultProps {
}

export default function NewReleases({
    className = ""
} : NewReleasesProps) {
    const albumsQuery = useQuery({
        queryKey: ['load-albums'],
        staleTime: 1000 * 60 * 10,
        retry: false,
        queryFn: () => AlbumsService.getAlbums(1, 20)
    });

    useEffect(() => {
        if (albumsQuery.isLoading || !albumsQuery.isFetched) return;

        if (albumsQuery.isError) {
            // const error = albumsQuery.error as ApiError;
            // @TODO: handle errors
            return;
        }
    });

    if (albumsQuery.isLoading) return <Loading />
    if (albumsQuery.isError) return "Error loading!";
    if (albumsQuery.data?.length == 0) return <></>;

    return (
        <TitleWrapper className={"new-releases " + className} title="New releases">
            <ScrollList className="gap-8">
                {albumsQuery.data?.map((album) => <Album key={album.uuid} album={album} />)}
            </ScrollList>
        </TitleWrapper>
    );
}
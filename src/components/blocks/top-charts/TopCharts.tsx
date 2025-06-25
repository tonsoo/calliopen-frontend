import { useQuery } from "@tanstack/react-query";
import TitleWrapper from "../../generics/wrappers/title-wrapper/TitleWrapper";
import Chart from "../../generics/charts/chart/Chart";
import './TopCharts.scss';
import { SongsService } from "../../../api";
import { useEffect } from "react";
import Loading from "../loading/Loading";
import { queryKeys } from "../../../App";

export default function TopCharts() {
    const songsQuery = useQuery({
        queryKey: [queryKeys.songs],
        staleTime: 1000 * 60 * 10,
        retry: false,
        queryFn: () => SongsService.getSongs(1, 3)
    });

    useEffect(() => {
        if (songsQuery.isLoading || !songsQuery.isFetched) return;

        if (songsQuery.isError) {
            // const error = songsQuery.error as ApiError;
            // @TODO: handle errors
            return;
        }
    });

    if (songsQuery.isLoading) return <Loading />
    if (songsQuery.isError) return "Error loading!";

    if (songsQuery.data?.length == 0) return <></>;
    
    return (
        <TitleWrapper className="app-top-charts" title="Top charts">
            <div className="flex flex-col items-stretch justify-start gap-3">
                {songsQuery.data?.map((song) => <Chart key={song.uuid} song={song} />)}
            </div>
        </TitleWrapper>
    );
}
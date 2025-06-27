import Cover from "../../../generics/covers/cover/Cover";
import FavoriteCoder from '../../../../assets/images/favorite-cover.jpg';
import TransparentRoundedButton from "../../../generics/buttons/transparent-rounded-button/TransparentRoundedButton";
import PlaySvg from '../../../../assets/icons/generics/play.svg';
import ShuffleSvg from '../../../../assets/icons/controls/shuffle.svg';
import { useAudio } from "../../../../providers/AudioProvider";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../../http/token";
import { routesList } from "../../../../AppRoutes";
import { useQuery } from "@tanstack/react-query";
import { ApiError, SongsService } from "../../../../api";
import { useEffect } from "react";
import Loading from "../../loading/Loading";
import ApiErrorBlock from "../../api-error-block/ApiErrorBlock";
import TableViewChart from "../../../generics/charts/table-view-chart/TableViewChart";
import ScrollableContent from "../../../generics/wrappers/scrollable-content/ScrollableContent";
import { queryKeys } from "../../../../App";

export default function FavoriteList() {
    const { setTracks } = useAudio();
    const navigate = useNavigate();
    
    const user = getUser();
    if (!user) {
        navigate(routesList.login);
        return;
    }

    const favoritesQuery = useQuery({
        queryKey: [queryKeys.favorites],
        staleTime: 1000 * 60 * 10,
        retry: false,
        queryFn: () => SongsService.getFavoriteSongs()
    });

    useEffect(() => {
        if (favoritesQuery.isLoading || !favoritesQuery.isFetched) return;

        if (favoritesQuery.isError) {
            // const error = albumsQuery.error as ApiError;
            // @TODO: handle errors
            return;
        }
    });

    if (favoritesQuery.isLoading) return <Loading />
    if (favoritesQuery.isError) return <ApiErrorBlock error={favoritesQuery.error as ApiError} />;

    const favorites = favoritesQuery.data;
    
    const handlePlayClicked = () => setTracks(favorites!);
    const handleShuffleClicked = () => setTracks(favorites!, true);
    
    const totalDuration = favorites?.map((s) => s.duration).reduce((a, b) => a! + b!, 0);
    return (
        <ScrollableContent className="has-current-track">
            <Cover
                name="Favorites"
                className="mb-10"
                src={FavoriteCoder!}
                totalDuration={totalDuration!}
                creatorName={user.name}
                totalSongs={favorites?.length}
            >
                {favorites != null && favorites.length > 1 &&
                    <>
                        <TransparentRoundedButton
                            onClick={handlePlayClicked}
                            src={PlaySvg}
                            className="golden-icon"
                            text="Play all" />
                        
                        <TransparentRoundedButton
                            onClick={handleShuffleClicked}
                            src={ShuffleSvg}
                            className="golden-icon"
                            text="Shuffle all" />
                    </>
                }
            </Cover>
            
            <div className="app-songs-table flex flex-col items-stretch justify-start gap-4">
                {favorites?.map((song) => <TableViewChart key={song.uuid} song={song} />)}
            </div>
        </ScrollableContent>
    );
}
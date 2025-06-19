import type { Playlist } from "../../../../api";
import type DefaultProps from "../../../../traits/DefaultProps";
import TransparentRoundedButton from "../../buttons/transparent-rounded-button/TransparentRoundedButton";
import PlaySvg from '../../../../assets/icons/generics/play.svg';
import ShuffleSvg from '../../../../assets/icons/controls/shuffle.svg';
import Cover from "../cover/Cover";
import { useAudio } from "../../../../providers/AudioProvider";

interface PlaylistCoverProps extends DefaultProps {
    playlist: Playlist;
}

export default function PlaylistCover({
    playlist, className = ""
} : PlaylistCoverProps) {
    const { setTracks } = useAudio();

    const mappedSongs = playlist.songs?.map((s) => s.song!)!;
    const handlePlayClicked = () => setTracks(mappedSongs);
    const handleShuffleClicked = () => setTracks(mappedSongs, true);

    const totalDuration = playlist.songs?.map((s) => s.song?.duration).reduce((a, b) => a! + b!);
    return (
        <div className={"app-album-cover " + className}>
            <Cover
                name={playlist.name!}
                src={playlist.cover!}
                totalDuration={totalDuration!}
                creatorName={playlist.creator?.username}
                totalSongs={playlist.songs?.length}
            >
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

                {/* <TransparentRoundedButton
                    onClick={() => {}}
                    className="red-icon"
                    src={HeartSvg} /> */}
            </Cover>
        </div>
    );
}
import type { Playlist } from "../../../../api";
import type DefaultProps from "../../../../traits/DefaultProps";
import TransparentRoundedButton from "../../buttons/transparent-rounded-button/TransparentRoundedButton";
import PlaySvg from '../../../../assets/icons/generics/play.svg';
import Cover from "../cover/Cover";

interface PlaylistCoverProps extends DefaultProps {
    playlist: Playlist;
}

export default function PlaylistCover({
    playlist, className = ""
} : PlaylistCoverProps) {
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
                    onClick={() => {}}
                    src={PlaySvg}
                    className="golden-icon"
                    text="Play all" />

                {/* <TransparentRoundedButton
                    onClick={() => {}}
                    className="red-icon"
                    src={HeartSvg} /> */}
            </Cover>
        </div>
    );
}
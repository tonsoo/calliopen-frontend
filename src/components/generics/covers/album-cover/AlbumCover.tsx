import type { Album } from "../../../../api";
import type DefaultProps from "../../../../traits/DefaultProps";
import TransparentRoundedButton from "../../buttons/transparent-rounded-button/TransparentRoundedButton";
import PlaySvg from '../../../../assets/icons/generics/play.svg';
import AddSongSvg from '../../../../assets/icons/generics/add-song.svg';
import HeartSvg from '../../../../assets/icons/actions/heart.svg';
import Cover from "../cover/Cover";

interface AlbumCoverProps extends DefaultProps {
    album: Album;
}

export default function AlbumCover({
    album, className = ""
} : AlbumCoverProps) {
    const totalDuration = album.songs?.map((s) => s.duration).reduce((a, b) => a! + b!);
    return (
        <div className={"app-album-cover " + className}>
            <Cover
                name={album.name!}
                src={album.cover!}
                totalDuration={totalDuration!}
                creatorName={album.creator?.name}
                totalSongs={album.songs?.length}
            >
                <TransparentRoundedButton
                    onClick={() => {}}
                    src={PlaySvg}
                    className="golden-icon"
                    text="Play all" />

                <TransparentRoundedButton
                    onClick={() => {}}
                    src={AddSongSvg}
                    className="golden-icon"
                    text="Add to collection" />

                <TransparentRoundedButton
                    onClick={() => {}}
                    className="red-icon"
                    src={HeartSvg} />
            </Cover>
        </div>
    );
}
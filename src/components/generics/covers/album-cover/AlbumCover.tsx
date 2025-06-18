import type { Album } from "../../../../api";
import formatDuration from "../../../../helpers/time";
import type DefaultProps from "../../../../traits/DefaultProps";
import TransparentRoundedButton from "../../buttons/transparent-rounded-button/TransparentRoundedButton";
import './AlbumCover.scss';
import PlaySvg from '../../../../assets/icons/generics/play.svg';
import AddSongSvg from '../../../../assets/icons/generics/add-song.svg';
import HeartSvg from '../../../../assets/icons/actions/heart.svg';

interface AlbumCoverProps extends DefaultProps {
    album: Album;
}

export default function AlbumCover({
    album, className = ""
} : AlbumCoverProps) {
    const totalDuration = album.songs?.map((s) => s.duration).reduce((a, b) => a! + b!);
    return (
        <div className={"app-album-cover " + className}>
            <img className="image" src={album.cover} alt={album.name} />

            <div className="album-information pb-5">
                <p className="title">{album.name}</p>
                {album.creator?.name && <p className="text">{album.creator?.name}</p>}
                <p className="text">{album.songs?.length} songs ~ {formatDuration(totalDuration! / 1000)} hrs</p>
                <div className="mt-10 flex items-stretch justify-start gap-4">
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
                </div>
            </div>
        </div>
    );
}
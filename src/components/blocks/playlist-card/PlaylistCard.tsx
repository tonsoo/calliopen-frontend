import type { Playlist } from "../../../api";
import formatDuration from "../../../helpers/time";
import type DefaultProps from "../../../traits/DefaultProps";
import './PlaylistCard.scss';

interface PlaylistProps extends DefaultProps {
    playlist: Playlist;
}

export default function Playlist({
    className = "", playlist
} : PlaylistProps) {
    return (
        <div className={"app-playlist " + className}>
            <img className="cover" src={playlist.cover!} alt={playlist.name} />

            <div className="content">
                <p className="title">{playlist.name}</p>
                <p className="author">{playlist.songs?.length} ~ {formatDuration(playlist.total_duration! / 1000, true)}</p>
            </div>
        </div>
    );
}
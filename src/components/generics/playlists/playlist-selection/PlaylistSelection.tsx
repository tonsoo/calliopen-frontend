import type { Playlist } from "../../../../api";
import type DefaultProps from "../../../../traits/DefaultProps";
import './PlaylistSelection.scss';

interface PlaylistSelectionProps extends DefaultProps {
    playlist: Playlist;
    onClick?: () => void;
}

export default function PlaylistSelection({
    playlist, className = "", onClick
} : PlaylistSelectionProps) {
    return (
        <div className={"app-playlist-selection hoverable " + className} onClick={onClick}>
            <p className="title">{playlist.name}</p>
        </div>
    );
}
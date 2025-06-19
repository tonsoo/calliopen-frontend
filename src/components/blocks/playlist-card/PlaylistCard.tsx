import { useNavigate } from "react-router-dom";
import type { Playlist } from "../../../api";
import formatDuration from "../../../helpers/time";
import type DefaultProps from "../../../traits/DefaultProps";
import './PlaylistCard.scss';
import { routesList } from "../../../AppRoutes";

interface PlaylistProps extends DefaultProps {
    playlist: Playlist;
}

export default function Playlist({
    className = "", playlist
} : PlaylistProps) {
    const navigate = useNavigate();

    const handleClick = () => navigate(routesList.playlist.link(playlist.uuid!));
    
    return (
        <div onClick={handleClick} className={"app-playlist hoverable " + className}>
            <img className="cover" src={playlist.cover!} alt={playlist.name} />

            <div className="content">
                <p className="title">{playlist.name}</p>
                <p className="author">~ {formatDuration(playlist.total_duration! / 1000, true)}</p>
            </div>
        </div>
    );
}
import { useNavigate } from "react-router-dom";
import type { Playlist } from "../../../api";
import formatDuration from "../../../helpers/time";
import type DefaultProps from "../../../traits/DefaultProps";
import './PlaylistCard.scss';
import { routesList } from "../../../AppRoutes";
import Card from "../card/Card";
import stringToColor from "../../../helpers/colors";

interface PlaylistCardProps extends DefaultProps {
    playlist: Playlist;
}

export default function PlaylistCard({
    className = "", playlist
} : PlaylistCardProps) {
    const navigate = useNavigate();

    const handleClick = () => navigate(routesList.playlist.link(playlist.uuid!));

    let background = <img className="cover" src={playlist.cover!} alt={playlist.name} />;
    if (!playlist.cover) {
        background = <div className="cover" style={{background: stringToColor(playlist.name!)}}></div>;
    }
    const content = (
        <>
            <p className="title">{playlist.name}</p>
            <p className="author">~ {formatDuration(playlist.total_duration! / 1000, true)}</p>
        </>
    );
    
    return (
        <Card
            background={background}
            content={content}
            className={"app-playlist-card " + className}
            onClick={handleClick} />
    );
}
import { useNavigate } from "react-router-dom";
import type { Album } from "../../../../api";
import { routesList } from "../../../../AppRoutes";
import type DefaultProps from "../../../../traits/DefaultProps";
import "./Album.scss";

interface AlbumProps extends DefaultProps {
    album: Album;
}

export default function Album({
    className = "", album
} : AlbumProps) {
    const navigate = useNavigate();

    const handleClick = () => navigate(routesList.album.link(album.uuid!));
    
    return (
        <button onClick={handleClick} className={"app-album hoverable " + className}>
            <img className="cover" src={album.cover} alt={album.name + " " + album.creator} />
            <p className="title">{album.name}</p>
        </button>
    );
}
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
    return (
        <a href={routesList.album(album.uuid!)} className={"app-album " + className}>
            <img className="cover" src={album.cover} alt={album.name + " " + album.creator} />
            <p className="title">{album.name}</p>
        </a>
    );
}
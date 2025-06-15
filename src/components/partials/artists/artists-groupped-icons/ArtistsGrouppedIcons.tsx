import ArtistSmallIcon from "../artist-small-icon/ArtistSmallIcon";
import './ArtistsGrouppedIcons.scss';

export default function () {
    return (
        <div className="app-artists-groupped-icons">
            <ArtistSmallIcon src="https://randomuser.me/api/portraits/women/32.jpg" />
            <ArtistSmallIcon src="https://randomuser.me/api/portraits/women/45.jpg" />
            <ArtistSmallIcon src="https://randomuser.me/api/portraits/women/75.jpg" />
            <ArtistSmallIcon src="https://randomuser.me/api/portraits/women/63.jpg" />
            <ArtistSmallIcon src="https://randomuser.me/api/portraits/women/22.jpg" />
        </div>
    );
}
import './ArtistSmallIcon.scss';

interface ArtistSmallIcon {
    className?: string;
    src?: string;
    alt?: string;
};

export default function ArtistSmallIcon({
    className = "", src = "", alt= ""
} : ArtistSmallIcon) {
    return (
        <div className={"app-artist-small-icon " + className}>
            <img className="icon" src={src} alt={alt} />
        </div>
    );
}
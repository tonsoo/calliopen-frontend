import ArtistsGrouppedIcons from '../../partials/artists/artists-groupped-icons/ArtistsGrouppedIcons';
import './CurratedPlaylist.scss';
import Likes from './likes/Likes';

interface CurratedPlaylist {
    className?: string
}

export default function CurratedPlaylist({
    className = "",
} : CurratedPlaylist) {
    return (
        <div className={"app-currated-playlist " + className}>
            <img className="background" src="" alt="" />
            <div>
                <p className='alt'>Currated playlist</p>
                <h2 className='title'>R & B Hits</h2>
                <p className='text'>All mine, Lie again, Petty call me everyday, Out of time, No love, Bad habit, and so much more</p>

                <div className='mt-20 flex items-center justify-start gap-x-4'>
                    <ArtistsGrouppedIcons />
                    <Likes />
                </div>
            </div>
        </div>
    );
}
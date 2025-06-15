import { ReactSVG } from 'react-svg';
import HeartIcon from '../../../../assets/icons/actions/heart.svg';
import './Likes.scss';

export default function() {
    return (
        <div className="app-curated-playlist-likes">
            <ReactSVG className='icon has-icon aspect-square' src={HeartIcon} />
            <p className="likes">33k Likes</p>
        </div>
    );
}
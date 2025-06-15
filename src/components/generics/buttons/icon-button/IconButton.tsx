import { ReactSVG } from 'react-svg';
import './IconButton.scss';

interface IconButtonProps {
  src?: string;
  alt?: string;
  title?: string;
  onClick?: () => void;
}

export default function IconButton({
    src = "", alt = "", onClick, title = ""
} : IconButtonProps) {
    return (
        <button onClick={onClick} aria-label={alt} title={title} className="generic-icon-button has-transitions">
            <ReactSVG src={src} className='has-icon aspect-square icon object-contain has-transitions' />
        </button>
    );
}
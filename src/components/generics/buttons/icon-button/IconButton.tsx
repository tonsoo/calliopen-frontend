import { ReactSVG } from 'react-svg';
import './IconButton.scss';
import type DefaultProps from '../../../../traits/DefaultProps';

interface IconButtonProps extends DefaultProps {
  src?: string;
  alt?: string;
  title?: string;
  onClick?: () => void;
}

export default function IconButton({
    src = "", alt = "", onClick, title = "", className
} : IconButtonProps) {
    return (
        <button onClick={onClick} aria-label={alt} title={title} className={"generic-icon-button has-transitions hoverable " + className}>
            <ReactSVG src={src} className='has-icon aspect-square icon object-contain has-transitions' />
        </button>
    );
}
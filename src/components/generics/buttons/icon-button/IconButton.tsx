import { ReactSVG } from 'react-svg';
import './IconButton.scss';
import type DefaultProps from '../../../../traits/DefaultProps';
import type { MouseEventHandler } from 'react';

interface IconButtonProps extends DefaultProps {
  src?: string;
  alt?: string;
  title?: string;
  fillClass?: string;
  onClick?: MouseEventHandler | undefined;
  type?: "submit" | "reset" | "button" | undefined;
}

export default function IconButton({
    src = "", alt = "", onClick, title = "", className = "", type = "button", fillClass = ""
} : IconButtonProps) {
    return (
        <button type={type} onClick={onClick} aria-label={alt} title={title} className={"generic-icon-button has-transitions hoverable " + className}>
            <ReactSVG src={src} className={"has-icon aspect-square icon object-contain has-transitions " + fillClass} />
        </button>
    );
}
import { ReactSVG } from "react-svg";
import type DefaultProps from "../../../../traits/DefaultProps";
import './ControllButton.scss';

interface ControlButtonProps extends DefaultProps {
    src: string;
    onClick?: () => void;
}

export default function ControlButton({
    className = "", src, onClick
} : ControlButtonProps) {
    return (
        <button onClick={onClick} type="button" className="app-control-button">
            <ReactSVG className={"icon has-icon aspect-square hoverable " + className} src={src} />
        </button>
    );
}
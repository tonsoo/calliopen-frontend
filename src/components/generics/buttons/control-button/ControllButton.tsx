import { ReactSVG } from "react-svg";
import type DefaultProps from "../../../../traits/DefaultProps";
import './ControllButton.scss';

interface ControlButtonProps extends DefaultProps {
    src: string
}

export default function ControlButton({
    className = "", src
} : ControlButtonProps) {
    return (
        <ReactSVG className={"app-control-button icon has-icon aspect-square hoverable " + className} src={src} />
    );
}
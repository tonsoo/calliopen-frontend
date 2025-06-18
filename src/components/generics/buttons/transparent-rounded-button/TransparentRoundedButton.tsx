import { ReactSVG } from "react-svg";
import type DefaultProps from "../../../../traits/DefaultProps";
import './TransparentRoundedButton.scss';

interface TransparentRoundedButtonProps extends DefaultProps {
    text?: string;
    src?: string;
    fill?: string;
    onClick: () => void;
    type?: "submit" | "reset" | "button" | undefined;
}

export default function TransparentRoundedButton({
    onClick, text = "", className = "", type = "button", src = "", fill
} : TransparentRoundedButtonProps) {
    return (
        <button onClick={onClick} type={type} className={"app-transparent-rounded-button " + className}>
            {src && <ReactSVG className="icon has-icon aspect-square" src={src} beforeInjection={(svg) => fill ? svg.setAttribute('fill', fill) : null} />}
            {text && <p className="button-text">{text}</p>}
        </button>
    );
}
import { ReactSVG } from "react-svg";
import type DefaultProps from "../../../../traits/DefaultProps";
import type { ReactNode } from "react";
import IconSvg from '../../../../assets/icons/generics/arrow-right-thin.svg';
import './Button.scss';

interface ButtonProps extends DefaultProps {
    iconSrc?: string | null;
    children: ReactNode;
    onClick?: () => void;
    type: "submit" | "reset" | "button" | undefined;
}

export default function Button({
    className = "", children: text, iconSrc = null, onClick, type
} : ButtonProps) {
    return (
        <button type={type} onClick={onClick} className={"app-button hoverable " + className}>
            {text}
            <ReactSVG className="icon has-icon aspect-square" src={iconSrc ?? IconSvg} />
        </button>
    );
}
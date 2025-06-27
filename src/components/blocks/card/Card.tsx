import type { ReactNode } from "react";
import type DefaultButtonProps from "../../../traits/DefaultButtonProps";
import './Card.scss';

interface CardProps extends DefaultButtonProps {
    background?: ReactNode;
    content?: ReactNode;
}

export default function Card({
    className = "", onClick, background, content
} : CardProps) {
    return (
        <div onClick={onClick} className={"app-card hoverable " + className}>
            {background && <div className="background">{background}</div>}
            {content && <div className="content">{content}</div>}
        </div>
    );
}
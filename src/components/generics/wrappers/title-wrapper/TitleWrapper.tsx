import type { ReactNode } from "react";
import type DefaultProps from "../../../../traits/DefaultProps";
import './TitleWrapper.scss';

interface TitleWrapperProps extends DefaultProps {
    title: string;
    children: ReactNode;
}

export default function TitleWrapper({
    className = "", title, children
} : TitleWrapperProps) {
    return (
        <div className={"app-title-wrapper " + className}>
            <p className="title">{title}</p>
            {children}
        </div>
    );
}
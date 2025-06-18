import type { ReactNode } from "react";
import type DefaultProps from "../../../../traits/DefaultProps";
import './ScrollableContent.scss';

interface ScrollableContentProps extends DefaultProps {
    children: ReactNode;
    axis?: "horizontal" | "vertical" | "both";
    scrollBarVisible?: boolean;
}

export default function ScrollableContent({
    children, className = "", axis = "vertical", scrollBarVisible = true
} : ScrollableContentProps) {
    return (
        <div className={["app-scrollable-content", scrollBarVisible ? "has-scrollbar" : "", axis, className].join(" ")}>
            {children}
        </div>
    );
}
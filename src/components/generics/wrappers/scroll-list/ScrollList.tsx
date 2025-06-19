import type { ReactNode } from "react";
import type DefaultProps from "../../../../traits/DefaultProps";
import './ScrollList.scss';

interface ScrollListProps extends DefaultProps {
    children: ReactNode;
}

export default function ScrollList({
    className = "", children
} : ScrollListProps) {
    return (
        <div className="relative">
            <BoxShadow className="left-0 bg-gradient-to-r" />
            <BoxShadow className="right-0 bg-gradient-to-l" />
            <div className={"app-scroll-list " + className}>
                {children}
            </div>
        </div>
    );
}

function BoxShadow({
    className = ""
} : DefaultProps) {
    return <div className={"pointer-events-none absolute top-0 h-full from-black-pure/80 to-transparent z-10 w-20 " + className}></div>;
}
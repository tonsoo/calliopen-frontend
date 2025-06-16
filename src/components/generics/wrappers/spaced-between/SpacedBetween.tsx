import type { ReactNode } from "react";
import type DefaultProps from "../../../../traits/DefaultProps";
import './spaced-between.scss';

interface SpacedBetweenProps extends DefaultProps {
    children: ReactNode
}

export default function SpacedBetween({
    className = "", children
} : SpacedBetweenProps) {
    return (
        <div className={"app-spaced-between " + className}>
            {children}
        </div>
    );
}
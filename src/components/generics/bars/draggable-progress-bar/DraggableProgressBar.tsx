import { useEffect, useRef, useState } from "react";
import ProgressBar from "../progress-bar/ProgressBar";
import type DefaultProps from "../../../../traits/DefaultProps";

interface DraggableProgressBar extends DefaultProps {
    initialPercentage?: number;
    onDragStart?: () => void;
    onDragEnd?: () => void;
}

export default function DraggableProgressBar({
    initialPercentage = 0, className, onDragEnd, onDragStart
}: DraggableProgressBar) {
    const [progress, setProgress] = useState(initialPercentage);
    const [isDragging, setIsDragging] = useState(false);
    const barRef = useRef<HTMLDivElement>(null);

    const handlePointerDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        updateProgress(e);
        if (onDragStart) onDragStart();
    };

    const handlePointerMove = (e: MouseEvent) => {
        if (!isDragging) return;
        updateProgress(e);
    };

    const handlePointerUp = () => {
        setIsDragging(false);
        if (onDragEnd) onDragEnd();
    };

    const updateProgress = (e: MouseEvent | React.MouseEvent) => {
        if (!barRef.current) return;
        const rect = barRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        console.log(x, (x / rect.width) * 100);
        const percent = (x / rect.width) * 100;
        setProgress(percent);
    };

    useEffect(() => {
        window.addEventListener("mousemove", handlePointerMove);
        window.addEventListener("mouseup", handlePointerUp);
        return () => {
            window.removeEventListener("mousemove", handlePointerMove);
            window.removeEventListener("mouseup", handlePointerUp);
        };
    }, [isDragging]);

    return (
        <div
            ref={barRef}
            className="draggable-progress-bar py-2 hoverable"
            onMouseDown={handlePointerDown}
        >
            <ProgressBar percentage={progress} className={"w-full " + className} />
        </div>
    );
}
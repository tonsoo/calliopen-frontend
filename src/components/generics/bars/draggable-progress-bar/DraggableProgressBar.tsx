import { useEffect, useRef, useState } from "react";
import ProgressBar from "../progress-bar/ProgressBar";
import type DefaultProps from "../../../../traits/DefaultProps";

interface DraggableProgressBarProps extends DefaultProps { // Renamed for clarity: DraggableProgressBar -> DraggableProgressBarProps
    initialPercentage?: number;
    onDragStart?: () => void;
    onDragEnd?: (newProgress: number) => void;
    // New prop: onChange for continuous updates during drag
    onChange?: (currentPercentage: number) => void;
}

export default function DraggableProgressBar({
    initialPercentage = 0,
    className,
    onDragEnd,
    onDragStart,
    onChange // Destructure new prop
}: DraggableProgressBarProps) {
    const [progress, setProgress] = useState(initialPercentage);
    const [isDragging, setIsDragging] = useState(false);
    const barRef = useRef<HTMLDivElement>(null);

    // FIX 1: Synchronize internal 'progress' state with 'initialPercentage' prop
    useEffect(() => {
        // Only update if not currently dragging, to prevent conflicts during user interaction
        if (!isDragging) {
            setProgress(initialPercentage);
        }
    }, [initialPercentage, isDragging]); // Re-run when initialPercentage or isDragging changes

    const handlePointerDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        // Update progress immediately on pointer down for accurate starting point
        updateProgress(e);
        if (onDragStart) onDragStart();
    };

    const handlePointerMove = (e: MouseEvent) => {
        if (!isDragging) return;
        updateProgress(e);
        // FIX 2: Call onChange for continuous updates during drag
        if (onChange) {
            // We pass the current value from the state updated by updateProgress
            // Since setProgress is asynchronous, we might want to pass the calculated percentage directly
            const rect = barRef.current!.getBoundingClientRect();
            const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
            const percent = (x / rect.width) * 100;
            onChange(percent);
        }
    };

    const handlePointerUp = () => {
        if (!isDragging) return;
        setIsDragging(false);
        if (onDragEnd) onDragEnd(progress);
    };

    const updateProgress = (e: MouseEvent | React.MouseEvent) => {
        if (!barRef.current) return;
        const rect = barRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
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
    }, [isDragging, handlePointerMove, handlePointerUp]); // Add memoized handlers to dependencies

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
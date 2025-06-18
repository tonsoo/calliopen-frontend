import type DefaultProps from "../../../../traits/DefaultProps";
import './ProgressBar.scss';

export interface ProgressBarProps extends DefaultProps {
    percentage: number;
    onDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onUp?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function ProgressBar({
    percentage, className = "", onDown, onUp,
} : ProgressBarProps) {
    return (
        <div className={"app-progress-bar " + className}>
            <div className="completion-container">
                <div className="completion" style={{"width": percentage + "%"}}></div>
            </div>
            <div onMouseDown={onDown} onMouseUp={onUp} className="thumb-container" style={{"left": percentage + "%"}}>
                <div className="thumb"></div>
            </div>
        </div>
    );
}
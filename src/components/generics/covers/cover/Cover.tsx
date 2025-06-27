import formatDuration from "../../../../helpers/time";
import type DefaultProps from "../../../../traits/DefaultProps";
import type { ReactNode } from "react";
import './Cover.scss';
import stringToColor from "../../../../helpers/colors";

interface CoverProps extends DefaultProps {
    src: string;
    name: string;
    creatorName?: string | null;
    totalDuration: number;
    totalSongs?: number | null;
    children?: ReactNode;
}

export default function Cover({
    creatorName, name, src, totalDuration, className = "", totalSongs, children
} : CoverProps) {
    return (
        <div className={"app-cover " + className}>
            {src && <img className="image" src={src} alt={name} />}
            {!src && <div className="image" style={{background: stringToColor(name)}}></div>}

            <div className="information pb-5">
                <p className="title">{name}</p>
                {creatorName && <p className="text">{creatorName}</p>}
                <p className="text">{totalSongs && `${totalSongs} songs `}~ {formatDuration(totalDuration! / 1000, true)}</p>
                <div className="mt-10 flex items-stretch justify-start gap-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
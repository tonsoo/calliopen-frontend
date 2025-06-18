import type { ReactNode } from "react";
import type DefaultProps from "../../../../traits/DefaultProps";
import IconButton from "../../buttons/icon-button/IconButton";
import PlaySvg from '../../../../assets/icons/generics/play.svg';
import PreviousSvg from '../../../../assets/icons/controls/previous.svg';
import NextSvg from '../../../../assets/icons/controls/next.svg';
import RepeatOnceSvg from '../../../../assets/icons/controls/repeat-once.svg';
import ShuffleSvg from '../../../../assets/icons/controls/shuffle.svg';
import VolumeSvg from '../../../../assets/icons/controls/volume.svg';
import './CurrentTrackWrapper.scss';
import ControlButton from "../../buttons/control-button/ControllButton";
import DraggableProgressBar from "../../bars/draggable-progress-bar/DraggableProgressBar";
import './CurrentTrackWrapper.scss';

interface CurrentTrackerWrapperProps extends DefaultProps {
    children?: ReactNode
}

export default function CurrentTrackerWrapper({
    className = "", children
} : CurrentTrackerWrapperProps) {
    return (
        <div className={"app-current-track-wrapper " + className}>
            <div className="current-track">
                <div className="track-information-container">
                    <img className="cover" src="" alt="" />

                    <div className="track-information">
                        <p className="title">Seasons in</p>
                        <p className="author">James</p>
                    </div>
                </div>

                <div className="controls-container">
                    <div className="controls">
                        <ControlButton src={ShuffleSvg} />
                        <ControlButton src={PreviousSvg} />
                        <IconButton src={PlaySvg} />
                        <ControlButton src={NextSvg} />
                        <ControlButton src={RepeatOnceSvg} />
                    </div>

                    <DraggableProgressBar initialPercentage={100} />
                </div>

                <div className="volume">
                    <ControlButton src={VolumeSvg} />
                    <div className="volume-bar">
                        <DraggableProgressBar initialPercentage={20} />
                    </div>
                </div>
            </div>

            {children}
        </div>
    );
}
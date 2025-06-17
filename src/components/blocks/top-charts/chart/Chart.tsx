import { ReactSVG } from "react-svg";
import type DefaultProps from "../../../../traits/DefaultProps";
import HeartSvg from "../../../../assets/icons/actions/empty-heart.svg";
import './Chart.scss';

export default function Chart({
    className = ""
} : DefaultProps) {
    return (
        <div className={"app-chart " + className}>
            <img className="cover" src="" alt="" />

            <div className="information">
                <p className="title">Golden age of 80s</p>
                <p className="author">Sean swadder</p>
                <p className="time">2:34</p>
            </div>

            <button type="button" className="like">
                <ReactSVG className="icon has-icon aspect-square" src={HeartSvg} />
            </button>
        </div>
    );
}
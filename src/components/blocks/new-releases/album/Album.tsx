import type DefaultProps from "../../../../traits/DefaultProps";
import "./Album.scss";

export default function Album({
    className = ""
} : DefaultProps) {
    return (
        <div className={"app-album " + className}>
            <img className="cover" src="" alt="" />
            <p className="title">Life in a bubble</p>
        </div>
    );
}
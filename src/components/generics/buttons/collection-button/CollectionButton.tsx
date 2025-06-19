import type DefaultButtonProps from "../../../../traits/DefaultButtonProps";
import './CollectionButton.scss';

interface CollectionButtonProps extends DefaultButtonProps {
    text: string;
    selected?: boolean;
}

export default function CollectionButton({
    className = "", onClick, type = "button", text, selected = false
} : CollectionButtonProps) {
    return (
        <button type={type} onClick={onClick} className={["app-collection-button", selected ? "selected" : "", className].join(" ")}>
            <p className="button-text">{text}</p>
        </button>
    );
}
import type DefaultProps from "../../../../traits/DefaultProps";

interface TextButtonProps extends DefaultProps {
    text: string;
    onClick: () => void;
}

export default function TextButton({
    className = "", text, onClick
} : TextButtonProps) {
    return (
        <button onClick={onClick} className={"app-text-button hoverable " + className}>{text}</button>
    );
}
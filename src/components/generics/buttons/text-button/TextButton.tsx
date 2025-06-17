import type DefaultProps from "../../../../traits/DefaultProps";

interface TextButtonProps extends DefaultProps {
    text: string;
    onClick: () => void;
    type?: "submit" | "reset" | "button" | undefined;
}

export default function TextButton({
    className = "", text, onClick, type = "button"
} : TextButtonProps) {
    return (
        <button type={type} onClick={onClick} className={"app-text-button hoverable " + className}>{text}</button>
    );
}
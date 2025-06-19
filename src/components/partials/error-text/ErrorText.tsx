import type DefaultProps from "../../../traits/DefaultProps";
import './ErrorText.scss';

interface ErrorTextProps extends DefaultProps {
    text: string;
}

export default function ErrorText({
    text, className = ""
} : ErrorTextProps) {
    return <p className={"app-error-text " + className}>{text}</p>;
}
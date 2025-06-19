import type DefaultProps from "./DefaultProps";

export default interface DefaultButtonProps extends DefaultProps {
    type?: "submit" | "reset" | "button" | undefined;
    onClick?: () => void;
}
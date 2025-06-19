import type DefaultProps from "./DefaultProps";

export default interface PopupProps extends DefaultProps {
    onClose: () => void;
}
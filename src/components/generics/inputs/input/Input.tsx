import { ReactSVG } from "react-svg";
import type DefaultProps from "../../../../traits/DefaultProps";
import './Input.scss';
import type { ReactNode } from "react";
import type React from "react";


export interface InputProps extends DefaultProps {
    title: string;
    icon?: string;
    name?: string;
    children?: ReactNode;
    type?: string;
    error?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    ref?: React.Ref<HTMLInputElement>;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function Input({
    className = "", title, icon, children, type = "text", name = "", onChange,
    ref, onBlur, error
} : InputProps) {
    return (
        <div className={"app-input " + className}>
            <div className={["container ", error ? "has-error" : "", icon ? "" : "no-icon"].join(" ")}>
                <input onBlur={onBlur} ref={ref} onChange={onChange} className="input" placeholder=" " name={name} type={type} />
                {icon && <ReactSVG className="centered-icon icon has-icon aspect-square" src={icon} />}
                <p className="input-title has-transitions">{title}</p>
                {children}
            </div>
            {error && <p className="error">{error}</p>}
        </div>
    );
}
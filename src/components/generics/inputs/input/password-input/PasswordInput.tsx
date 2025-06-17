import { ReactSVG } from "react-svg";
import Input, { type InputProps } from "../Input";
import './PasswordInput.scss';
import EyeSvg from '../../../../../assets/icons/generics/eye.svg';
import ClosedEyeSvg from '../../../../../assets/icons/generics/closed-eye.svg';
import { useState } from "react";

interface PasswordInputProps extends InputProps {

}

export default function PasswordInput({
    icon, title, children, className, name, onChange, onBlur, ref, error
} : PasswordInputProps) {
    const [show, showPassword] = useState(false);

    const handleClick = () => {
        showPassword(!show);
    };
    
    return (
        <Input className={"app-password-input " + className}
            error={error}
            onBlur={onBlur}
            ref={ref}
            name={name}
            onChange={onChange}
            title={title}
            icon={icon}
            type={show ? "text" : "password"}>
            <button onClick={handleClick} className="centered-icon toggle-button hoverable">
                <ReactSVG className="toggle-view-icon has-icon aspect-square" src={show ? ClosedEyeSvg : EyeSvg} />
            </button>
        </Input>
    );
}
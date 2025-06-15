import './Logo.scss'
import { ReactSVG } from "react-svg";
import LogoSvg from '../../../assets/identity/logo.svg';

interface LogoProps {
    className?: string;
}

export default function Logo({ className = "" } : LogoProps) {
    return (
        <div className={"app-logo has-icon " + className}>
            <ReactSVG src={LogoSvg} />
        </div>
    );
}
import type { ReactNode } from "react";
import './RoundedWrapper.scss';

interface RoundedWrapperProps {
  children?: ReactNode;
  className?: string;
}

export default function RoundedWrapper({ children, className = "" } : RoundedWrapperProps) {
    return (
        <div className={`rounded-wrapper ${className}`}>{children}</div>
    );
}
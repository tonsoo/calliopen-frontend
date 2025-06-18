import type { ReactNode } from "react";
import type DefaultProps from "../../../../traits/DefaultProps";
import Sidebar from "../../../partials/sidebar/Sidebar";
import './SidebarWrapper.scss';

interface SidebarWrapperProps extends DefaultProps {
    children: ReactNode;
}

export default function SidebarWrapper({
    children, className = ""
} : SidebarWrapperProps) {
    return (
        <div className={"app-sidebar-wrapper " + className}>
            <Sidebar />
            <div className="flex-grow">
                {children}
            </div>
        </div>
    );
}
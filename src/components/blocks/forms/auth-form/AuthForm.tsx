import type { ReactNode } from "react";
import type DefaultProps from "../../../../traits/DefaultProps";
import './AuthForm.scss';

interface AuthFormProps extends DefaultProps {
    title: string;
    description: string;
    children: ReactNode;
    onSubmit?: (data: any) => void;
}

export default function AuthForm({
    className = "", description, title, children, onSubmit
} : AuthFormProps) {
    return (
        <form className={"app-auth-form " + className} onSubmit={onSubmit}>
            <p className="title">{title}</p>
            <p className="short-description">{description}</p>
            {children}
        </form>
    );
}
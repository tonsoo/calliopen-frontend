import { useNavigate } from "react-router-dom";
import type DefaultProps from "../../../../traits/DefaultProps";
import Button from "../../../generics/buttons/button/Button";
import TextButton from "../../../generics/buttons/text-button/TextButton";
import SpacedBetween from "../../../generics/wrappers/spaced-between/SpacedBetween";
import ExistingAccountsList from "../../existing-accounts-list/ExistingAccountsList";
import AuthForm from "../auth-form/AuthForm";
import { routesList } from "../../../../AppRoutes";

interface LoginWithAccountFormProps extends DefaultProps {

}

export default function LoginWithAccountForm({
    className = ""
} : LoginWithAccountFormProps) {
    const navigate = useNavigate();
    const handleRegisterClick = () => navigate(routesList.register);
    const handleLoginClick = () => navigate(routesList.login);

    return (
        <AuthForm className={"app-login-with-account-form " + className} title="Login" description="Please select your account">
            <ExistingAccountsList className="mb-8" />
            <SpacedBetween className="mb-7 border-b border-solid border-gray pb-6">
                <p className="wrapped-text">Login to a different account</p>
                <Button type="button" onClick={handleLoginClick} className="bg-blue-600">
                    <p className="font-quicksand font-bold text-white-pure">Login</p>
                </Button>
            </SpacedBetween>
            <SpacedBetween>
                <p className="wrapped-text">Don't have an account?</p>
                <TextButton text="Sign up" onClick={handleRegisterClick} className="font-bold text-blue-600" />
            </SpacedBetween>
        </AuthForm>
    );
}
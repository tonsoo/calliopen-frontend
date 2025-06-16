import type DefaultProps from "../../../../traits/DefaultProps";
import Button from "../../../generics/buttons/button/Button";
import TextButton from "../../../generics/buttons/text-button/TextButton";
import SpacedBetween from "../../../generics/wrappers/spaced-between/SpacedBetween";
import ExistingAccountsList from "../../existing-accounts-list/ExistingAccountsList";
import './LoginForm.scss';

interface LoginFormProps extends DefaultProps {

}

export default function LoginForm({
    className = ""
} : LoginFormProps) {
    return (
        <div className={"app-login-form " + className}>
            <p className="title">Login</p>
            <p className="short-description">Please select your account</p>
            <ExistingAccountsList className="mb-8" />
            <SpacedBetween className="mb-7 border-b border-solid border-gray pb-6">
                <p className="wrapped-text">Login to a different account</p>
                <Button className="bg-blue-600">
                    <p className="font-quicksand font-bold text-white-pure">Login</p>
                </Button>
            </SpacedBetween>
            <SpacedBetween>
                <p className="wrapped-text">Don't have an account?</p>
                <TextButton text="Sign up" onClick={() => {}} className="font-bold text-blue-600" />
            </SpacedBetween>
        </div>
    );
}
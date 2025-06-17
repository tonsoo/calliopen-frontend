import { useNavigate } from "react-router-dom";
import type DefaultProps from "../../../../traits/DefaultProps";
import Button from "../../../generics/buttons/button/Button";
import TextButton from "../../../generics/buttons/text-button/TextButton";
import SpacedBetween from "../../../generics/wrappers/spaced-between/SpacedBetween";
import AuthForm from "../auth-form/AuthForm";
import { routesList } from "../../../../AppRoutes";
import { useForm } from "react-hook-form";
import PasswordInput from "../../../generics/inputs/input/password-input/PasswordInput";
import Input from "../../../generics/inputs/input/Input";
import UserSvg from "../../../../assets/icons/generics/user.svg";
import PasswordSvg from "../../../../assets/icons/generics/padlock.svg";
import login from "../../../../http/auth";
import { ApiError } from "../../../../api";
import { hasMultipleAccounts } from "../../../../http/token";

interface LoginFormProps extends DefaultProps {

}

export default function LoginForm({
    className = ""
} : LoginFormProps) {
    const navigate = useNavigate();
    const handleRegisterClick = () => navigate("/auth/register");
    const handleLoginSelectClick = () => navigate(routesList.loginToAccount);

    const {
        register,
        trigger,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const loginBlur = () => trigger("login");
    const passwordBlur = () => trigger("password");

    const onSubmit = async (data: any) => {
        try {
            console.log(data);
            await login({
                login: data.login,
                password: data.password,
            });
            
            navigate(routesList.dashboard);
        } catch (e) {
            console.log("Registration failed", e);
            if (e instanceof ApiError) {
                console.log(e.status, e.body, e.message);
            }
        }
    };

    return (
        <AuthForm onSubmit={handleSubmit(onSubmit)} className={"app-login-with-account-form " + className} title="Login" description="Please login using your credentials">
            <div className="flex flex-col gap-3 mb-6">
                <Input title="Login"
                    error={errors.login && `${errors.login.message}`}
                    icon={UserSvg}
                    {...register("login", { required: "Please inform your email or username" })}
                    onBlur={loginBlur} />

                <PasswordInput title="Password"
                    error={errors.password && `${errors.password.message}`}
                    icon={PasswordSvg}
                    {...register("password", {
                        required: "Ensure your account safety",
                        minLength: {
                            value: 6,
                            message: "Your password must be at least 6 characters long"
                        }
                    })}
                    onBlur={passwordBlur} />
            </div>

            <Button className="bg-blue-600 ml-auto mb-12">
                <p className="font-quicksand font-bold text-white-pure">Login</p>
            </Button>

            {hasMultipleAccounts() && <SpacedBetween className="mb-7 border-b border-solid border-gray pb-6">
                <p className="wrapped-text">Login to a saved account</p>
                <TextButton text="Login" onClick={handleLoginSelectClick} className="font-bold text-blue-600" />
            </SpacedBetween>}
            <SpacedBetween>
                <p className="wrapped-text">Don't have an account?</p>
                <TextButton text="Sign up" onClick={handleRegisterClick} className="font-bold text-blue-600" />
            </SpacedBetween>
        </AuthForm>
    );
}
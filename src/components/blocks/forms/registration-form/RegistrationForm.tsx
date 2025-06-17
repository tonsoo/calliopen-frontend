import { useNavigate } from "react-router-dom";
import TextButton from "../../../generics/buttons/text-button/TextButton";
import SpacedBetween from "../../../generics/wrappers/spaced-between/SpacedBetween";
import AuthForm from "../auth-form/AuthForm";
import { routesList } from "../../../../AppRoutes";
import Input from "../../../generics/inputs/input/Input";
import UserSvg from "../../../../assets/icons/generics/user.svg";
import EmailSvg from "../../../../assets/icons/generics/email.svg";
import PasswordSvg from "../../../../assets/icons/generics/padlock.svg";
import UserSearchSvg from "../../../../assets/icons/generics/user-search.svg";
import PasswordInput from "../../../generics/inputs/input/password-input/PasswordInput";
import Button from "../../../generics/buttons/button/Button";
import { useForm } from "react-hook-form";
import { ApiError } from "../../../../api";
import { registerUser } from "../../../../http/auth";

export default function RegistrationForm() {
    const navigate = useNavigate();
    
    const handleLoginClick = () => navigate(routesList.login);
    const {
        register,
        trigger,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const nameBlur = () => trigger("name");
    const usernameBlur = () => trigger("username");
    const emailBlur = () => trigger("email");
    const passwordBlur = () => trigger("password");

    const onSubmit = async (data: any) => {
        try {
            await registerUser({
                name: data.name,
                email: data.email,
                password: data.password,
                username: data.username,
            });
            
            navigate(routesList.dashboard);
        } catch (e) {
            if (e instanceof ApiError) {
                console.error("Failed to register", e.status, e.body, e.message);
            }
        }
    };
    
    return (
        <AuthForm onSubmit={handleSubmit(onSubmit)} title="Sign Up" description="Please fill your information below">
            <div className="flex flex-col items-stretch justify-start gap-5 mb-10">
                <div className="grid grid-cols-2 gap-5">
                    <Input title="Name"
                        error={errors.name && `${errors.name.message}`}
                        icon={UserSvg}
                        {...register("name", { required: "Please inform your name" })}
                        onBlur={nameBlur} />

                    <Input title="Username"
                        error={errors.username && `${errors.username.message}`}
                        icon={UserSearchSvg}
                        {...register("username", { required: "Choose a username" })}
                        onBlur={usernameBlur} />
                </div>

                <Input title="Email"
                    error={errors.email && `${errors.email.message}`}
                    icon={EmailSvg}
                    {...register("email", { required: "We need your email to contact you" })}
                    onBlur={emailBlur} />

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

            <Button className="bg-blue-600 ml-auto mb-14">
                <p className="font-quicksand font-bold text-white-pure">Next</p>
            </Button>

            <SpacedBetween className="mb-9 border-b border-solid border-gray pb-6">
                <p className="wrapped-text">Already have an account?</p>
                <TextButton onClick={handleLoginClick} text="Login" className="font-bold text-blue-600" />
            </SpacedBetween>
        </AuthForm>
    );
}
import './Login.scss';
import LogoSvg from '../../../assets/identity/logo.svg';
import { ReactSVG } from "react-svg";
import GithubProject from "../../../components/generics/buttons/github-project/GithubProject";
import LoginForm from "../../../components/blocks/forms/login-form/LoginForm";
import type { ReactNode } from 'react';
import { routesList } from '../../../AppRoutes';
import RegistrationForm from '../../../components/blocks/forms/registration-form/RegistrationForm';

export default function Login() {
    let form : ReactNode = <LoginForm />;
    if (location.pathname === routesList.register) {
        form = <RegistrationForm />
    }
    
    return (
        <div className="page-login">
            <div className="bigger-side">
                <ReactSVG src={LogoSvg} className="logo icon has-icon aspect-square" />
                <p className="title">CalliOpen</p>
                <p className="text">Free open-source <br />music player</p>
                <div className="grow flex flex-col justify-end">
                    <GithubProject />
                </div>
            </div>
            <div className="smaller-side">
                {form}
            </div>
        </div>
    );
}
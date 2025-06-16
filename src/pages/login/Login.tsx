import ExistingAccountsList from "../../components/blocks/existing-accounts-list/ExistingAccountsList"
import './Login.scss';
import LogoSvg from '../../assets/identity/logo.svg';
import { ReactSVG } from "react-svg";
import GithubProject from "../../components/generics/buttons/github-project/GithubProject";
import LoginForm from "../../components/blocks/forms/login-form/LoginForm";

export default function Login() {
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
            <LoginForm className="smaller-side" />
        </div>
    );
}
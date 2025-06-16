import { useNavigate } from 'react-router-dom';
import { setToken } from '../../../../http/token';
import type DefaultProps from '../../../../traits/DefaultProps';
import TextButton from '../../../generics/buttons/text-button/TextButton';
import './ExistingAccount.scss';

interface ExistingAccountProps extends DefaultProps {
    token: string
}

export default function ExistingAccount({
    className = "", token
} : ExistingAccountProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        setToken(token);
        navigate('/');
    };

    return (
        <div className={"app-existing-account hoverable has-transitions " + className}>
            <button className="button-child" onClick={handleClick}>
                <img className="avatar" src="" alt="" />
                <p className="welcome">Welcome back, <b>Hamid</b></p>
            </button>
            <TextButton text="Remove" onClick={() => {}} className="text-red-700 font-bold" />
        </div>
    );
}
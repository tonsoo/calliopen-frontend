import { useNavigate } from 'react-router-dom';
import { removeToken, setToken } from '../../../../http/token';
import type DefaultProps from '../../../../traits/DefaultProps';
import TextButton from '../../../generics/buttons/text-button/TextButton';
import './ExistingAccount.scss';
import type { Client } from '../../../../api';

interface ExistingAccountProps extends DefaultProps {
    token: string;
    client: Client;
}

export default function ExistingAccount({
    className = "", token, client
} : ExistingAccountProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        setToken(token, client);
        navigate('/');
    };

    const handleRemoveToken = () => removeToken(token);

    return (
        <div className={"app-existing-account hoverable has-transitions " + className}>
            <button type="button" className="button-child" onClick={handleClick}>
                <img className="avatar" src={client.avatar!} alt={"Avatar for " + client.name} />
                <p className="welcome">Welcome back, <b>{client.name}</b></p>
            </button>
            <TextButton text="Remove" onClick={handleRemoveToken} className="text-red-700 font-bold" />
        </div>
    );
}
import type DefaultProps from '../../../../traits/DefaultProps';
import TextButton from '../../../generics/buttons/text-button/TextButton';
import './ExistingAccount.scss';

interface ExistingAccountProps extends DefaultProps {

}

export default function ExistingAccount({
    className = ""
} : ExistingAccountProps) {
    return (
        <div className={"app-existing-account hoverable has-transitions " + className}>
            <img className="avatar" src="" alt="" />
            <p className="welcome">Welcome back, <b>Hamid</b></p>
            <TextButton text="Remove" onClick={() => {}} className="text-red-700 font-bold" />
        </div>
    );
}
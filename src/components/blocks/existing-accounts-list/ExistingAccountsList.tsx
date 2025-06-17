import { getAllTokens } from "../../../http/token";
import type DefaultProps from "../../../traits/DefaultProps";
import ExistingAccount from "./existing-account/ExistingAccount";
import './ExistingAccountsList.scss';

interface ExistingAccountsListProps extends DefaultProps {

}

export default function ExistingAccountsList({
    className = ""
} : ExistingAccountsListProps) {
    const tokens = getAllTokens();
    return (
        <div className={"app-existing-accounts-list " + className}>
            {Object.entries(tokens).map(
                ([token, user]) => <ExistingAccount client={user} key={token} token={token} />)}
        </div>
    );
}
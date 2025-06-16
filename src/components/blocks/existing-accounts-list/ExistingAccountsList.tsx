import type DefaultProps from "../../../traits/DefaultProps";
import ExistingAccount from "./existing-account/ExistingAccount";
import './ExistingAccountsList.scss';

interface ExistingAccountsListProps extends DefaultProps {

}

export default function ExistingAccountsList({
    className = ""
} : ExistingAccountsListProps) {
    return (
        <div className={"app-existing-accounts-list " + className}>
            <ExistingAccount token="5|oKgQXso7fpeNHi3nmb2rZCgrIjWas1zm3zAnygpDb771f154" />
        </div>
    );
}
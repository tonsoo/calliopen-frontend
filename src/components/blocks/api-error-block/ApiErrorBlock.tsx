import type { ApiError } from "../../../api";
import type DefaultProps from "../../../traits/DefaultProps";
import ErrorText from "../../partials/error-text/ErrorText";

interface ApiErrorBlockProps extends DefaultProps {
    map?: Map<number, string>;
    error: ApiError;
}

export default function ApiErrorBlock({
    map, className = "", error
} : ApiErrorBlockProps) {
    return (
        <div className={"app-api-error-block " + className}>
            <ErrorText text={map?.get(error.status) ?? "There was an error contacting the api."} />
        </div>
    );
}
import { UserService } from "../api"

interface GetUserProps {
    userUuid?: string
}

export default async function getUser({ userUuid } : GetUserProps) {
    console.log("fetching user:", userUuid);
    const user = !userUuid
        ? await UserService.getUserInformation()
        : await UserService.getOtherUserInformation(userUuid);
    console.log(user);
    return user;
}
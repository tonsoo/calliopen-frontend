import { UserService } from "../api"

interface GetUserProps {
    userUuid?: string
}

export default async function getUser({ userUuid } : GetUserProps) {
    const user = !userUuid
        ? await UserService.getUserInformation()
        : await UserService.getOtherUserInformation(userUuid);
    console.log(user);
    return user;
}
import { AuthenticationService, type Client } from "../api";
import applyToken, { getAllTokens, setToken } from "./token";
import getUser from "./user";

interface LoginParams {
    login: string;
    password: string;
}

export default async function login({
    login, password,
} : LoginParams) {
    let savedToken : string | null = null;
    let savedUser : Client | null = null;
    const tokens = getAllTokens();
    for (const [token, user] of Object.entries(tokens)) {
        if (user.email == login || user.username == login) {
            savedToken = token;
            savedUser = user;
        }
    }

    const { token } = !savedToken
        ? await AuthenticationService.authLogin({
                login: login,
                password: password,
            })
        : { token: savedToken };

    if(!token) return;

    console.log("applying", token);
    applyToken(token);
    const user = !savedUser
        ? await getUser({})
        : savedUser;
    setToken(token, user);
}

interface RegisterParams {
    name: string;
    email: string;
    password: string;
    username: string;
}

export async function registerUser({
    email, name, password, username
} : RegisterParams) {
    await AuthenticationService.authRegister({
        name: name,
        email: email,
        password: password,
        username: username
    });
    await login({ login: email, password });
}
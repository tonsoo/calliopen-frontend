import { OpenAPI, type Client } from "../api";

type TokenMap = Record<string, Client>;

const tokenKey = 'app-auth-token';
const allTokensKey = 'app-auth-all-tokens';

export function getUser() : Client | null {
    const currentToken = getToken();
    const tokens = getAllTokens();
    if (!currentToken || !tokens) return null;

    return tokens[currentToken] ?? null;
}

export function getAllTokens() : TokenMap {
    const data = localStorage.getItem(allTokensKey);
    const json: unknown = data ? JSON.parse(data) : {};
    if (typeof json !== 'object' || json === null) {
        return {};
    }
    
    return Object.fromEntries(
        Object.entries(json).filter(([_, v]) =>
            typeof v === 'object' && v !== null && Object.keys(v).length > 0
        )
    );
}

export function setAllTokens(tokens : any) : void {
    localStorage.setItem(allTokensKey, JSON.stringify(tokens));
}

export function hasMultipleAccounts() : boolean {
    return Object.entries(getAllTokens()).length > 0;
}

export function getToken() : string | null {
    return localStorage.getItem(tokenKey);
}

export function removeToken(token?: string | null) : void {
    localStorage.removeItem(tokenKey);

    if (token) {
        const tokens = getAllTokens();
        delete tokens[token];
        setAllTokens(tokens);
    }

    applyToken(token);
}

export function setToken(token:string, client: Client) : void {
    localStorage.setItem(tokenKey, token);

    const tokens = getAllTokens();
    if (!tokens[token]) {
        tokens[token] = client;
        setAllTokens(tokens);
    }
    
    applyToken(token);
}

export default function applyToken(token?:string | null) : void {
    if (token) {
        OpenAPI.HEADERS = {
            Authorization: `Bearer ${token}`,
        };
    } else {
        OpenAPI.HEADERS = {};
    }
}
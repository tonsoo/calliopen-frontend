import { OpenAPI } from "../api";

const tokenKey = 'app-auth-token';

export function getToken() {
    return localStorage.getItem(tokenKey);
}

export function removeToken() {
    localStorage.removeItem(tokenKey);
}

export function setToken(token:string) {
    localStorage.setItem(tokenKey, token);
}

export default function applyToken() {
    const token = getToken();
    if (token) {
        OpenAPI.HEADERS = {
            Authorization: `Bearer ${token}`,
        };
    }
}
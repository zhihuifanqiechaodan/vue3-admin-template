import Cookies from "js-cookie";

const TokenKey = "Fanqie-Token";

export const getCookies = (key) => Cookies.get(key);

export const setCookies = (key, value) => Cookies.set(key, value);

export const removeCookies = (key) => Cookies.remove(key);

export const getToken = () => getCookies(TokenKey);

export const setToken = (token) => setCookies(TokenKey, token);

export const removeToken = () => removeCookies(TokenKey);

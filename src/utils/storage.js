import Cookies from 'js-cookie'

const TokenKey = 'Fanqie-Token'

export const getCookies = (key, defaultValue) =>
  Cookies.get(key) ? JSON.parse(Cookies.get(key)) : defaultValue

export const setCookies = (key, value) =>
  Cookies.set(key, JSON.stringify(value))

export const removeCookies = (key) => Cookies.remove(key)

export const getToken = () => getCookies(TokenKey)

export const setToken = (token) => setCookies(TokenKey, token)

export const removeToken = () => removeCookies(TokenKey)

import Cookies from 'js-cookie'

export const getCookies = (key) => Cookies.get(key)

export const setCookies = (key, value) => Cookies.set(key, value)

export const removeCookies = (key) => Cookies.remove(key)
import Cookies from 'js-cookie'

export const getToken = (key) => Cookies.get(key)

export const setToken = (key, value) => Cookies.set(Tkey, value)

export const removeToken = (key) => Cookies.remove(key)
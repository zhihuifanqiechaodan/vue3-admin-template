import jsCookie from 'js-cookie'

const localStorage = window.localStorage

const sessionStorage = window.sessionStorage

export const setLocalStorageItem = (key, value) =>
  localStorage.setItem(key, value)

export const getLocalStorageItem = (key) => localStorage.getItem(key)

export const removeLocalStorageItem = (key) => localStorage.removeItem(key)

export const clearLocalStorageItem = () => localStorage.clear()

export const setSessionStorage = (key, value) =>
  sessionStorage.setItem(key, value)

export const getSessionStorage = (key) => sessionStorage.getItem(key)

export const removeSessionStorage = (key) => sessionStorage.removeItem(key)

export const clearSessionStorage = () => sessionStorage.clear()

export const setCookieItem = (key, value) => jsCookie.set(key, value)

export const getCookieItem = (key, value) => jsCookie.get(key, value)

export const removeCookieItem = (key) => jsCookie.remove(key)

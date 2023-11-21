import jsCookie from 'js-cookie'

const localStorage = window.localStorage

const sessionStorage = window.sessionStorage

/**
 * @method setLocalStorageItem
 * @param {string} key
 * @param {*} value
 * @returns
 */
export const setLocalStorageItem = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value))

/**
 * @method getLocalStorageItem
 * @param {string} key
 * @param {*} defaultValue
 * @returns
 */
export const getLocalStorageItem = (key, defaultValue = null) => {
  const value = localStorage.getItem(key)

  return value ? JSON.parse(value) : defaultValue
}

/**
 * @method removeLocalStorageItem
 * @param {string} key
 * @returns
 */
export const removeLocalStorageItem = (key) => localStorage.removeItem(key)

/**
 * @method clearLocalStorageItem
 * @returns
 */
export const clearLocalStorageItem = () => localStorage.clear()

/**
 * @method setSessionStorage
 * @param {string} key
 * @param {*} value
 * @returns
 */
export const setSessionStorage = (key, value) =>
  sessionStorage.setItem(key, JSON.stringify(value))

/**
 * @method getSessionStorage
 * @param {string} key
 * @param {*} defaultValue
 * @returns
 */
export const getSessionStorage = (key, defaultValue = null) => {
  const value = sessionStorage.getItem(key)

  return value ? JSON.parse(value) : defaultValue
}

/**
 * @method removeSessionStorage
 * @param {string} key
 * @returns
 */
export const removeSessionStorage = (key) => sessionStorage.removeItem(key)

/**
 * @method clearSessionStorage
 * @returns
 */
export const clearSessionStorage = () => sessionStorage.clear()

/**
 * @method clearSessionStorage
 * @param {string} key
 * @param {*} value
 * @returns
 */
export const setCookieItem = (key, value) =>
  jsCookie.set(key, JSON.stringify(value))

/**
 * @method getCookieItem
 * @param {string} key
 * @param {*} defaultValue
 * @returns
 */
export const getCookieItem = (key, defaultValue = null) => {
  const value = jsCookie.get(key)

  return value ? JSON.parse(value) : defaultValue
}

/**
 * @method removeCookieItem
 * @param {string} key
 * @returns
 */
export const removeCookieItem = (key) => jsCookie.remove(key)

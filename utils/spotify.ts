export const getHashParams = () => {
  console.log(typeof window === undefined)
  if (typeof window !== undefined) return
  const hashParams = {}
  let e
  const r = /([^&;=]+)=?([^&;]*)/g
  const q = window.location.hash.substring(1)
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2])
  }
  return hashParams
}

const EXPIRATION_TIME = 3600 * 1000 // 3600 seconds * 1000 = 1 hour in milliseconds

const setTokenTimestamp = () =>
  isBrowser &&
  window.localStorage.setItem('spotify_token_timestamp', Date.now().toString())

const setLocalAccessToken = (token: string) => {
  setTokenTimestamp()
  isBrowser && window.localStorage.setItem('spotify_access_token', token)
}
const setLocalRefreshToken = (token: string) =>
  isBrowser && window.localStorage.setItem('spotify_refresh_token', token)

const getTokenTimestamp = () =>
  isBrowser && window.localStorage.getItem('spotify_token_timestamp')

const getLocalAccessToken = () =>
  isBrowser && window.localStorage.getItem('spotify_access_token')

const getLocalRefreshToken = () =>
  isBrowser && window.localStorage.getItem('spotify_refresh_token')

// Refresh the token
const refreshAccessToken = async () => {
  try {
    const { data } = await fetch(
      `/refresh_token?refresh_token=${getLocalRefreshToken()}`
    ).then((res) => res.json())
    const { access_token } = data
    setLocalAccessToken(access_token)
    isBrowser && window.location.reload()
    return
  } catch (e) {
    console.error(e)
  }
}

// Get access token off of query params (called on application init)
export const getAccessToken = () => {
  const { error, access_token, refresh_token } = getHashParams()

  if (error) {
    console.error(error)
    refreshAccessToken()
  }

  // If token has expired
  if (Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
    console.warn('Access token has expired, refreshing...')
    refreshAccessToken()
  }

  const localAccessToken = getLocalAccessToken()

  // If there is no ACCESS token in local storage, set it and return `access_token` from params
  if ((!localAccessToken || localAccessToken === 'undefined') && access_token) {
    setLocalAccessToken(access_token)
    setLocalRefreshToken(refresh_token)
    return access_token
  }

  return localAccessToken
}

export const token = getAccessToken()

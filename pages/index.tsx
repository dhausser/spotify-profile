import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const router = useRouter()
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)

  const { asPath } = router
  const hashParams = new URLSearchParams(asPath)
  const accessTokenParam = hashParams.get('/#access_token')
  const refreshTokenParam = hashParams.get('refresh_token')

  useEffect(() => {
    if (accessTokenParam && refreshTokenParam) {
      setAccessToken(accessTokenParam)
      setRefreshToken(refreshTokenParam)
    }
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Spotify Profile</title>
        <meta name="description" content="Spotify Profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Spotify Profile</h1>
        <br />
        {accessToken ? (
          <div>
            <p>Access token: {accessToken}</p>
            <p>Refresh token: {refreshToken}</p>
          </div>
        ) : (
          <a href="/api/login">Login</a>
        )}
      </main>
    </div>
  )
}

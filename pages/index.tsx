import Head from 'next/head'
import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { token } from '../utils/spotify'

export default function Home() {
  const [accessToken, setAccessToken] = useState('')

  useEffect(() => {
    setAccessToken(token)
  }, [])

  if (accessToken) return <p>Access token: {accessToken}</p>

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
        <a href="/api/login">Login</a>
      </main>
    </div>
  )
}

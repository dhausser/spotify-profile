import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const router = useRouter()
  const [accessToken, setAccessToken] = useState('')

  const { asPath } = router
  const { hash } = window.location

  const params = new URLSearchParams(hash)
  // const token = params[0]

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

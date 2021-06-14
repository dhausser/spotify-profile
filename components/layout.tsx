import Head from 'next/head'
import { ReactNode } from 'react'
import styles from '../styles/Home.module.css'

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Spotify Profile</title>
        <meta name="description" content="Spotify Profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Spotify Profile</h1>
        {children}
      </main>
    </div>
  )
}

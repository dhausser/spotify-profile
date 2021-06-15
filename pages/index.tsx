import { useRouter } from 'next/router'
import { useState, useEffect, useCallback } from 'react'
import useSWR from 'swr'
import Login from '../components/login'
import Profile from '../components/profile'

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
      localStorage.setItem('accessToken', accessTokenParam)
      router.push('/')
    }
  }, [accessTokenParam, refreshTokenParam, router])

  return accessToken ? <Profile accessToken={accessToken} /> : <Login />
}

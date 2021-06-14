import { useCallback } from 'react'
import useSWR from 'swr'

export default function useUser(accessToken: string) {
  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
  const fetcher = useCallback(
    (args: string) => fetch(args, options).then((res) => res.json()),
    [accessToken]
  )

  const { data, error } = useSWR('https://api.spotify.com/v1/me', fetcher)

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  }
}

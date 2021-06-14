import useUser from '../data/use-user'

interface Props {
  accessToken: string
}

export default function Profile({ accessToken }: Props) {
  const { user, isLoading, isError } = useUser(accessToken)

  if (isLoading) return <p>loading...</p>
  if (isError) return <p>failed to load</p>

  console.log(user)

  return (
    <section>
      <h2>Welcome</h2>
      <p>Display name: {user.display_name}</p>
      <p>Email: {user.email}</p>
      <p>Country: {user.country}</p>
    </section>
  )
}

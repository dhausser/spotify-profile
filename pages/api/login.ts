// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import querystring from 'querystring'
import { setCookie } from '../../utils/cookies'
import { generateRandomString } from '../../utils/helpers'

const stateKey = 'spotify_auth_state'
const client_id = process.env.CLIENT_ID
const redirect_uri = process.env.REDIRECT_URI

export default (req: NextApiRequest, res: NextApiResponse) => {
  const state = generateRandomString(16)
  setCookie(res, stateKey, state)

  const scope = 'user-read-private user-read-email'

  res.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: 'code',
      client_id,
      scope,
      redirect_uri: 'http://localhost:3000/api/callback',
      state,
    })}`
  )
}

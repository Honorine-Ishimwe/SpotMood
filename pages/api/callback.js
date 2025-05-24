//This file for callback to Spotify API to get access tokens.
import axios from 'axios';

export default async function handler(req, res) {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('Missing code parameter');
  }

  try {
    const tokenResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'https://spotmood.vercel.app/api/callback',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token, refresh_token } = tokenResponse.data;

    // Redirect to homepage or dashboard with token
    return res.redirect(`/home?access_token=${access_token}`);
  } catch (error) {
    console.error('Token exchange failed:', error.response?.data || error.message);
    return res.status(500).send('Failed to exchange code for token');
  }
}
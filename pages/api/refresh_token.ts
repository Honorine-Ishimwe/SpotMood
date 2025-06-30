/*
refresh spotify access token without need to re-authenticate
ref: https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens
ref:
 */

import type { NextApiRequest, NextApiResponse } from 'next';

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const refresh_token = req.query.refresh_token as string;

    if (!refresh_token) {
        return res.status(400).json({ error: 'Missing refresh_token' });
    }

    const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

    const body = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token
    });

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${basic}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body
        });

        if (!response.ok) {
            const errorText = await response.text();
            return res.status(response.status).json({ error: errorText });
        }

        const data = await response.json();

        const access_token = data.access_token;
        const new_refresh_token = data.refresh_token || refresh_token;

        return res.status(200).json({
            access_token,
            refresh_token: new_refresh_token
        });
    } catch (err) {
        console.error('Error refreshing token:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
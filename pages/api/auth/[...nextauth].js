import NextAuth from "next-auth/next";
import SpotifyProvider from 'next-auth/providers/spotify';

// see https://next-auth.js.org/configuration/callbacks#sign-in-callback

const options = {
    pages: {
        signIn: '/', // Custom sign-in page
        error: '/auth/error', // Error page
        verifyRequest: '/auth/verify-request', // Verification request page
        newUser: null, // Will disable the new account creation screen
    },

    providers: [
        SpotifyProvider({
            authorization: 'https://accounts.spotify.com/authorize?scope=user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played user-top-read user-read-playback-position user-library-modify user-library-read playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private ugc-image-upload app-remote-control streaming user-follow-modify user-follow-read',
            clientId: process.env.SPOTIFY_CLIENT_ID || '',
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
            profile(profile) {
                return {
                    id: profile.id,
                    name: profile.display_name,
                    email: profile.email,
                    image: profile.images?.[0]?.url || null,
                };
            },

        }),
    ],
    callbacks: {
        async jwt({token, account}) {
            if (account) {
                token.access_token = account.access_token;
            }
            token.access_token_expires = account?.expires_at ? account.expires_at * 1000 : Date.now() + 7 * 24 * 3600 * 1000; // token expires after 7 days.
            return token;
        },
        async session({session, token}) {
            return {
                ...session,
                token
            };
        },
        async signIn({account, profile}) {
            // Check if the user has granted the required scopes
            if (!account.scope || !account.scope.includes('user-read-private')) {
                console.error('Required scope not granted');
                return false; // Deny sign-in if required scopes are not granted
            }
            return true; // Allow sign-in if all checks pass
        }
    }
}

const handler = NextAuth(options);
export default handler;
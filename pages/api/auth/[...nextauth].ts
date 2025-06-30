import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export default NextAuth({
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID!,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
            authorization: {
                url: "https://accounts.spotify.com/authorize",
                params: {
                   // redirect_uri: process.env.NEXTAUTH_URL + "/api/auth/callback/spotify",
                    scope:
                        "user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played user-top-read user-read-playback-position user-library-modify user-library-read playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private ugc-image-upload app-remote-control streaming user-follow-modify user-follow-read",
                },
            },
            profile(profile) {
                return {
                    id: profile.id,
                    name: profile.display_name,
                    email: profile.email,
                    image: profile.images?.[0]?.url || null,
                };
            }
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    // secret: process.env.NEXTAUTH_SECRET, # If you set NEXTAUTH_SECRET as an environment variable, you don't have to define this option.
    callbacks: {
        async jwt({token, account}) {
            if (account) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    accessTokenExpires: account.expires_at ? account.expires_at * 1000 : undefined,
                    refreshToken: account.refresh_token,
                }
            }
            if (token.accessTokenExpires && Date.now() < (token.accessTokenExpires as number)) {
                return token;
            }

            // Access token has expired, try to refresh it
            try {
                const response = await fetch("https://accounts.spotify.com/api/token", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: "Basic " +
                            Buffer.from(
                                process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
                            ).toString("base64"),
                    },
                    body: new URLSearchParams({
                        grant_type: "refresh_token",
                        refresh_token: token.refreshToken as string,
                    }),
                });

                const tokens = await response.json();

                if (!response.ok) throw tokens;

                return {
                    ...token,
                    accessToken: tokens.access_token,
                    accessTokenExpires: Date.now() + tokens.expires_in * 1000,
                    // Keep the original refresh token if Spotify doesn't send a new one
                    refreshToken: tokens.refresh_token ?? token.refreshToken,
                };
            } catch (error) {
                console.error("Error refreshing access token", error);
                // The error property will be used in the session callback to handle the error
                return {...token, error: "RefreshAccessTokenError"};
            }
        },
        async session({session, token}: any) {
           session.token = {
             access_token: token.accessToken
            };
            return session;
        },
        async signIn({ account }) {
            if (!account?.scope || !account.scope.includes("user-read-private")) {
                console.error("Required scope not granted");
                return false;
            }
            return true;
        },
    },
    debug: process.env.NODE_ENV === 'development',
});
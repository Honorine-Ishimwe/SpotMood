import "@/styles/globals.css";
import "@/src/background.css"
import { useEffect } from "react";
import Script from "next/script";
import { SessionProvider } from "next-auth/react"

export default function App({
                                Component,
                                pageProps : { session, ...pageProps },
}) {
  useEffect(() => { // background.js dynamic import
    // Dynamically import background.js only on the client-side
    if (typeof window !== 'undefined') {
      import("@/src/background.js");
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
      <>
          <Script src="https://requirejs.org/docs/release/2.1.15/minified/require.js" strategy="afterInteractive"  />
          <Script src="https://rawgit.com/ironwallaby/delaunay/master/delaunay.js" strategy="afterInteractive"  />

          <canvas id="stars" width="100%" height="100%"></canvas>
          <Component {...pageProps} />
          {/*for below see https://next-auth.js.org/getting-started/client#sessionprovider*/}
          <SessionProvider session={session}>
              <Component {...pageProps} />
          </SessionProvider>
      </>
  )
}




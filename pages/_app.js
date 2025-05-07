import "@/styles/globals.css";
import "@/src/background.css"
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => { // background.js dynamic import
    // Dynamically import background.js only on the client-side
    if (typeof window !== 'undefined') {
      import("@/src/background.js");
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
      <>
          <Script src="https://requirejs.org/docs/release/2.1.15/minified/require.js" strategy="afterInteractive" async />
          <Script src="https://rawgit.com/ironwallaby/delaunay/master/delaunay.js" strategy="afterInteractive" async />

          <canvas id="stars" width="100%" height="100%"></canvas>
          <Component {...pageProps} />
      </>
  )
}

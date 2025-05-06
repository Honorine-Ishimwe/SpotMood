// components/SpotifyPlayer.js
import { useEffect, useRef } from 'react'
import Script from 'next/script'

export default function SpotifyPlayer({ uri, width = '100%', height = '380' }) {
    const iframeRef = useRef(null)
    useEffect(() => {
        if (!iframeRef.current) return

        // wait for the Spotify Embed API to be ready
        window.onSpotifyIframeApiReady = (SpotifyIframe) => {
            SpotifyIframe.createController(iframeRef.current, {
                uri,           // e.g. 'spotify:track:5nTtCOCds6I0PHMNtqelas'
                width,
                height,
                theme: 'black'
            }).then((controller) => {
                // you now have a `controller` you can call play(), pause(), seek(), etc.
                controller.play()
            }).catch(console.error)
        }
    }, [uri, width, height])

    return (
        <>
            <Script src="https://open.spotify.com/embed/iframe-api/v1" async></Script>

            {/* 2) this empty div is where the iframe will be injected */}
            <div ref={iframeRef}></div>
        </>
    )
}
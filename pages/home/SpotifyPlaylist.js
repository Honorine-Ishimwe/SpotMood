// components/SpotifyPlaylist.js
import { useEffect, useRef } from 'react'

export default function SpotifyPlaylist({ uri, playlist_id, width = '100%', height = '380' }) {
    const isTrack = String(playlist_id).startsWith('track:');
    const cleanId = isTrack ? String(playlist_id).replace('track:', '') : playlist_id;
    const embedType = isTrack ? 'track' : 'playlist';

    return (
        <div>
            <iframe
                className="border-0 rounded-[12px]"
                src={`https://open.spotify.com/embed/${embedType}/${cleanId}?utm_source=generator&theme=white&view=list`}
                width={width}
                height={height}
                frameBorder="0"
                allowTransparency="true"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
            ></iframe>
        </div>
    );
}
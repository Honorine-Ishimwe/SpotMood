import React, { useState, useRef } from 'react';

// Diverse search query pools for each mood to guarantee non-static dynamic results
const MOOD_SEARCH_QUERIES = {
  Happy: [
    "happy vibes", "feel good hits", "good mood", "sunshine playlist",
    "upbeat songs", "positive energy", "happy pop", "cheerful music",
    "walking on sunshine", "joy playlist", "serotonin boost", "happy indie",
    "bright day playlist", "smile playlist", "euphoria hits"
  ],
  Sad: [
    "sad songs", "melancholy", "rainy day", "heartbreak playlist",
    "feeling blue", "emotional songs", "sad indie", "in my feelings",
    "late night sad", "crying songs", "broken heart", "sad acoustic",
    "lonely night", "grief playlist", "somber vibes"
  ],
  "Need Motivation": [
    "motivation mix", "workout pump up", "hustle playlist", "beast mode",
    "gym motivation", "power songs", "grinding playlist", "never give up",
    "inspirational", "boss up", "confidence boost", "focus grind",
    "unstoppable", "champion mindset", "rise and grind"
  ],
  Relaxed: [
    "chill vibes", "lo-fi beats", "relaxing music", "calm acoustic",
    "peaceful songs", "ambient chill", "zen playlist", "spa music",
    "wind down", "meditation music", "soft instrumentals", "cozy evening",
    "nature sounds playlist", "tranquil", "smooth jazz chill"
  ],
  Party: [
    "party hits", "club bangers", "house party", "dance floor",
    "EDM party", "turn up", "friday night", "party anthems",
    "pregame playlist", "hype mix", "lit playlist", "bass drops",
    "rave energy", "summer party", "throwback party"
  ],
};

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function MiddleContent({ navChosen, setPlaylistId, token }) {
  // 1. Mood State
  const [selectedMood, setSelectedMood] = useState('');
  const [nowPlayingName, setNowPlayingName] = useState('');
  const shownPlaylistIds = useRef(new Set());

  // 2. Explore State
  const [exploreQuery, setExploreQuery] = useState('');
  const [explorePlaylists, setExplorePlaylists] = useState([]);
  const [exploreLoading, setExploreLoading] = useState(false);

  // 3. My Vibe State
  const [myVibeItems, setMyVibeItems] = useState([]);
  const [myVibeLoading, setMyVibeLoading] = useState(false);

  // 4. Create Your Vibe State
  const [vibeTitle, setVibeTitle] = useState('');
  const [vibeStyle, setVibeStyle] = useState('chill lofi');
  const [createMessage, setCreateMessage] = useState('');
  const [creating, setCreating] = useState(false);

  // -------------------------------------------------------------
  // Mood Handler (Dynamic Selection)
  // -------------------------------------------------------------
  const handleMoodChange = (event) => {
    setSelectedMood(event.target.value);
  };

  const handleMoodSubmit = async (event) => {
    event.preventDefault();
    if (!selectedMood || !token) return;

    const queries = MOOD_SEARCH_QUERIES[selectedMood] || [selectedMood];
    const searchTerm = pickRandom(queries);
    const randomOffset = Math.floor(Math.random() * 20);

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=playlist&limit=20&offset=${randomOffset}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (data?.playlists?.items?.length > 0) {
        let candidates = data.playlists.items.filter(
          (p) => p !== null && !shownPlaylistIds.current.has(p.id)
        );

        if (candidates.length === 0) {
          shownPlaylistIds.current.clear();
          candidates = data.playlists.items.filter((p) => p !== null);
        }

        if (candidates.length > 0) {
          const chosen = pickRandom(candidates);
          shownPlaylistIds.current.add(chosen.id);
          setPlaylistId(chosen.id);
          setNowPlayingName(chosen.name);
        }
      }
    } catch (error) {
      console.error("Error fetching mood playlist:", error);
    }
  };

  // -------------------------------------------------------------
  // Explore Handler
  // -------------------------------------------------------------
  const handleExploreSubmit = async (e) => {
    e.preventDefault();
    if (!exploreQuery.trim() || !token) return;

    setExploreLoading(true);
    try {
      const res = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(exploreQuery)}&type=playlist&limit=15`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setExplorePlaylists(data?.playlists?.items?.filter((p) => p !== null) || []);
    } catch (err) {
      console.error("Explore search error:", err);
    } finally {
      setExploreLoading(false);
    }
  };

  // -------------------------------------------------------------
  // My Vibe Handler
  // -------------------------------------------------------------
  const handleLoadUserPlaylists = async () => {
    if (!token) return;
    setMyVibeLoading(true);
    try {
      const res = await fetch("https://api.spotify.com/v1/me/playlists?limit=15", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setMyVibeItems(data?.items?.filter((p) => p !== null) || []);
    } catch (err) {
      console.error("Error loading user playlists:", err);
    } finally {
      setMyVibeLoading(false);
    }
  };

  const handleLoadUserTopTracks = async () => {
    if (!token) return;
    setMyVibeLoading(true);
    try {
      const res = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=15", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      const tracks = data?.items?.filter(Boolean) || [];
      // Map to consistent format
      setMyVibeItems(
        tracks.map((t) => ({
          id: `track:${t.id}`,
          name: `${t.name} - ${t.artists?.map((a) => a.name).join(', ')}`,
        }))
      );
    } catch (err) {
      console.error("Error loading top tracks:", err);
    } finally {
      setMyVibeLoading(false);
    }
  };

  // -------------------------------------------------------------
  // Create Your Vibe Handler
  // -------------------------------------------------------------
  const handleCreateVibe = async (e) => {
    e.preventDefault();
    if (!token) return;
    setCreating(true);
    setCreateMessage('');

    try {
      const query = `${vibeTitle} ${vibeStyle}`.trim() || vibeStyle;
      const res = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=playlist&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      const playlists = data?.playlists?.items?.filter(Boolean) || [];

      if (playlists.length > 0) {
        const chosen = pickRandom(playlists);
        setPlaylistId(chosen.id);
        setCreateMessage(`Now Playing: ${chosen.name}`);
      } else {
        setCreateMessage("No matching playlist found. Try different keywords.");
      }
    } catch (err) {
      console.error("Error creating vibe:", err);
      setCreateMessage("Failed to generate vibe. Please try again.");
    } finally {
      setCreating(false);
    }
  };

  const handleSaveVibeToSpotify = async () => {
    if (!token) return;
    setCreating(true);
    setCreateMessage('Saving to your Spotify account...');

    try {
      // 1. Get current user's profile ID
      const meRes = await fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const me = await meRes.json();

      // 2. Create playlist on user's account
      const playlistName = vibeTitle.trim() || `My ${vibeStyle} Vibe`;
      const createRes = await fetch(`https://api.spotify.com/v1/users/${me.id}/playlists`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: playlistName,
          description: "Curated with SpotMood",
          public: false,
        }),
      });

      if (!createRes.ok) throw new Error("Could not create playlist");
      const created = await createRes.json();

      // 3. Search and add sample tracks to it
      const searchRes = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(vibeStyle)}&type=track&limit=10`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const searchData = await searchRes.json();
      const trackUris = (searchData?.tracks?.items || []).map((t) => t.uri).filter(Boolean);

      if (trackUris.length > 0) {
        await fetch(`https://api.spotify.com/v1/playlists/${created.id}/tracks`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uris: trackUris }),
        });
      }

      setPlaylistId(created.id);
      setCreateMessage(`Saved "${created.name}" directly to your Spotify library!`);
    } catch (err) {
      console.error("Error saving playlist:", err);
      setCreateMessage("Failed to save playlist to Spotify.");
    } finally {
      setCreating(false);
    }
  };

  // -------------------------------------------------------------
  // Render based on navChosen
  // -------------------------------------------------------------
  switch (navChosen) {
    case "Mood":
      return (
        <div>
          <p className="text-xl font-bold mb-4">How are you feeling today?</p>
          <form className="space-y-4" onSubmit={handleMoodSubmit}>
            <fieldset className="flex flex-col space-y-2">
              <legend className="font-semibold">Choose a mood:</legend>

              {["Happy", "Sad", "Need Motivation", "Relaxed", "Party"].map((mood) => (
                <label key={mood} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="mood"
                    value={mood}
                    checked={selectedMood === mood}
                    onChange={handleMoodChange}
                  />
                  <span>{mood}</span>
                </label>
              ))}
            </fieldset>

            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              Submit
            </button>
          </form>
          {nowPlayingName && (
            <p className="text-sm text-green-300 mt-3 font-medium">
              Now Playing: {nowPlayingName}
            </p>
          )}
        </div>
      );

    case "Explore":
      return (
        <div className="space-y-4">
          <div>
            <p className="text-xl font-bold mb-1">Explore</p>
            <p className="text-sm text-gray-300">Discover new music and playlists</p>
          </div>

          <form onSubmit={handleExploreSubmit} className="flex space-x-2">
            <input
              type="text"
              value={exploreQuery}
              onChange={(e) => setExploreQuery(e.target.value)}
              placeholder="Search artist, genre, or keyword..."
              className="p-2 rounded text-black flex-1 text-sm bg-white"
            />
            <button
              type="submit"
              disabled={exploreLoading}
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 text-sm"
            >
              {exploreLoading ? "Searching..." : "Search"}
            </button>
          </form>

          {explorePlaylists.length > 0 && (
            <div className="flex flex-col space-y-2 mt-3 max-h-80 overflow-y-auto pr-1">
              {explorePlaylists.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between bg-green-950/40 p-2 rounded hover:bg-green-900/50"
                >
                  <span className="truncate text-sm font-medium pr-2">{p.name}</span>
                  <button
                    onClick={() => setPlaylistId(p.id)}
                    className="bg-green-600 text-xs text-white py-1 px-3 rounded hover:bg-green-700 flex-shrink-0"
                  >
                    Play
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      );

    case "My Vibe":
      return (
        <div className="space-y-4">
          <div>
            <p className="text-xl font-bold mb-1">My Vibe</p>
            <p className="text-sm text-gray-300">Your personalized playlist</p>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleLoadUserPlaylists}
              disabled={myVibeLoading}
              className="bg-green-600 text-white py-1.5 px-3 rounded-md hover:bg-green-700 text-sm"
            >
              My Playlists
            </button>
            <button
              onClick={handleLoadUserTopTracks}
              disabled={myVibeLoading}
              className="bg-green-600 text-white py-1.5 px-3 rounded-md hover:bg-green-700 text-sm"
            >
              My Top Tracks
            </button>
          </div>

          {myVibeLoading ? (
            <p className="text-sm text-gray-300 mt-2">Loading your music...</p>
          ) : (
            myVibeItems.length > 0 && (
              <div className="flex flex-col space-y-2 mt-3 max-h-80 overflow-y-auto pr-1">
                {myVibeItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-green-950/40 p-2 rounded hover:bg-green-900/50"
                  >
                    <span className="truncate text-sm font-medium pr-2">{item.name}</span>
                    <button
                      onClick={() => setPlaylistId(item.id)}
                      className="bg-green-600 text-xs text-white py-1 px-3 rounded hover:bg-green-700 flex-shrink-0"
                    >
                      Play
                    </button>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      );

    case "Create Your Vibe":
      return (
        <div className="space-y-4">
          <div>
            <p className="text-xl font-bold mb-1">Create Your Vibe</p>
            <p className="text-sm text-gray-300">Customize your playlist</p>
          </div>

          <form onSubmit={handleCreateVibe} className="space-y-3">
            <div>
              <label className="block text-sm mb-1 font-semibold">Vibe Name:</label>
              <input
                type="text"
                value={vibeTitle}
                onChange={(e) => setVibeTitle(e.target.value)}
                placeholder="e.g. Late Night Coding"
                className="p-2 rounded text-black w-full text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 font-semibold">Vibe Style / Genre:</label>
              <select
                value={vibeStyle}
                onChange={(e) => setVibeStyle(e.target.value)}
                className="p-2 rounded text-black w-full text-sm bg-white"
              >
                <option value="chill lofi">Chill / Lo-Fi</option>
                <option value="upbeat pop">Upbeat Pop</option>
                <option value="energetic edm">High Energy EDM</option>
                <option value="acoustic calm">Acoustic & Peaceful</option>
                <option value="deep focus instrumental">Deep Focus Instrumental</option>
                <option value="workout hip hop">Workout Hip Hop</option>
              </select>
            </div>

            <div className="flex space-x-2 pt-1">
              <button
                type="submit"
                disabled={creating}
                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 text-sm"
              >
                {creating ? "Generating..." : "Generate & Play"}
              </button>
              <button
                type="button"
                onClick={handleSaveVibeToSpotify}
                disabled={creating}
                className="bg-green-800 text-white py-2 px-4 rounded-md hover:bg-green-700 text-sm"
              >
                Save to Spotify
              </button>
            </div>

            {createMessage && (
              <p className="text-sm text-green-300 mt-2">{createMessage}</p>
            )}
          </form>
        </div>
      );

    default:
      return (
        <div className="text-center p-10 font-bold text-xl hover:text-2xl transition-all duration-300">
          <p>Welcome to the SpotMood!</p>
          <p>Select an option from the menu</p>
        </div>
      );
  }
}

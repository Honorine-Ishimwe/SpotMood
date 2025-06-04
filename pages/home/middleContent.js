import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

export default function MiddleContent({ navChosen, setPlaylistId, token }) {
    const [selectedMood, setSelectedMood] = useState('');

  const handleMoodChange = (event) => {
    setSelectedMood(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log(`Selected mood: ${selectedMood}`);
    console.log("SUBMIT CLICKED");

    
        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(selectedMood)}&type=playlist&limit=1`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
        const data = await response.json();
        

        if (data?.playlists?.items?.length > 0) {
            const playlistId = data.playlists.items[0].id;
            setPlaylistId(playlistId);
          } else {
            console.error("No playlist found for the selected mood.");
          }
    } catch (error) {
        console.error("Error fetching playlist:", error);
    }
}
  

    switch(navChosen){
        case "Mood": 
            return ( 
            <div>
               <p className="text-xl font-bold mb-4">How are you feeling today?</p>
                 <form className="space-y-4" onSubmit={handleSubmit}>
                   <fieldset className="flex flex-col space-y-2">
                      <legend className="font-semibold">Choose a mood:</legend>

                     {["Happy", "Sad", "Need Motivation", "Relaxed", "Party"].map((mood) => (
                      <label key={mood} className="flex items-center space-x-2">
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
            </div>
            );
        case "Explore":
            return (
                <div>
                    <p>Explore</p>
                    <p>Discover new music and playlists</p>
                </div>
            );
            
        case "My Vibe":
            return (
                <div>
                    <p>My Vibe</p>
                    <p>Your personalized playlist</p>
                </div>
            );
        case "Create Your Vibe":
            return (
                <div>
                    <p>Create Your Vibe</p>
                    <p>Customize your playlist</p>
                </div>
            );
        default:
            return (
                <div>
                    <p>Welcome to the app!</p>
                    <p>Select an option from the menu</p>
                </div>
            );
    }

   
} 

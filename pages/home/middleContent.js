import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

export default function MiddleContent({navChosen}) {
    const [selectedMood, setSelectedMood] = useState('');

  const handleMoodChange = (event) => {
    setSelectedMood(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Selected mood: ${selectedMood}`);
  };

    switch(navChosen){
        case "Mood": 
            return ( 
            <div>
                <p className="text-xl font-bold mb-4">How are you feeling today?</p>
                <form className="space-y-4">
                    <label for="mood">Mood</label>
                    <select>
                        <option>Happy</option>
                        <option>Sad</option>
                        <option>Need Motivation</option>
                        <option>Relaxed</option>
                        <option>Party</option>
                    </select>
                    <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">Submit</button>
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
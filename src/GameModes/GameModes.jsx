import React, { useState } from "react";
import axios from "axios";

export function GameModes() {
  const [gameModes, setGameModes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGameModes = () => {
    setLoading(true);
    setError(null);
    axios
      .get("https://valorant-api.com/v1/gamemodes")
      .then((response) => {
        if (response.data && response.data.data) {
          setGameModes(response.data.data);
        } else {
          throw new Error("Unexpected API response format");
        }
      })
      .catch(() => setError("Failed to fetch game modes 😞"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="container mx-auto mt-8 p-4 text-center">
      <h2 className="text-3xl font-bold text-gray-200 mb-6">Game Modes</h2>
      
      <button 
        onClick={fetchGameModes} 
        disabled={loading} 
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md disabled:opacity-50 mb-6"
      >
        {loading ? "Loading..." : "Fetch Game Modes"}
      </button>

      {error && <p className="text-red-500 font-bold">{error}</p>}

      <div className="flex flex-wrap justify-center gap-8">
        {gameModes.map((mode) => (
          <div
            key={mode.uuid}
            className="card h-100 shadow-lg border-0 bg-gray-900 rounded-xl overflow-hidden border-gray-700 text-white transform transition-transform hover:scale-105 hover:shadow-xl flex flex-col items-center p-6"
          >
            {/* Image Section */}
            <div className="bg-gray-800 p-4 flex justify-center w-full">
              <img
                src={mode.listViewIconTall || "https://via.placeholder.com/150"}
                alt={mode.displayName}
                className="w-32 h-32 object-cover rounded-full border-4 border-gray-700 shadow-md"
              />
            </div>
            
            {/* Description Section */}
            <div className="text-center mt-4 px-4">
              <h3 className="text-2xl font-bold text-yellow-400">{mode.displayName}</h3>
              <p className="mt-2 text-gray-300 text-sm leading-relaxed">{mode.description}</p>
              <p className="mt-2 text-blue-400 font-semibold">Duration: {mode.duration || "Unknown"}</p>
              <p className="mt-2 text-green-400">Timeouts Allowed: {mode.allowsMatchTimeouts ? "Yes" : "No"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

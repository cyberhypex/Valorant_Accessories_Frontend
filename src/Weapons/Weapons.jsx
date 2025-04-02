import React, { useState } from 'react'
import api from '../AxiosInstance';

export function Weapons() {
    const [weapons,setWeapons]=useState([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");

    const fetchWeapons=()=>{
        setLoading(true);
        setError("");

        api.get("/getWeapons")
        .then((response)=>{
            if(response.data && response.data.data){
                setWeapons(response.data.data);
            }
            else{
                console.error("Error fetching data",error);
          setError("Unexpected response format 😢");
                
            }
        })
        .catch((error)=>{
            console.error("Error fetching",error);
            setError("Failed to fetch weapons,Try again later 🥲")
        })
        .finally(()=>{
            setLoading(false);
        })
    }

    return (
        <div className="container mt-8 p-4 text-center">
          <h2 className="text-3xl font-bold text-gray-200 mb-6">Weapons</h2>
           
          <button 
            onClick={fetchWeapons} 
            disabled={loading} 
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-md disabled:opacity-50 mb-6"
          >
            {loading ? "Loading..." : "Fetch Weapons"}
          </button>
          
          {error && <p className="text-red-500 font-bold">{error}</p>}
          
          <div className="flex flex-wrap justify-center gap-8">
            {weapons.map((weapon) => (
              <div
                key={weapon.uuid}
                className="card h-10 shadow-lg border-0 bg-gray-900  overflow-hidden  text-black transform transition-transform hover:scale-105 hover:shadow-xl flex flex-col items-center p-6"
              >
                {/* Image Section */}
                <div className=" w-5 h-3">
                  <img
                    src={weapon.displayIcon || "https://via.placeholder.com/150"}
                    alt={weapon.displayName}
                    className="w-5 h-3 object-cover rounded-lg border-4 border-gray-700 shadow-md"
                  />
                </div>
                
                {/* Description Section */}
                <div className="text-center mt-4 px-4">
                  <h3 className="text-2xl font-bold text-yellow-400">{weapon.displayName}</h3>
                  <p className="mt-2 text-gray-300 text-sm leading-relaxed">{weapon.category}</p>
                  
                  <p className="mt-2 text-blue-400 font-semibold">Fire Rate: {weapon.weaponStats?.fireRate || "Unknown"}</p>
                  <p className="mt-2 text-green-400">Magazine Size: {weapon.weaponStats?.magazineSize || "Unknown"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    
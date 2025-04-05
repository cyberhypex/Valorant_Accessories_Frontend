import React, { useState } from 'react';
import axios from 'axios';
import api from '../AxiosInstance';
import li from '../assets/VALORANT_V_Red.jpg';

export function GameModes() {
    const [gameModes, setGameModes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchGameModes = () => {
        setLoading(true);
        setError("");

        api.get("/getGameModes")
            .then((response) => {
                if (response.data && response.data.data) {
                    setGameModes(response.data.data);
                } else {
                    console.error("Error fetching data", response);
                    setError("Unexpected response format 😢");
                }
            })
            .catch((error) => {
                console.error("Error fetching", error);
                setError("Failed to fetch game modes, try again later 🥲");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <>
            <div className="text-center container mt-4">
                <button
                    onClick={fetchGameModes}
                    disabled={loading}
                    className="btn btn-primary mb-4"
                >
                    {loading ? "Loading.." : "Fetch Game Modes"}
                </button>
            </div>

            <div className='text-center container mt-4'>
                {error && <p className='text-danger fw-bold'>{error}</p>}
            </div>

            <div className='row justify-content-center'>
                {gameModes.map((mode) => (
                    <div key={mode.uuid} className='col-md-4 mb-4 px-2'
                        style={{
                            transition: "transform 0.3s, box-shadow 0.3s",
                            borderRadius: "15px",
                            overflow: "hidden",
                            background: "rgba(30, 30, 30, 0.5)",
                            color: "#F35116FF"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.05)";
                            e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.5)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow = "0 5px 10px rgba(0,0,0,0.2)";
                        }}
                    >
                        <img
                            src={mode.displayIcon || li}
                            alt={mode.displayName}
                            className='card-img-top'
                            style={{ height: "8rem", width: "100%", objectFit: "contain" }}
                        />
                        <div className='card-body text-center'>
                            <h5
                                className='card-title fw-bold'
                                style={{
                                    fontSize: "1rem",
                                    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)"
                                }}
                            >
                                <p>{mode.displayName}</p>
                                <p>{mode.description || "Stay Tuned"}</p>
                            </h5>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

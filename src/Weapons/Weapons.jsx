import React, { useState } from 'react';
import api from '../AxiosInstance';

export function Weapons() {
    const [weapons, setWeapons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchWeapons = () => {
        setLoading(true);
        setError("");

        api.get("/getWeapons")
            .then((response) => {
                if (response.data && response.data.data) {
                    setWeapons(response.data.data);
                } else {
                    console.error("Error fetching data", response);
                    setError("Unexpected response format 😢");
                }
            })
            .catch((error) => {
                console.error("Error fetching", error);
                setError("Failed to fetch weapons, try again later 🥲");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <>
            <div className="text-center container mt-4">
                <button
                    onClick={fetchWeapons}
                    disabled={loading}
                    className="btn btn-primary mb-4"
                >
                    {loading ? "Loading.." : "Fetch Weapons"}
                </button>
            </div>

            <div className='text-center container mt-4'>
                {error && <p className='text-danger fw-bold'>{error}</p>}
            </div>

            <div className='row justify-content-center px-4 py-4'>
                {weapons.map((weapon) => (
                    <div key={weapon.uuid} className='col-md-3 mb-5 px-4 py-4'
                        style={{
                            transition: "transform 0.3s, box-shadow 0.3s",
                            borderRadius: "10px",
                            overflow: "clip",
                            background: "rgba(30, 30, 30, 0.5)",
                            color: "#EA3F0BFF",
                            
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
                            src={weapon.displayIcon || "https://via.placeholder.com/150"}
                            alt={weapon.displayName}
                            className='card-img-top'
                            style={{ height: "8rem", width: "100%", objectFit: "contain" }}
                        />
                        <div className='card-body text-center'>
                            <h5
                                className='card-title fw-bold'
                                style={{
                                    fontSize: "1.5rem",
                                    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)"
                                }}
                            >
                                <p>{weapon.displayName}</p>

                                <p>{weapon.category}</p>

                            </h5>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

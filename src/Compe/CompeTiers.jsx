import React, { useState } from 'react'
import api from '../AxiosInstance';

export function CompeTiers() {

    const [compe, setCompe] = useState([]);
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchComp = () => {
        setLoading(true);
        setErr("");

        api.get("/getCompe")
            .then((response) => {
                if (response.data && response.data.data && response.data.data[0].tiers) {
                    setCompe(response.data.data[0].tiers);
                } else {
                    console.error("Unexpected response format", response);
                    setErr("Unexpected response format 😕");
                }
            })
            .catch((error) => {
                console.error("Error fetching", error);
                setErr("Failed to fetch competitive tiers 😞");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <>
            <div className="text-center container mt-4">
                <button
                    onClick={fetchComp}
                    disabled={loading}
                    className="btn btn-primary mb-4"
                >
                    {loading ? "Loading..." : "Fetch Competitive Tiers"}
                </button>

                {err && <p className="text-danger fw-bold">{err}</p>}
            </div>

            <div className="row justify-content-center">
                {compe.filter(tier => tier.tierName !== "Unused1" && tier.tierName !== "Unused2").map((tier, index) => (
                    <div key={index} className='col-md-3 mb-5 px-4 py-4'
                        style={{
                            transition: "transform 0.3s, box-shadow 0.3s",
                            borderRadius: "10px",
                            overflow: "clip",
                            background: "rgba(30, 30, 30, 0.5)",
                            color: "#EA3F0BFF"
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
                            src={tier.largeIcon || "https://via.placeholder.com/100"}
                            alt={tier.tierName}
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
                                <p>{tier.tierName}</p>
                            </h5>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

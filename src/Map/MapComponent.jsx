import React, { useState } from "react";
import api from "../AxiosInstance";

export default function Maps() {
  const [maps, setMaps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,setError]=useState("");

  const fetchMaps = () => {
    setLoading(true);
    setError("");
    api
      .get("/getMaps")
      .then((response) => {
        if (response.data && response.data.data) {
          
          const uniqueMaps = Array.from(
            new Map(response.data.data.map((map) => [map.displayName, map])).values()
          );
          setMaps(uniqueMaps);
        } else {
          console.error("Unexpected response format:", response.data);
          setError("Unexpected response format 😢");
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
        setError("Failed to fetch agents. Please try again later 😢");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="container text-center mt-4">
      <button
        onClick={fetchMaps}
        disabled={loading}
        className="btn btn-primary mb-4"
      >
        {loading ? "Loading..." : "Fetch Maps"}
      </button>

      {error && <p className="text-danger fw-bold">{error}</p>}

      <div className="row justify-content-center">
        {maps.map((map, index) => (
          <div key={map.displayName} className="col-md-4 mb-4">
            <div
              className="card h-100 shadow-lg border-0"
              style={{
                transition: "transform 0.3s, box-shadow 0.3s",
                borderRadius: "15px",
                overflow: "hidden",
                background: "#1e1e1e",
                color: "#f8f9fa"
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
              loading="lazy"
                src={map.splash || "https://via.placeholder.com/600x400?text=No+Image+Available"}
                alt={map.displayName || "Map"}
                className="card-img-top"
                style={{ height: "220px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5
                  className="card-title fw-bold"
                  style={{
                    fontSize: "1.5rem",
                    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)"
                  }}
                >
                  {map.displayName || "Unknown Map"}
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

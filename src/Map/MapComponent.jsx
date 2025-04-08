import React, { useState } from "react";
import api from "../AxiosInstance";

export default function Maps() {
  const [maps, setMaps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMaps = () => {
    setLoading(true);
    setError("");
    api
      .get("/getMaps")
      .then((response) => {
        if (response.data && response.data.data) {
          const filteredMaps = response.data.data.filter(
            (map) =>
              map.displayName !== "The Range" &&
              map.displayName !== "Basic Training"
          );

          const uniqueMaps = Array.from(
            new Map(filteredMaps.map((map) => [map.displayName, map])).values()
          );

          setMaps(uniqueMaps);
        } else {
          console.error("Unexpected response format:", response.data);
          setError("Unexpected response format 😢");
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
        setError("Failed to fetch maps. Please try again later 😢");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div div className="container-fluid d-flex flex-column justify-content-center align-items-center text-center min-vh-100 px-3">
      {maps.length === 0 && (
        <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
          <h2
            className="fw-bold"
            style={{
              color: "#ff4655",
              fontSize: "2.5rem",
              textShadow: "2px 2px 5px rgba(0,0,0,0.6)",
            }}
          >
            Discover Valorant Maps
          </h2>
          <p
            className="lead text-light"
            style={{
              maxWidth: "700px",
              marginTop: "0.25rem",
              marginBottom: "2rem",
              fontSize: "1.5rem",
              lineHeight: "1.6",
              textShadow: "1px 1px 3px rgba(0,0,0,0.6)",
            }}
          >
            Valorant maps are strategic battlegrounds with unique layouts, callouts, and design styles that challenge your gameplay.
          </p>
          <button
            onClick={fetchMaps}
            disabled={loading}
            className="btn btn-danger px-4 py-2"
            style={{ fontSize: "1.2rem", fontWeight: "bold" }}
          >
            {loading ? "Loading..." : "Fetch Maps"}
          </button>
        </div>
      )}

      {error && <p className="text-danger fw-bold mt-4">{error}</p>}

      <div className="row justify-content-center mt-4">
        {maps.map((map) => (
          <div key={map.uuid} className="col-md-4 mb-4">
            <MapCard map={map} />
          </div>
        ))}
      </div>
    </div>
  );
}

function MapCard({ map }) {
  return (
    <div
      className="card shadow-lg border-0 h-100"
      style={{
        background: "rgba(0, 0, 0, 0.7)",
        color: "#f8f9fa",
        transition: "transform 0.3s, box-shadow 0.3s",
        borderRadius: "15px",
        overflow: "hidden",
        cursor: "pointer",
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
        src={
          map.splash ||
          "https://via.placeholder.com/600x400?text=No+Image+Available"
        }
        alt={map.displayName || "Map"}
        className="card-img-top"
        style={{
          height: "200px",
          objectFit: "cover",
        }}
      />
      <div className="card-body text-center">
        <h5
          className="card-title fw-bold"
          style={{
            fontSize: "1.5rem",
            textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
          }}
        >
          {map.displayName || "Unknown Map"}
        </h5>
      </div>
    </div>
  );
}

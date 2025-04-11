import React, { useState } from "react";
import api from "../AxiosInstance";

export function Weapons() {
  const [weapons, setWeapons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeapons = () => {
    setLoading(true);
    setError("");

    api
      .get("/getWeapons")
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
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center text-center min-vh-100 px-3">
      {error ? (
        <>
          <h2
            className="fw-bold"
            style={{
              color: "#ff6b6b",
              fontSize: "2.5rem",
              textShadow: "2px 2px 5px rgba(0,0,0,0.6)",
            }}
          >
            Oops! Something went wrong.
          </h2>
          <p
            className="lead text-light"
            style={{
              maxWidth: "700px",
              marginTop: "1rem",
              fontSize: "1.3rem",
              lineHeight: "1.6",
              color: "#f1f1f1",
            }}
          >
            {error}
          </p>
          <button
            onClick={fetchWeapons}
            disabled={loading}
            className="btn btn-danger px-4 py-2 mt-4"
            style={{ fontSize: "1.2rem", fontWeight: "bold" }}
          >
            {loading ? "Retrying..." : "Try Again"}
          </button>
        </>
      ) : (
        <>
          {weapons.length === 0 && (
            <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
              <h2
                className="fw-bold"
                style={{
                  color: "#f94f4f",
                  fontSize: "2.5rem",
                  textShadow: "2px 2px 5px rgba(0,0,0,0.6)",
                }}
              >
                Arm Yourself, Agent!
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
                Valorant weapons range from deadly pistols to powerful rifles. Each
                gun has its own style, strength, and cost—choose wisely!
              </p>
              <button
                onClick={fetchWeapons}
                disabled={loading}
                className="btn btn-danger px-4 py-2"
                style={{ fontSize: "1.2rem", fontWeight: "bold" }}
              >
                {loading ? "Loading..." : "Fetch Weapons"}
              </button>
            </div>
          )}

          <div className="row justify-content-center mt-4">
            {weapons.map((weapon) => (
              <div
                key={weapon.uuid}
                className="col-md-3 mb-4"
                style={{
                  padding: "1rem",
                }}
              >
                <div
                  className="card h-100 shadow"
                  style={{
                    background: "rgba(30, 30, 30, 0.85)",
                    borderRadius: "15px",
                    color: "#EA3F0B",
                    overflow: "hidden",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 20px rgba(0,0,0,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 5px 10px rgba(0,0,0,0.2)";
                  }}
                >
                  <img
                    src={
                      weapon.displayIcon ||
                      "https://via.placeholder.com/150?text=No+Image"
                    }
                    alt={weapon.displayName}
                    className="card-img-top"
                    style={{
                      height: "8rem",
                      width: "100%",
                      objectFit: "contain",
                      backgroundColor: "#111",
                    }}
                  />
                  <div className="card-body text-center">
                    <h5
                      className="card-title fw-bold"
                      style={{
                        fontSize: "1.25rem",
                        textShadow: "2px 2px 5px rgba(0,0,0,0.7)",
                      }}
                    >
                      {weapon.displayName}
                    </h5>
                    <p
                      className="mb-0 text-white-50"
                      style={{
                        fontStyle: "italic",
                        fontSize: "1rem",
                        textShadow: "1px 1px 3px rgba(0,0,0,0.6)",
                      }}
                    >
                      {weapon.category?.replace("EEquippableCategory::", "")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

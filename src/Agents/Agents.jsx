import React, { useState } from "react";
import api from "../AxiosInstance";

export function Agents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = () => {
    setLoading(true);
    setError("");
    api
      .get("getAgents/true")
      .then((response) => {
        if (response.data && response.data.data) {
          setAgents(response.data.data);
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
    <div className="text-center container mt-4">
      <button
        onClick={fetchData}
        disabled={loading}
        className="btn btn-primary mb-4"
      >
        {loading ? "Loading..." : "Fetch Agents"}
      </button>
      
      {error && <p className="text-danger fw-bold">{error}</p>}
      
      <div className="row justify-content-center">
        {agents.map((agent, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div
              className="card shadow-lg border-0 h-100"
              style={{
                background: "rgba(0, 0, 0, 0.7)",
                color: "#f8f9fa",
                transition: "transform 0.3s, box-shadow 0.3s",
                borderRadius: "15px",
                overflow: "hidden",
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
              <div className="card-body text-center">
                <h4
                  className="card-title fw-bold"
                  style={{
                    color: "#f39c12",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.8)",
                  }}
                >
                  {agent.displayName || "Unknown Agent"}
                </h4>

                {agent.displayIcon ? (
                  <img
                    src={agent.displayIcon}
                    alt={agent.displayName || "Agent"}
                    className="img-fluid rounded-circle mt-3"
                    style={{
                      maxWidth: "130px",
                      border: "3px solid #f39c12",
                      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.7)",
                    }}
                  />
                ) : (
                  <p className="text-muted">No Image Available</p>
                )}

                <p
                  className="mt-3"
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "500",
                    color: "#3498db",
                    textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <strong>Role:</strong>{" "}
                  <span style={{ color: "#e74c3c", fontStyle: "italic" }}>
                    {agent.role ? agent.role.displayName : "Not Available"}
                  </span>
                </p>

                {agent.abilities?.length > 0 ? (
                  <div className="mt-3">
                    <strong
                      style={{
                        fontSize: "1.2rem",
                        color: "#2ecc71",
                        textTransform: "uppercase",
                        textShadow: "1px 1px 3px rgba(0, 0, 0, 0.6)",
                      }}
                    >
                      Abilities:
                    </strong>
                    <ul
                      className="list-unstyled mt-2"
                      style={{ fontSize: "0.95rem", lineHeight: "1.8" }}
                    >
                      {agent.abilities.map((ability, i) => (
                        <li
                          key={i}
                          style={{
                            textShadow: "1px 1px 4px rgba(0, 0, 0, 0.6)",
                          }}
                        >
                          <span
                            style={{ color: "#f1c40f", fontWeight: "bold" }}
                          >
                            {ability.displayName}:
                          </span>{" "}
                          {ability.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p
                    className="text-muted small"
                    style={{ textShadow: "1px 1px 3px rgba(0, 0, 0, 0.4)" }}
                  >
                    No Abilities Available
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

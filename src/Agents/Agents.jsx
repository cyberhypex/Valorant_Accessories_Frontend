import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL ;


export function Agents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    axios.get(`${baseUrl}getAgents/true`) // Using the base URL
      .then(response => {
        console.log("API Response:", response.data);
        if (response.data && response.data.data) {
          setAgents(response.data.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      })
      .catch(error => console.error("Error fetching data", error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    console.log("Agents state updated:", agents);
  }, [agents]);

  return (
    <div className="text-center container mt-4">
      <button 
        onClick={fetchData} 
        disabled={loading} 
        className="btn btn-primary mb-4"
      >
        {loading ? "Loading..." : "Fetch Agents"}
      </button>
      
      <div className="row justify-content-center">
        {agents.map((agent, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100">
              {console.log("Rendering Agent:", agent.displayName)}
              <div className="card-body text-center">
                <h5 className="card-title fw-bold text-decoration-underline">
                  {agent.displayName ? agent.displayName : "Unknown Agent"}
                </h5>
                {agent.displayIcon ? (
                  <img src={agent.displayIcon} alt={agent.displayName || "Agent"} 
                    className="img-fluid rounded" style={{ maxWidth: '150px' }} />
                ) : (
                  <p className="text-muted">No Image Available</p>
                )}
                <p className="text-muted small mt-2">{agent.description || "No description available."}</p>
                <p><strong>Role:</strong> {agent.role ? agent.role.displayName : "Not Available"}</p>
                {agent.abilities && agent.abilities.length > 0 ? (
                  <div>
                    <strong>Abilities:</strong>
                    <ul className="list-unstyled text-muted small">
                      {agent.abilities.map((ability, i) => (
                        <li key={i}>
                          {ability.displayName}: {ability.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-muted small">No Abilities Available</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

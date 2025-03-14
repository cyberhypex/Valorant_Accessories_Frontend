import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function Agents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    axios.get("http://localhost:8080/valorant/getAgents/true")
      .then(response => {
        console.log("API Response:", response.data); // Debugging
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
  }, [agents]); // Logs when agents state updates

  return (
    <div style={{ textAlign: 'center' }}>
      <button onClick={fetchData} disabled={loading} style={{ margin: '20px', padding: '10px 20px', fontSize: '16px' }}>
        {loading ? "Loading..." : "Fetch Agents"}
      </button>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>

        {agents.map((agent, index) => (
          <div key={index} style={{
            width: '300px',
            margin: '20px',
            padding: '15px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            backgroundColor: '#f9f9f9',
            textAlign: 'center'
          }}>
            {/* Debug: Log Agent Name */}
            {console.log("Rendering Agent:", agent.displayName)}

            {/* Agent Name */}
            <h2>{agent.displayName ? agent.displayName : "Unknown Agent"}</h2>

            {/* Agent Image (Check if Available) */}
            {agent.displayIcon ? (
              <img src={agent.displayIcon} alt={agent.displayName || "Agent"} width="150" style={{ borderRadius: '10px' }} />
            ) : (
              <p>No Image Available</p>
            )}

            {/* Agent Description */}
            <p style={{ fontSize: '14px', color: '#555' }}>{agent.description || "No description available."}</p>

            {/* Agent Role */}
            {agent.role ? (
              <p><strong>Role:</strong> {agent.role.displayName}</p>
            ) : (
              <p><strong>Role:</strong> Not Available</p>
            )}

            {/* Agent Abilities */}
            {agent.abilities && agent.abilities.length > 0 ? (
              <div>
                <strong>Abilities:</strong>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  {agent.abilities.map((ability, i) => (
                    <li key={i} style={{ fontSize: '12px', color: '#777' }}>
                      {ability.displayName}: {ability.description}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No Abilities Available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

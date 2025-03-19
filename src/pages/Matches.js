import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/matches.css";

const Matches = () => {
    const [matches, setMatches] = useState([]);
    const [error, setError] = useState("");

    // ✅ Fetch Matches from Backend
    const fetchMatches = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/schedule/matches");
            setMatches(response.data);
        } catch (error) {
            console.error("❌ Error fetching matches:", error);
            setError("Failed to load matches. Try again.");
        }
    };

    useEffect(() => {
        fetchMatches();
    }, []);

    return (
        <div className="matches-container">
            <h1>🥂 My Matches</h1>

            {error ? <p className="error">{error}</p> : (
                <div className="match-list">
                    {matches.map((match) => (
                        <div key={match.id} className="match-card">
                            <p>{match.user1} & {match.user2}</p>
                            <Link to={`/plan-social/${match.id}`}>
                                <button>Plan a Social</button>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Matches;







import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/planSocial.css";

const PlanSocial = () => {
    const { matchId } = useParams(); // Get match ID from URL
    const navigate = useNavigate();
    const [selectedDates, setSelectedDates] = useState([]);
    const [generatedDates, setGeneratedDates] = useState([]);
    const [notification, setNotification] = useState("");
    const [loading, setLoading] = useState(true);

    // **Placeholder user info (Replace with real logged-in users)**
    const user1 = "Alice";
    const user2 = "Bob";

    // ✅ Fetch 5 Generated Dates from Backend (Wrapped in useCallback)
    const fetchGeneratedDates = useCallback(async () => {
        console.log(`📡 Requesting 5 dates for match ID: ${matchId}...`);
        
        const requestData = { 
            matchId: Number(matchId),  // ✅ Ensure matchId is sent correctly
            users: [user1, user2] // 
        };

        console.log("🔍 Sending API Request with Data:", requestData);

        setLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/api/schedule/generate-dates", requestData);

            console.log("✅ API Response:", response.data);

            if (response.data.generatedDates) { 
                setGeneratedDates(response.data.generatedDates);
                setSelectedDates([]); // Reset selection
                setNotification("");
            } else {
                setNotification("❌ No dates available. Try again.");
            }
        } catch (error) {
            console.error("❌ Error fetching dates:", error);
            setNotification("❌ Failed to generate dates. Try again.");
        }
        setLoading(false);
    }, [matchId]);

    // ✅ Fetch Dates on Component Mount
    useEffect(() => {
        fetchGeneratedDates();
    }, [fetchGeneratedDates]);

    // ✅ Submit Selected Dates to Backend
    const submitDates = async () => {
        if (selectedDates.length !== 3) {
            setNotification("⚠️ Please select exactly 3 dates before submitting.");
            return;
        }
    
        console.log("📡 Submitting dates:", selectedDates);
    
        const requestData = {
            matchId: Number(matchId),
            users: [user1, user2],
            selectedDates
        };
    
        try {
            const response = await axios.post("http://localhost:5000/api/schedule/book", requestData);
        
            console.log("✅ API Response:", response.data);
        
            // ✅ Check if API response contains schedule data
            if (response.data.schedule) {
                setNotification("✅ Dates submitted! Updating schedule...");
                
                // ✅ Navigate to schedule page after submission
                setTimeout(() => {
                    console.log("🚀 Redirecting to /schedule");
                    navigate("/schedule");
                }, 1000);
            } else {
                setNotification("❌ Failed to book social. Try again.");
                console.error("❌ Unexpected API response:", response);
            }
        } catch (error) {
            console.error("❌ Error booking social:", error.response ? error.response.data : error);
            setNotification("❌ Error booking social. Try again.");  
        }
        
    };
    

    return (
        <div className="plan-social-container">
            <h1>📅 Plan a Social</h1>
            <p>Select 3 Dates</p>

            {notification && <p className="notification">{notification}</p>}

            {loading ? (
                <p>Loading dates...</p>
            ) : (
                <div className="date-options">
                    {generatedDates.map((date, index) => (
                        <button
                            key={index}
                            className={`date-btn ${selectedDates.includes(date) ? "selected" : ""}`}
                            onClick={() => setSelectedDates((prev) =>
                                prev.includes(date) ? prev.filter(d => d !== date) : [...prev, date]
                            )}
                        >
                            {date}
                        </button>
                    ))}
                </div>
            )}

            <div className="button-group">
                <button className="submit-btn" onClick={submitDates} disabled={selectedDates.length !== 3}>
                    Submit Dates
                </button>
                <button className="generate-btn" onClick={fetchGeneratedDates}>
                    Generate 5 New Dates
                </button>
            </div>

            <div className="button-group">
                <button className="cancel-btn" onClick={() => navigate("/matches")}>Cancel</button>
            </div>
        </div>
    );
};

export default PlanSocial;


import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/dates.css";

const DateSelection = () => {
    const { scheduleId } = useParams();
    const navigate = useNavigate();

    const [suggestedDates, setSuggestedDates] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);
    const [notification, setNotification] = useState("");
    const [loading, setLoading] = useState(false);

    // ✅ Fetch 5 Suggested Dates (Wrapped in useCallback to prevent re-creation)
    const fetchSuggestedDates = useCallback(async () => {
        console.log(`📡 Fetching suggested dates for schedule ID: ${scheduleId}...`);
        
        if (!scheduleId) {
            console.error("❌ No scheduleId found in URL!");
            setNotification("❌ Error: Schedule ID not found.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/api/schedule/generate-dates", {
                scheduleId: parseInt(scheduleId, 10) // ✅ Ensure scheduleId is an integer
            });

            console.log("✅ API Response:", response.data);

            if (response.data.generatedDates) {
                setSuggestedDates(response.data.generatedDates);
                setSelectedDates([]); // Reset selection
                setNotification("");
            } else {
                setNotification("❌ No suggested dates available. Try again.");
            }
        } catch (error) {
            console.error("❌ Error generating dates:", error);
            setNotification("❌ Failed to generate dates. Try again.");
        }
        setLoading(false);
    }, [scheduleId]); // ✅ Ensures useCallback updates when scheduleId changes

    // ✅ Use Effect: Fetch Dates on Component Mount
    useEffect(() => {
        console.log("🔄 Running fetchSuggestedDates on mount...");
        fetchSuggestedDates();
    }, [fetchSuggestedDates]);  // ✅ Fix: Now uses a stable function

    // ✅ Select 3 Dates
    const handleSelectDate = (date) => {
        console.log(`📌 Selecting Date: ${date}`);
        setSelectedDates((prev) =>
            prev.includes(date) ? prev.filter(d => d !== date) : [...prev, date]
        );
    };

    // ✅ Confirm Final 3 Dates
    const handleConfirmDates = async () => {
        if (selectedDates.length !== 3) {
            setNotification("⚠️ Please select exactly 3 dates before confirming.");
            return;
        }

        console.log("✅ Confirming selected dates:", selectedDates);
        setLoading(true);
        try {
            await axios.put(`http://localhost:5000/api/schedule/confirm-dates/${scheduleId}`, { selectedDates });
            setNotification("✅ Meeting scheduled! Awaiting confirmation.");
            console.log("🔄 Redirecting to scheduling page...");
            navigate("/scheduling"); // Redirect to scheduling page
        } catch (error) {
            console.error("❌ Error confirming dates:", error);
            setNotification("❌ Error confirming dates. Try again.");
        }
        setLoading(false);
    };

    // ✅ Generate New Dates (If Unavailable)
    const handleGenerateNewDates = async () => {
        console.log("🔄 Generating new dates...");
        setNotification("⚠️ Generating new dates...");
        fetchSuggestedDates(); // ✅ Call the stable function
    };

    return (
        <div className="date-selection-container">
            <h2>📅 Plan a Social</h2>
            <p className="explanation">
                Each social requires a confirmed date. If none of these 5 suggested dates work, you can generate new ones.
            </p>

            {notification && <p className="notification">{notification}</p>}

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <ul>
                        {suggestedDates.map((date, index) => (
                            <li key={index} 
                                onClick={() => handleSelectDate(date)}
                                className={selectedDates.includes(date) ? "selected" : ""}
                            >
                                {date}
                            </li>
                        ))}
                    </ul>

                    <div className="button-group">
                        <button onClick={handleConfirmDates} disabled={selectedDates.length !== 3}>
                            Confirm 3 Dates
                        </button>
                        <button onClick={handleGenerateNewDates}>
                            Generate 5 New Dates
                        </button>
                    </div>
                </>
            )}

            <button className="cancel-btn" onClick={() => navigate("/scheduling")}>Cancel</button>
        </div>
    );
};

export default DateSelection;







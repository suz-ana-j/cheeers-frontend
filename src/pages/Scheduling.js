import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../styles/scheduling.css";

const Scheduling = () => {
    const [schedules, setSchedules] = useState([]);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [loading, setLoading] = useState(false); 
    const [notification, setNotification] = useState("");

    // ✅ Fetch all scheduled meetings
    const fetchSchedules = useCallback(async () => {
        console.log("📡 Fetching all scheduled socials...");
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:5000/api/schedule/upcoming");
            console.log("✅ Scheduled socials received:", response.data);

            // ✅ Find common dates between all users
            const updatedSchedules = response.data.map(schedule => {
                if (schedule.commonDates) {
                    return { ...schedule };
                }
                return schedule;
            });

            setSchedules(updatedSchedules);
            setNotification("");
        } catch (error) {
            console.error("❌ Error fetching schedules:", error);
            setNotification("❌ Failed to load scheduled socials.");
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchSchedules();
    }, [fetchSchedules]);

    // ✅ Confirm the Final Date
    const handleChooseFinalDate = async (date) => {
        if (!selectedSchedule) return;

        console.log("📆 Choosing final date:", date);
        setLoading(true);
        try {
            await axios.put(`http://localhost:5000/api/schedule/confirm-date/${selectedSchedule.id}`, { confirmedDate: date });
            setNotification("✅ Final date confirmed!");
            fetchSchedules(); // Refresh schedules after selecting the final date
            setSelectedSchedule(null);
        } catch (error) {
            console.error("❌ Error confirming final date:", error);
            setNotification("❌ Error confirming final date. Try again.");
        }
        setLoading(false);
    };

    return (
        <div className="scheduling-container">
            <h2>📅 Scheduled Socials</h2>

            {notification && <p className="notification">{notification}</p>}
            {loading ? <p>Loading...</p> : null}

            {schedules.length === 0 ? (
                <p>No upcoming meetings.</p>
            ) : (
                <ul>
                    {schedules.map(schedule => (
                        <li key={schedule.id}>
                            <strong>{schedule.users.join(" & ")}</strong> - Status: {schedule.status}
                            <br />
                            {schedule.confirmedDate ? (
                                <p>✅ Confirmed for {schedule.confirmedDate}</p>
                            ) : schedule.commonDates && schedule.commonDates.length > 0 ? (
                                <>
                                    <p>Common Dates: {schedule.commonDates.join(", ")}</p>
                                    {schedule.commonDates.map(date => (
                                        <button key={date} onClick={() => handleChooseFinalDate(date)}>
                                            Confirm {date}
                                        </button>
                                    ))}
                                </>
                            ) : (
                                <p>Waiting for all users to select dates...</p>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Scheduling;






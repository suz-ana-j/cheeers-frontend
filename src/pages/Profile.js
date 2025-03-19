import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/profile.css";

const Profile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        username: "",
        email: "",
        phone: "",
        instagram: "",
        validated: false,
    });

    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState("");

    // ✅ Fetch User Profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get("https://cheeers-backend-1.onrender.com/api/schedule/profile/1"); // Replace `1` with dynamic user ID
                setProfile(response.data);
                setLoading(false);
            } catch (error) {
                console.error("❌ Error fetching profile:", error);
                setNotification("❌ Failed to load profile.");
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    // ✅ Handle Input Change
    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    // ✅ Update Profile
    const handleUpdateProfile = async () => {
        try {
            await axios.put(`https://cheeers-backend-1.onrender.com/api/schedule/profile/update/${profile.id}`, profile);
            setNotification("✅ Profile updated successfully!");
        } catch (error) {
            console.error("❌ Error updating profile:", error);
            setNotification("❌ Failed to update profile.");
        }
    };

    // ✅ Validate Profile (For Instagram)
    const handleValidateProfile = async () => {
        try {
            await axios.put(`https://cheeers-backend-1.onrender.com/api/schedule/profile/validate/${profile.id}`);
            setProfile({ ...profile, validated: true });
            setNotification("✅ Profile validated for Instagram!");
        } catch (error) {
            console.error("❌ Error validating profile:", error);
            setNotification("❌ Profile validation failed.");
        }
    };

    // ✅ Logout Function
    const handleLogout = () => {
        // Clear any stored authentication details (if applicable)
        navigate("/login");
    };

    return (
        <div className="profile-container">
            <h1>👤 My Profile</h1>

            {notification && <p className="notification">{notification}</p>}

            {loading ? (
                <p>Loading profile...</p>
            ) : (
                <div className="profile-form">
                    <label>Username:</label>
                    <input type="text" name="username" value={profile.username} onChange={handleChange} />

                    <label>Email:</label>
                    <input type="email" name="email" value={profile.email} onChange={handleChange} />

                    <label>Phone:</label>
                    <input type="text" name="phone" value={profile.phone} onChange={handleChange} />

                    <label>Instagram Handle:</label>
                    <input type="text" name="instagram" value={profile.instagram} onChange={handleChange} />

                    <p>Status: {profile.validated ? "✅ Validated" : "❌ Not Validated"}</p>

                    <div className="button-group">
                        <button onClick={handleUpdateProfile} className="update-btn">Update Profile</button>
                        {!profile.validated && <button onClick={handleValidateProfile} className="validate-btn">Validate for Instagram</button>}
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [user, setUser] = useState(null); // Stores logged-in user
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const endpoint = isSignUp ? "signup" : "login";
        console.log(`Attempting ${endpoint} with email:`, email); // ✅ Debugging

        try {
            const response = await axios.post(`http://localhost:5000/api/auth/${endpoint}`, {
                email,
                password,
            });

            console.log("Response received:", response.data); // ✅ Debugging
            setUser(response.data.user); // Save user details in state
            localStorage.setItem("token", response.data.token); // Store JWT token

            navigate("/matches"); // Redirect after login/signup
        } catch (error) {
            console.error("Error during auth:", error.response?.data || error.message);
            alert(`Error: ${error.response?.data?.message || error.message}`); // ✅ Show error message
        }
    };

    return (
        <div className="auth-container">
            <h2>{isSignUp ? "Sign Up" : "Login"} to Cheeers 🍹</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
            </form>

            {/* ✅ Show Verified Badge If User is Validated */}
            {user && user.validated && (
                <span className="validated-badge">✔️ Verified</span>
            )}

            <p>
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                <button onClick={() => setIsSignUp(!isSignUp)}>
                    {isSignUp ? "Login" : "Sign Up"}
                </button>
            </p>
        </div>
    );
};

export default Login;


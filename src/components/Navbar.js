import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Add styling

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Cheeers 🍹</h1>
            <div>
                <Link to="/matches">Matches</Link>
                <Link to="/schedule">Schedule</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/privacy-terms">Legal</Link>
            </div>
        </nav>
    );
};

export default Navbar;

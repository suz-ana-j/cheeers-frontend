import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Matches from "./pages/Matches";
import PlanSocial from "./pages/PlanSocial";
import Scheduling from "./pages/Scheduling";
import DateSelection from "./pages/DateSelection";
import Profile from "./pages/Profile"; 
import PrivacyTerms from "./pages/privacyTerms";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/matches" element={<Matches />} />
                <Route path="/plan-social/:matchId" element={<PlanSocial />} />
                <Route path="/date-selection/:scheduleId" element={<DateSelection />} />
                <Route path="/schedule" element={<Scheduling />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/privacy-terms" element={<PrivacyTerms />} />
            </Routes>
        </Router>
    );
};

export default App;


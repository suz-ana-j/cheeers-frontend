import React, { useState } from "react";
import "../styles/privacyTerms.css"; // CSS file

const PrivacyTerms = () => {
    const [activeTab, setActiveTab] = useState("privacy"); // Default to Privacy Policy

    return (
        <div className="policy-container">
            <h1>Privacy Policy & Terms of Service</h1>
            <p className="last-updated">Last Updated: March 2025</p>
            <p>Welcome to Cheeers 🍹! We value your privacy and are committed to protecting your personal information. Please read these terms carefully before using our platform.</p>

            {/* Navigation Tabs */}
            <div className="policy-tabs">
                <button 
                    className={activeTab === "privacy" ? "active" : ""} 
                    onClick={() => setActiveTab("privacy")}
                >
                    Privacy Policy
                </button>
                <button 
                    className={activeTab === "terms" ? "active" : ""} 
                    onClick={() => setActiveTab("terms")}
                >
                    Terms of Service
                </button>
            </div>

            {/* Content */}
            <div className="policy-content">
                {activeTab === "privacy" ? (
                    <div>
                        <h2>Privacy Policy</h2>

                        <h3>1. Information We Collect</h3>
                        <p>When you use Cheeers, we collect the following types of data:</p>
                        <ul>
                            <li><strong>Personal Information:</strong> Your name, email, profile picture, and login details (if using Instagram authentication).</li>
                            <li><strong>Activity Data:</strong> Matches, scheduled socials, and interactions within the app.</li>
                            <li><strong>Device & Usage Data:</strong> IP address, browser type, operating system, and other analytics to improve our service.</li>
                        </ul>

                        <h3>2. How We Use Your Information</h3>
                        <p>We use the collected data to:</p>
                        <ul>
                            <li>Provide, personalize, and improve the Cheeers experience.</li>
                            <li>Facilitate matches and schedule socials.</li>
                            <li>Send notifications and updates about your matches.</li>
                            <li>Improve security and prevent fraudulent activities.</li>
                        </ul>

                        <h3>3. How We Share Your Data</h3>
                        <p>We do not sell your personal information. We may share data with:</p>
                        <ul>
                            <li><strong>Service Providers:</strong> For hosting, analytics, and security purposes.</li>
                            <li><strong>Legal Authorities:</strong> If required by law, to comply with regulations.</li>
                            <li><strong>Instagram API:</strong> If you choose to connect your Instagram profile.</li>
                        </ul>

                        <h3>4. Data Security</h3>
                        <p>We use encryption, secure servers, and authentication methods to protect your information. However, no online service is 100% secure.</p>

                        <h3>5. Your Rights & Choices</h3>
                        <ul>
                            <li>You can request access, corrections, or deletion of your personal data.</li>
                            <li>You can disable notifications or delete your account at any time.</li>
                        </ul>

                        <h3>6. Third-Party Services</h3>
                        <p>Our platform integrates with third-party services like Instagram. Their data collection practices are governed by their own privacy policies.</p>

                        <h3>7. Contact Us</h3>
                        <p>If you have any questions regarding this Privacy Policy, please contact us at <strong>cheeerspolicy@outlook.com</strong>.</p>
                    </div>
                ) : (
                    <div>
                        <h2>Terms of Service</h2>

                        <h3>1. Acceptance of Terms</h3>
                        <p>By using Cheeers, you agree to these Terms of Service. If you do not agree, please do not use the platform.</p>

                        <h3>2. Eligibility</h3>
                        <p>You must be at least 19 years old to use Cheeers. By using the app, you confirm that you meet this requirement.</p>

                        <h3>3. User Conduct</h3>
                        <ul>
                            <li>Be respectful to other users.</li>
                            <li>Do not use Cheeers for harassment, spamming, or any unlawful activity.</li>
                            <li>Do not impersonate others or use fake profiles.</li>
                        </ul>

                        <h3>4. Account Responsibilities</h3>
                        <p>You are responsible for:</p>
                        <ul>
                            <li>Keeping your login credentials secure.</li>
                            <li>Any activity under your account.</li>
                            <li>Reporting any suspicious activity to <strong>cheeerspolicy@outlook.com</strong>.</li>
                        </ul>

                        <h3>5. Limitation of Liability</h3>
                        <p>Cheeers is provided "as is" without warranties. We are not responsible for:</p>
                        <ul>
                            <li>Any data loss or security breaches.</li>
                            <li>Any issues arising from scheduled socials or matches.</li>
                        </ul>

                        <h3>6. Termination</h3>
                        <p>We may suspend or delete accounts that violate these terms without notice.</p>

                        <h3>7. Updates to Terms</h3>
                        <p>We may update these terms from time to time. Continued use of Cheeers means you accept the revised terms.</p>

                        <p className="final-note"><strong>By using Cheeers, you agree to our Privacy Policy and Terms of Service.</strong></p>
                        <p>For any concerns, contact us at <strong>cheeerspolicy@outlook.com</strong>.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PrivacyTerms;




    
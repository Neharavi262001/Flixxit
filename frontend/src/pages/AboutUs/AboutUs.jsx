import React from 'react';
import './aboutus.css';

const AboutUs = () => {
    return (
        <div className="about-us-container">
            <div className="about-us-content">
                <h1 className="about-us-title">About Flixxit</h1>
                <p className="about-us-description">
                    Welcome to Flixxit, your premier destination for top-tier entertainment.
                    At Flixxit, we take pride in offering a vast array of features to enhance your
                    streaming experience. From personalized recommendations to seamless navigation,
                    Flixxit is designed with you in mind.
                </p>
                <p className="about-us-origin">
                    Originating from a passion for film and television, Flixxit was founded to break
                    the boundaries of traditional entertainment. Our platform caters to a diverse audience,
                    ensuring that there's something for everyone.
                </p>
                <h2 className="about-us-section-title">Features:</h2>
                <div className="about-us-features">
                    <div className="feature-card">
                        <div className="feature-icon">🎬</div>
                        <div className="feature-title">Personalized Recommendations</div>
                    </div>
                   
                    <div className="feature-card">
                        <div className="feature-icon">🎥</div>
                        <div className="feature-title">High-quality Streaming</div>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">🍿</div>
                        <div className="feature-title">Extensive Library of Movies and TV Shows</div>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">🌐</div>
                        <div className="feature-title">Global Content Access</div>
                    </div>



                    <div className="feature-card">
                        <div className="feature-icon">📱</div>
                        <div className="feature-title">Cross-device Compatibility</div>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">🔍</div>
                        <div className="feature-title">Smart Search Functionality</div>
                    </div>

                </div>
            </div>
           
            <div className="about-us-footer">
                    <div className="footer-section">
                        <div className="footer-section-item">
                            <h2>Terms and Conditions</h2>
                            <p>
                                By using Flixxit, you agree to our terms and conditions. Please review them carefully
                                before accessing our services.
                            </p>
                        </div>
                        <div className="footer-section-item">
                            <h2>Help Desk</h2>
                            <p>
                                If you need assistance or have any inquiries, our dedicated help desk is available
                                to provide support. Contact us at 
                                <span className="mail-icon">📧</span>
                                support@flixxit.com.
                            </p>
                            <p className="help-desk-info">
                                Our support team is available 24/7 to assist you with any issues or questions you may have. 
                                Feel free to reach out, and we'll be happy to help!
                            </p>
                        </div>
                    </div>
                    
                </div>
                <p className="about-us-copyright">
                        Copyright © {new Date().getFullYear()} Flixxit. All rights reserved.
                </p>

        </div>
    );
}

export default AboutUs;

import React from 'react';
import './ThinkingLogo.css'; 

const ThinkingLogo = ({ show }) => {
    return (
        <div id="custom-notification-popup" className={`custom-notification-popup ${show ? 'show' : ''}`}>
            <div className="custom-notification-content">
                <div className="custom-notification-icon">👍</div> {/* Thumbs up emoji */}
                <div className="custom-notification-message">Processing...</div>
            </div>
        </div>
    );
};

export default ThinkingLogo;

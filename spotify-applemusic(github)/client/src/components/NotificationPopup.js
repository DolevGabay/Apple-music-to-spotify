import React from 'react';

const CustomNotificationPopup = ({ invalidSongs, show }) => {
    const songs = invalidSongs !== null ? invalidSongs : [];

    return (
        <div id="notification-popup" className={`notification-popup ${show ? 'show' : ''}`}>
            <div className="notification-content">
                <div className="notification-icon">&#10004;</div> {/* Green checkmark symbol */}
                {songs.length === 0 ? (
                    <div className="notification-message">All playlists have moved</div>
                ) : (
                    <div className="notification-message">
                        The following songs could not be found:
                        <ul>
                            {songs.map((song, index) => (
                                <li key={index}>{`${song.name} by ${song.artist}`}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomNotificationPopup;

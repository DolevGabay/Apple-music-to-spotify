import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getStreamer } from "../../modules/providers";
import { isAuthed, startAuth } from "../../modules/authUtils";
import "./Playlists.css";
import { setDestination, setTransferData } from "../../redux/actions/transferActions";

const Playlists = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const source = useSelector((state) => state.transfer.source);

  const [sourceStreamer, setSourceStreamer] = useState(null);
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [sourcePlaylists, setSourcePlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(!source) {
      navigate("/");
    }

    if(!isAuthed(source)) {
      startAuth(source);
    } else {
      getStreamer(source).then((streamer) => {
        setSourceStreamer(streamer);
      });
    }
  }, []);

  useEffect(() => {
    if (sourceStreamer != null) {
      sourceStreamer.loadPlaylists().then((playlists) => {
        setSourcePlaylists(playlists);
        setIsLoading(false);
      });
    }
  }, [sourceStreamer]);

  const onTransferClick = async () => {
    const destination =
      sourceStreamer.provider === "Spotify" ? "Apple" : "Spotify";

    const playlistsToTransfer = sourcePlaylists.filter((_, index) =>
      selectedPlaylists.includes(index)
    );

    const transferData = await Promise.all(
      playlistsToTransfer.map(async (playlist) => {
        return {
          name: playlist.name,
          songs: await sourceStreamer.getSongsFromPlaylist(playlist),
        };
      })
    );
    
    dispatch(setDestination(destination));
    dispatch(setTransferData(transferData));
    navigate("/transfer");
  };

  const onPlaylistClick = (index) => {
    if (selectedPlaylists.includes(index) === false) {
      setSelectedPlaylists([...selectedPlaylists, index]);
    } else {
      setSelectedPlaylists(selectedPlaylists.filter((item) => item !== index));
    }
  };

  return (
    <div>
      <div className="header">
        {sourcePlaylists.length > 0 && (
          <div>
            <h2>Please choose the playlist you want to transfer</h2>
          </div>
        )}
      </div>
      {isLoading ? (
        <div className="loading-indicator">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="big-playlists-container">
      <div className="playlist-container">
        <div className="playlist-cards">
          {sourcePlaylists.map((playlist, index) => (
            <div
              key={index}
              className={`playlist-card ${
                selectedPlaylists.includes(index) ? 'selected' : ''
              }`}
              onClick={() => onPlaylistClick(index)}
            >
              <div className="card-content">
                <img
                  src={playlist.image}
                  alt={playlist.name}
                  className="playlist-image"
                />
                <h3 className="playlist-title">{playlist.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
      )}

      {selectedPlaylists.length > 0 && (
        <div style={{ textAlign: "center", marginRight: "20px" }}>
          <a
            className="btn btn-primary shadow"
            role="button"
            onClick={onTransferClick}
          >
            Transfer
          </a>
        </div>
      )}
    </div>
  );
};

export default Playlists;

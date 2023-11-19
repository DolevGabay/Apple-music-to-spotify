import axios from "axios";

class SpotifyProvider {
  constructor(token) {
    this.accessToken = token;
    console.log(this.accessToken);
    this.header = { Authorization: "Bearer " + this.accessToken };
    this.provider = "Spotify";
    this.userId = ""
  }

  async loadPlaylists() {
    const PLAYLIST_API = "https://api.spotify.com/v1/me/playlists";
    const DEFAULT_IMAGE_URL =
      "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2?v=v2";
    const response = await axios.get(PLAYLIST_API, { headers: this.header });
    console.log(response);
    const data = response.data;
    const rawPlaylists = data.items;

    const playlists = rawPlaylists.map((playlist) => {
      const imageUrl =
        playlist.images.length > 0 ? playlist.images[0].url : DEFAULT_IMAGE_URL;

      return {
        name: playlist.name,
        id: playlist.id,
        tracks: playlist.tracks.total,
        image: imageUrl,
      };
    });

    console.log(playlists);
    return playlists;
  }

  async getSongsFromPlaylist(playlist) {
    const TRACKS_API =
      "https://api.spotify.com/v1/playlists/{playlist_id}/tracks";
    const playlistId = playlist.id;

    const response = await axios.get(
      TRACKS_API.replace("{playlist_id}", playlistId),
      { headers: this.header }
    );

    if (response.status === 200) {
      const data = response.data;
      const songs = data.items.map((item) => {
        return {
          name: item.track.name,
          artist: item.track.artists[0].name,
        };
      });

      return songs;
    } else {
      console.error(
        "Failed to retrieve playlist tracks:",
        response.status,
        response.statusText
      );
      return null;
    }
  }

  async transferPlaylists(playlistsToTransfer) {
    let songsNotFoundReturn = [];
    playlistsToTransfer.forEach(async (playlist) => {
      const newPlaylistId = await this.createPlaylist(playlist.name);
      let songsNotFound =  await this.addTracksToPlaylist(newPlaylistId, playlist.songs);
        if(songsNotFound.length > 0){
          console.log('playlist created ! songs not found:', songsNotFound);
          const playlist = {
              playlistName: playlist.name,
              songsNotFound: songsNotFound
          }
          songsNotFoundReturn.push(playlist);
      }
      else{
          console.log('playlist created !');
      }
    });
    return songsNotFoundReturn;
  }

  async createPlaylist(name) {
    const CREATE_PLAYLIST_API =
      "https://api.spotify.com/v1/users/{user_id}/playlists";

    const response = await axios.post(
      CREATE_PLAYLIST_API.replace("{user_id}", this.userId),
      { name },
      { headers: this.header }
    );

    if (response.status === 201) {
      const data = response.data;
      return data.id;
    } else {
      console.error(
        "Failed to create playlist:",
        response.status,
        response.statusText
      );
      return null;
    }
  }

  async addTracksToPlaylist(playlistId, songs) {
    let songsNotFound = [];
    const ADD_TRACKS_API =
      "https://api.spotify.com/v1/playlists/{playlist_id}/tracks";
    const songUris = await Promise.all(
      songs.map(async (song) => {
        let songUri = await this.getSongUri(song);
        if (songUri === null) {
          songsNotFound.push(song);
        }
        return songUri;
      })
    );

    const response = await axios.post(
      ADD_TRACKS_API.replace("{playlist_id}", playlistId),
      { uris: songUris },
      { headers: this.header }
    );

    if (response.status === 201) {
      return songsNotFound;
    } else {
      console.error(
        "Failed to add tracks to playlist:",
        response.status,
        response.statusText
      );
      return null;
    }
  }

  async getSongUri(song) {
    const SONG_URI_API =
      "https://api.spotify.com/v1/search?q={song.name} {song.artist}&type=track";
    const response = await axios.get(
      SONG_URI_API.replace("{song.name}", song.name).replace(
        "{song.artist}",
        song.artist
      ),
      { headers: this.header }
    );

    if (response.status === 200) {
      const data = response.data;
      const songUri = data.tracks.items[0].uri;
      return songUri;
    } else {
      console.error(
        "Failed to get song URI:",
        response.status,
        response.statusText
      );
      return null;
    }
  }

  async loadProfile() {
    const PROFILE_API = "https://api.spotify.com/v1/me";
    
    const response = await axios.get(PROFILE_API, { headers: this.header });
    const data = response.data;
    this.name = data.display_name;
    this.userId = data.id
    return this.name;
  }

}

export default SpotifyProvider;

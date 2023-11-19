import SpotifyProvider from "./SpotifyProvider";
import AppleProvider from "./AppleProvider";
import { store } from "../redux/store/Store";
import { startAuth } from "./authUtils";

export const streamerProviders = {
  Spotify: SpotifyProvider,
  Apple: AppleProvider,
};

export async function getStreamer(streamer) {
  const state = store.getState();
  try {
    const token = state.auth.tokens[streamer];

    const streamerInstance = new streamerProviders[streamer](token);
    await streamerInstance.loadProfile();
    return streamerInstance;
  } catch(error) {
    console.log(error);
    startAuth(streamer);
    return null;
  }

}

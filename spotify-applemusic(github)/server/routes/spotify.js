const express = require("express");
const router = express.Router();
const axios = require("axios");

const STREAMER = "Spotify";
const CLIENT_ID = "19fa87bff4c74ef79f1a8af8608d1d87";
const CLIENT_SECRET = "3c20d8cbaa0d4e69b882e18064cd00c7";
const REDIRECT_URI = "http://localhost:8888/spotify/callback";
const SCOPE =
  "user-read-private user-read-email playlist-read-private playlist-read-collaborative user-library-read user-top-read user-read-recently-played user-follow-read user-follow-modify user-read-playback-state user-modify-playback-state user-read-playback-position user-read-currently-playing playlist-read-private playlist-modify-private playlist-modify-public";

router.get("/auth", async (req, res) => {
  const state = generateRandomString(16);
  req.session.state = state;
  const authURL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&state=${state}`;
  res.redirect(authURL);
});

router.get("/token", async (req, res) => {
  const token = req.session[STREAMER]?.token;
  if (!token) {
    res.status(404).json("Streamer did not auth yet.");
    return;
  }

  res.status(200).json({ token });
});

router.get("/callback", async (req, res) => {
  const { code, state } = req.query;
  const storedState = req.session.state;
  if (state !== storedState) {
    res.redirect("/error");
    return;
  }

  const tokenResponse = await axios.post(
    "https://accounts.spotify.com/api/token",
    `grant_type=authorization_code&code=${code}&redirect_uri=${REDIRECT_URI}`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${CLIENT_ID}:${CLIENT_SECRET}`
        ).toString("base64")}`,
      },
    }
  );

  const accessToken = tokenResponse.data.access_token;
  req.session[STREAMER] = { token: accessToken };
  res.redirect(`${process.env.FRONTEND_BASE_URI}${req.session.redirect}`);
});

function generateRandomString(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

module.exports = router;

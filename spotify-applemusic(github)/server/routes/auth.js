const express = require("express");
const router = express.Router();

const authApis = {
  Spotify: "http://localhost:8888/Spotify/auth",
  Apple: "http://localhost:8888/Apple/auth",
};

router.get("/", (req, res) => {
  const { streamer, redirect } = req.query;

  if (!req.session[streamer]) {
    req.session[streamer] = {};
  }

  req.session.redirect = redirect;
  res.redirect(authApis[streamer]);
});

module.exports = router;
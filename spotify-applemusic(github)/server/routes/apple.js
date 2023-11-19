const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const fs = require("fs");

const STREAMER = "Apple";
const PRIVATE_KEY = fs.readFileSync("AuthKey_FL3PM9DXWX.p8").toString();
const TEAM_ID = "A4VBZCQY97";
const KEY_ID = "FL3PM9DXWX";

router.get("/auth", async (req, res) => {
  const accessToken = generateToken();
  const redirect = req.session.redirect;
  req.session[STREAMER] = { token: accessToken };
  res.redirect(`${process.env.FRONTEND_BASE_URI}${redirect}`);
});

router.get("/token", async (req, res) => {
  const token = req.session[STREAMER]?.token;
  if (!token) {
    res.status(404).json("Streamer did not auth yet.");
    return;
  }

  res.status(200).json({ token });
});

const generateToken = () => {
  const claims = {
    iss: TEAM_ID,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 86400 * 180,
  };

  return jwt.sign(claims, PRIVATE_KEY, {
    algorithm: "ES256",
    header: {
      alg: "ES256",
      kid: KEY_ID,
    },
  });
};

module.exports = router;

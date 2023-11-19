
const express = require('express');
const router = express.Router();


const ROUTES = ['source', 'dest'];

const authApis = {
    Spotify: 'http://localhost:8888/spotify/auth',
    Apple: 'http://localhost:8888/apple/auth'
}

router.post('/:route', (req, res) => {
    const { streamer, redirect } = req.body;
    const authURL = authApis[streamer];
    req.session.redirect = redirect;

    const routeParam = req.params.route;

    if (!ROUTES.includes(routeParam)) {
        return res.status(400).json({ error: 'Invalid route specified' });
    }

    if (!req.session.streamers) {
        req.session.streamers = {};
    }

    req.session[routeParam] = streamer;
    req.session.streamers = {
        ...req.session.streamers,
        [streamer]: {
            auth: {}
        }
    };

    res.json({ authURL });
});

router.get('/:route', (req, res) => {
    const routeParam = req.params.route;

    if (!ROUTES.includes(routeParam)) {
        return res.status(400).json({ error: 'Invalid route specified' });
    }

    console.log(req.session);
    const streamer = req.session[routeParam];
    if (!req.session.streamers[streamer]) {
        return res.status(404).json('Streamer did not auth yet.');
        
    }

    res.status(200).json(req.session.streamers[streamer]);
});

module.exports = router;

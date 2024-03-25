var express = require('express');
var router = express.Router();

const location_controller = require("../controllers/locationController");

const user_controller = require("../controllers/userController");

router.post("/checkcoordinate", verifyToken, location_controller.check_coordinate);

router.post("/startTimer", location_controller.start_timer);

router.post("/addLeaderboard", verifyToken, user_controller.add_user);

router.get("/leaderboard/:id", user_controller.leaderboard);

function verifyToken(req, res, next) {
    // Get auth header value 
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.json('Missing Token')
    }
}

module.exports = router;

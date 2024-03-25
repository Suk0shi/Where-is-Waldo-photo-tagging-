const { body, validationResult } = require("express-validator");
const Location = require("../models/locations");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
require('dotenv').config();

// exports.get_location = asyncHandler(async (req, res, next) => {
//     const location = await Location.findOne({level: req.body.level }).exec();
//     if (!location) return res.sendStatus(400);
    
// });  

exports.check_coordinate = 
[
    body("level", "location must be specified")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("target", "target must be specified")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("x", "x must be specified")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("y", "y must be specified")
      .trim()
      .isLength({ min: 1 })
      .escape(),

      asyncHandler(async (req, res, next) => {
        // if (!errors.isEmpty()) {
        //     return res.status(400).json(errors);
        // }
        const location = await Location.findOne({level: req.body.level }).exec();
        const target = req.body.target;
        const correctTarget = location[target]
            
        //split correctTarget at the space and turn into numbers 
        //correctX and correctY
        const [correctX, correctY] = correctTarget.split(' ')
        

        //check if req.body.x and req.body.y are within .08 of the correct values
        if ((req.body.x > (+correctX -0.01)) && (req.body.x < (+correctX +0.01))
          &&
          (req.body.y > (+correctY -0.01)) && (req.body.y < (+correctY +0.02))) {
          jwt.verify(req.token, `${process.env.JWT_KEY}`,async (err, authData) => {
            if(err) {
              res.json('Token Check Failed')
            } else { 
                //if hits === 4 end game and calculate and save time 
                if (+authData.hits > 2) {
                  const finTime = (Date.now() - authData.time)/1000
                  const users = await User.find({level: authData.level}).sort('time').limit(10).populate("time").exec();
                  if (users.length < 10) {
                    //add to leaderboard 
                    jwt.sign({level: authData.level, time: finTime}, `${process.env.JWT_KEY}`, (err, token) => {
                      res.json({leaderboard: true, message:`You did it in ${finTime} seconds` ,token:token})
                    });
                  } else {
                    if (users.some(time => +time.time > +finTime)) {
                      //add to leaderboard 
                      jwt.sign({level: authData.level, time: finTime}, `${process.env.JWT_KEY}`, (err, token) => {
                        res.json({leaderboard: true, message:`You did it in ${finTime} seconds` ,token:token})
                      });
                    } else {
                      res.json({complete: true, message:`You did it in ${finTime} seconds`})
                    }
                  }
                } else {
                  //else return a new token with the date variable and how many hits we have
                  jwt.sign({time: authData.time, hits: (+authData.hits + 1), level: authData.level}, `${process.env.JWT_KEY}`, (err, token) => {
                    res.json(
                      token
                    );
                  });
                }
            }})
        } else {
          res.json('miss');
        }
    })
]

exports.start_timer = 
[
    body("level", "location must be specified")
      .trim()
      .isLength({ min: 1 })
      .escape(),

      asyncHandler(async (req, res, next) => {
        jwt.sign({time: Date.now(), hits: 0, level:req.body.level}, `${process.env.JWT_KEY}`, (err, token) => {
          res.json({
            token: token, level: req.body.level
          });
        });
    })
]
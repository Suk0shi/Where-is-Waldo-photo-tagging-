const { body, validationResult } = require("express-validator");
const Location = require("../models/locations");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.add_user = 
[
    body("username", "username must be specified")
      .trim()
      .isLength({ min: 3 })
      .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.json('Invalid Username')
        } else {
            jwt.verify(req.token, `${process.env.JWT_KEY}`,async (err, authData) => {
                if(err) {
                  res.json('Invalid Token')
                } else {
                    const users = await User.find().sort('-time').populate("_id").exec();
                    const slowestUser = await User.findOne().sort('-time').populate("_id").exec();
    
                    const user = new User({
                        level: authData.level,
                        username: req.body.username,
                        time: authData.time,
                    })
    
                    await user.save();
                    if (users.length > 10) {
                        await User.findByIdAndDelete(slowestUser);
                    }
                    res.json("Leaderboard Updated")
                }
            })
        }
    })
]

exports.leaderboard = asyncHandler(async (req, res, next) => {
    
    const leaderboard = await User.find({level: req.params.id}).sort('time').exec();
  
    if (leaderboard === null) {
      // No results.
      const err = new Error("Post not found");
      err.status = 404;
      return next(err);
    }

    res.json({
        leaderboard
    });
  
});
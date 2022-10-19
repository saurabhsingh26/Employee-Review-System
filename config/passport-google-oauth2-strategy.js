const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: "429753906139-27ec6vp0ffh13mmjhk8jvr954de4jrnk.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL: "http://localhost:9000/users/auth/google/callback",
    },

    function(accessToken, refreshToken, profile, done){
        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){console.log('error in google strategy-passport',err); return}

            // console.log(profile);

            if(user){
                // if found, set this user as req.user(sign in)
                return done(null, user);
            }else{
                // if not found, create the user and set as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex'),
                    isAdmin:'false'
                }, function(err, user){
                    if(err){console.log('error in creating user google strategy-passport',err); return}

                    return done(null, user);
                });
            }
        });
    }
));


module.exports = passport
// module.exports = function
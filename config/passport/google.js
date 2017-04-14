let config = require('../index.js').google;
let mongoose = require('mongoose');
let User = mongoose.model('User');

let GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = new GoogleStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL
  },
  function (accessToken, refreshToken, profile, done) {
    User.findOne({ 'google.id': profile.id }, function (err, user) {
      if (err) return done(err);
      if (user) {
        return done(null, user);
      }
      else {
        // create a new user and save to datavase
        let newUser = new User();

        newUser.google.id    = profile.id;
        newUser.google.token = accessToken;
        newUser.google.name  = profile.displayName;
        newUser.google.email = profile.emails[0].value;

        newUser.save(function (err) {
          if (err)
            throw err;
          return done(null, user);
        });
      }
    });
  });

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
        let user = new User();

        user.google.id    = profile.id;
        user.google.token = accessToken;
        user.google.name  = profile.displayName;
        user.google.email = profile.emails[0].value;

        user.save(function (err) {
          if (err)
            throw err;
          return done(null, user);
        });
      }
    });
  });

'use strict';

/**
 * Module dependencies.
 */

const home = require('../app/controllers/home');
const initializeApi = require('../app/api');
const config = require('./index.js');

/**
 * Expose
 */

module.exports = function (app, passport) {

  initializeApi(app);

  app.get('/', home.index);

  // login with google routes
  app.get('/auth/google', passport.authenticate('google', { scope: config.google.scope }));

  app.get('/auth/google/callback',
    passport.authenticate('google', {
                                      failureRedirect: '/',
                                      successRedirect: '/'
                                     })
  );

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  }
  );

  /**
   * Error handling
   */

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });
};

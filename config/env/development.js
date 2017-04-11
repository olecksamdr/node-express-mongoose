
/**
 * Expose
 */

module.exports = {
  db: 'mongodb://localhost/your_project_development',
  facebook: {
    clientID: 'APP_ID',
    clientSecret: 'SECRET',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    scope: [
      'email',
      'user_about_me',
      'user_friends'
    ]
  },
  google: {
    clientID: '173705655599-5h78tugc3iim4o2nvp9epk0qkbeokfuh.apps.googleusercontent.com',
    clientSecret: 'aw1r0NdlHRNIh-zwdx-VZaye',
    callbackURL: 'http://localhost:3000/auth/google/callback',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.google.com/m8/feeds',
    ]
  }
};

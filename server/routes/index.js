var passport = require('passport');
var express = require('express');
var router = express.Router();
var users = require('./users');

module.exports = function (app) {

  //Handle login requests
  router.route('/login')
    .post(passport.authenticate('local-login'),
      function (req, res) {
        console.log(req);
        res.send({message: 'Logged in'});
      });

  //Handle logout
  router.route('/logout')
    .get(function (req, res) {
      req.logout();
      res.end();
    });

  //Test login
  /*router.get('/logged', function (req, res) {
   res.json({
   req: req.isAuthenticated()
   });
   });*/

  //Expose Users API
  router.use('/', users);

  router.route('*')
    .get(function (req, res) {
      // this route will respond to all requests with the contents of your index
      // template. Doing this allows react-router to render the view in the app.
      res.render('index.html');
    });

  app.use('/', router);
};

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

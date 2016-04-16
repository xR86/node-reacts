var passport = require('passport');
var express = require('express');
var router = express.Router();
var users = require('./users');
var exams = require('./exams');
var chat = require('../config/chat');

module.exports = function (app) {

  //Handle login requests
  router.route('/login')
    .post(passport.authenticate('local-login'),
      function (req, res) {
        res.send({
          authenticated : req.isAuthenticated(),
          user: req.user ? req.user : null
        });
      });

  router.route('/login/facebook')
    .get(passport.authenticate('facebook', {scope: ['email']}));

  router.route('/login/facebook/callback')
    .get(passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));

  /*router.route('/login/facebook/success')
    .get(function (req, res) {
      res.send({message: 'Logged in.', user: req.user});
    });*/

  //Handle logout
  router.route('/logout')
    .get(function (req, res) {
      chat.deleteSocket(req.user.email);
      req.logout();
      res.end();
    });

  //Test login

  //Expose session ping mechanism
  router.get('/logged', function (req, res) {
    res.json({
      authenticated : req.isAuthenticated(),
      user: req.user ? req.user : null
    });
  });
  //Expose Users API
  router.use('/users', users);
  //Expose Exams API
  //We need to be logged in for accessing it
  router.use('/exams', isAuthenticated, exams);

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
  res.status(401);
  res.send({message: 'Not logged in.'})
}

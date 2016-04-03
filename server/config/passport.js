var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var FacebookStrategy = require('passport-facebook');
var User = require('../model/userModel');

//Optained from Facebook
var FACEBOOK_APP_ID = 1710153845869897;
var FACEBOOK_APP_SECRET = '18cb2f235bffef5539eb6884ee97310e';

module.exports = function (app) {
  //Setup passport
  app.use(session({
    secret: 'some secret string to protect the session',
    resave: false,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    })
  });

  //Set up the Local authentication strategy
  passport.use('local-login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function (req, email, password, done) {
      //Find the user by email
      User.findOne({'email': email}, function (err, user) {
        if (err) {
          return done(null, false, err);
        }
        if (!user) {
          return done(null, false, {message: 'User not found'});
        }
        if (!user.checkPassword(password)) {
          return done(null, false, {message: 'Wrong password'});
        }
        return done(null, user);
      })
    }
  ));

  //Setup Facebook authentication strategy
  passport.use('facebook', new FacebookStrategy({
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:3000/login/facebook/callback",
      profileFields: ['id', 'emails', 'name']
    },
    function (accessToken, refreshToken, profile, done) {
      //Search for existing user
      //profile.id = UserModel.facebookId
      User.findOne({facebookId: profile.id, email: profile.emails[0].value}, function (err, user) {
        if (err) {
          console.log('Find facebook user error:', err);
          return done(null, false, err);
        }

        if (!user) { //Register the new user

          var newUser = new User({
            email: profile.emails[0].value,
            facebookId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName
          });

          newUser.password = newUser.randomPasswordHashed();

          newUser.save(function (err, user) {
            if (err) {
              console.log('Saving facebook user error:', err);
              return done(null, false, err);
            }
            return done(null, user);
          });
        }

        return done(null, user);

      });
    }));
};

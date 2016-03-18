var express = require('express');
var router = express.Router();
var User = require('../model/userModel');

//Operations on the collection of users
router.route('/users')
  //Get all users
  .get(function (req, res){
    User.find( function (err, users) {
      if(err) {
        return res.send(err);
      }
      res.json(users);
    });
  })
  //Add a new user to the collection
  .post(function (req, res){
    var user = new User(req.body);

    user.save(function (err) {
      if(err) {
        return res.send(err);
      }
      return res.send('Success.');
    });
  });

//Operations on a single User
//query string example: /users/1234 (1234 is an Users's id)
router.route('/users/:id')
  //Get a single User
  .get(function(req, res) {
    User.findOne({_id: req.params.id}, function(err, user) {
      if(err) {
        return res.send(err);
      }
      res.json(user);
    });
  })
  //Update an existing user
  .put(function(req, res) {
    User.findOne({_id:req.params.id}, function(err, user) {
      if(err) {
        return res.send(err);
      }
      //Update the user with the received fields
      for(p in req.body) {
        user[p] = req.body[p];
      }

      //save the user
      user.save(function(err) {
        if(err) {
          return res.send(err);
        }
        res.json({message: 'User ' + req.params.id + ' successfuly updated'});
      });

    });
  })
  //Remove a user
  .delete(function(req, res) {
    User.remove({_id: req.params.id}, function(err) {
      if(err) {
        return res.send(err);
      }
      res.json({message: 'User ' + req.params.id + ' deleted'});
    });
  });

module.exports = router;

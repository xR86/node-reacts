var express = require('express');
var router = express.Router();
var User = require('../model/userModel');
var Exam = require('../model/examModel');

//Operations on the collection of users
router.route('/')
  //Get all users
  .get(function (req, res) {

    //Process query params
    var query = {};
    var queryString = req.query;
    if (queryString) {
      //year query param
      if (queryString.year) {
        query.year = queryString.year;
      }
      //share query param
      if (queryString.share) {
        query.sharingIntention = queryString.share;
      }
      //copy query param
      if (queryString.copy) {
        query.copyingIntention = queryString.copy;
      }
      //exams query param. this is a comma separated list
      if (queryString.exams) {
        var exams = queryString.exams.split(',');
        query.examList = {'$elemMatch': {'exam': {'$in': exams}}};
      }
    }

    User.find(query, {password: 0, examList: 0}, function (err, users) {
      if (err) {
        return res.send(err);
      }
      res.json(users);
    });

  })
  //Add a new user to the collection
  .post(function (req, res) {
    var user = new User(req.body);
    user.password = user.hashPassword(req.body.password);

    user.save(function (err, user) {
      if (err) {
        return res.send(err);
      }
      if (!req.body.fillExams) {
        return res.json({message: "Successfully added new user.", data: user});
      }
      //Fill the exams list based on the users's information
      updateExamList(user, res);

    });
  });

//Operations on a single User
//query string example: /users/1234 (1234 is an Users's id)
router.route('/:id')
  //Get a single User
  .get(function (req, res) {
    User.findOne({_id: req.params.id}, function (err, user) {
      if (err) {
        return res.send(err);
      }
      res.json(user);
    });
  })
  //Update an existing user
  .put(function (req, res) {
    User.findOne({_id: req.params.id}, function (err, user) {
      if (err) {
        return res.send(err);
      }
      //Update the user with the received fields
      for (p in req.body) {
        user[p] = req.body[p];
      }

      //save the user
      user.save(function (err) {
        if (err) {
          return res.send(err);
        }
        res.json({message: 'User ' + req.params.id + ' successfuly updated'});
      });

    });
  })
  //Remove a user
  .delete(function (req, res) {
    User.remove({_id: req.params.id}, function (err) {
      if (err) {
        return res.send(err);
      }
      res.json({message: 'User ' + req.params.id + ' deleted'});
    });
  });

router.route('/:id/exams').get(function (req, res) {
  User.findOne({_id: req.params.id}, {examList: 1})
    .populate('examList.exam')
    .exec(function (err, user) {
      if (err) {
        return res.send(err);
      }
      res.json(user);
    });
});

//Automatically fill the exams list for a user
var updateExamList = function (user, res) {
  Exam.find({year: {$lte: user.year}, optional: false}, {_id: 1}, function (err, examsList) {

    for (e in examsList) {
      user.examList.push({
        exam: examsList[e].id
      });
    }

    user.save(function (err, u) {
      if (err) {
        return res.send(err);
      }
      return res.json({
          message: 'Successfuly added user ' + u.id + '.',
          data: u
        }
      );
    });

  });
};

module.exports = router;

var Server = require('socket.io');
var log = require('./logger');

var sockets = {};
var pending = {};

module.exports = function (server) {

  var io = new Server(server);

  io.on('connection', function (socket) {

    socket.on('register', function (msg) {
      //Inform new user about who is logged in
      socket.emit('online-users', Object.keys(sockets));

      //Add user's socket
      sockets[msg.user] = socket;

      //Did I missed any messages?
      if (pending[msg.user]) {

        log.info('We have pending messages for user %s .', msg.user);

        //Send all pending messages to the new user
        for (p in pending[msg.user]) {
          log.info(p);
          sockets[msg.user].emit(msg.user, pending[msg.user][p]);
        }
        //Reset the pending messages. No more messages for me
        delete pending[msg.user];
      }

      //Inform all users that new user is online
      socket.broadcast.emit('user-online', {user: msg.user});

    });

    socket.on('send-message', function (msg) {
      if (sockets[msg.receiver]) {

        log.info('Mesage from user %s to user %s .', msg.sender, msg.receiver);
        sockets[msg.receiver].emit(msg.receiver, msg);

      } else {

        log.info('Message added to pending, since user %s is not logged in.', msg.receiver);
        if (!pending[msg.receiver]) {
          pending[msg.receiver] = [];
        }
        pending[msg.receiver].push(msg);

      }
    });
  });
};

module.exports.deleteSocket = function (user) {
  delete sockets[user];
}

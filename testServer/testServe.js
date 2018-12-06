



var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function (req, res) {
  res.sendFile(__dirname + ('/index.html'));
});


io.on('connection', function(socket){
  //console.log('a user connected');

  var hs = socket.handshake;

  sessionStore.get(hs.sessionID, function(err, session){
    console.log("SESSION: " + util.inspect(session));

    clients[socket.id] = socket; // add the client data to the hash
    validUsers[session.username] = socket.id; // connected user with its socket.id
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });




});

http.listen(3000,function(){
	console.log('listening on *:3000');
});

/*
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
*/

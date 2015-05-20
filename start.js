var debug = require('debug')('where');
var http = require('http');
var app = require('./app');

var tweets = require('./src/tweets.js');

app.set('port', process.env.PORT || 3000);


/*
var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
*/

var server = http.createServer(app);
var io = require('socket.io').listen(server);

io.on('connection', function(socket){
  console.log("connected");
  tweets.getTweets(io);
});
server.listen(app.get('port'), function(){
  debug('Express server listening on port ' + server.address().port);
});

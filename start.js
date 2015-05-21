var debug = require('debug')('where');
var http = require('http');
var app = require('./app');

var tweets = require('./src/tweets.js');
var util = require('./src/utils.js');

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
  socket.emit('location req',{});
  socket.on('location send',function(location){
    var coords = [location.coords.latitude,location.coords.longitude];
    boundingBox = util.getBoundingBox(coords,1);
    tweets.getTweets(socket,boundingBox);


  });

});
server.listen(app.get('port'), function(){
  debug('Express server listening on port ' + server.address().port);
});

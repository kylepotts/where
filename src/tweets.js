var Twit = require('twit');
var T = new Twit({
  consumer_key:'XB0o3QaDapYFRO2jVVX1WWjke',
  consumer_secret:'LszGTJLkM1ofG9I7w6GLV2kCETkhWlHTIzHt6oLE4E6GIXUKX0',
  access_token: '14214852-YwpB58wcz5Pctgx96b7x9TLirvjhEDWc2wKK9hC0M',
  access_token_secret: 'E7KYneuwPrLIe5Wqkhst9wyw4HR64lqzk6uuiBioYqI77'
});



function getTweets(io){
  var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ];
  var stream = T.stream('statuses/filter', { locations: sanFrancisco });
  stream.on('tweet',function(tweet){
    io.emit('new tweet',tweet);
  });
}

module.exports.getTweets = getTweets;

var socket = io.connect('http://localhost:8000');


// return a smaller object with just the information I am interested in
function parseTweet(tweet){
  var parsedTweet = {};
  parsedTweet.text = tweet.text;
  parsedTweet.date = tweet.created_at;
  parsedTweet.name = tweet.user.name;
  parsedTweet.screenname = tweet.user.screen_name;
  parsedTweet.imageUrl = tweet.user.profile_image_url;
  return parsedTweet;
}


var TweetList = React.createClass({
  render:function(){
    var tweetsComp = this.props.tweets.map(function(tweet){
      var sname = " @"+tweet.screenname;
      var link = "http://www.twitter.com/"+tweet.screenname;
      return (
        <div className="tweet-wrapper">
        <div className="panel panel-default">
          <div className="panel-heading text-left">
              <div className="tweetNameHeader">
                <div className="username">
                  <strong className="left-block">{tweet.name}</strong><a href={link}>{sname}</a>
                </div>
              </div>
          </div>
          <div className="panel-body">
              <div className="row">
                <div className="col-md-2 imageCol">
                  <img className="img-rounded" src={tweet.imageUrl}></img>
                </div>
                <div className="col-md-10 textCol">
                  {tweet.text}
                </div>
              </div>
          </div>
        </div>
      </div>
      );
    });
    return (
      <div className="tweetList">
        {tweetsComp}
      </div>
    );
  }
});


var TweetBox = React.createClass({
  getInitialState:function(){
    socket.on('new tweet',this.newTweet);
    return{tweets:[]}
  },
  newTweet: function(tweet){
    console.log(tweet)
    var prevTweets = this.state.tweets;
    prevTweets.unshift(parseTweet(tweet));
    this.setState({tweets:prevTweets});
  },
  render:function(){
    return (
      <div className="tweetBox">
        <TweetList tweets={this.state.tweets}></TweetList>

      </div>
    );
  }
});

React.render(<TweetBox/>,document.getElementById('left'));




function onGeoSuccess(location){
  console.log(location);
  socket.emit('location send',location);
  console.log('end emit');
}

function onGeoError(err){
  console.log(err);
}

window.onload = function(){
  socket.on('location req',function(data){
    console.log('loc req');
    var html5Options = { enableHighAccuracy: true, timeout: 6000, maximumAge: 0 };
    geolocator.locate(onGeoSuccess, onGeoError, true, html5Options);

  });


};

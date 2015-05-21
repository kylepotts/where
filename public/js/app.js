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


var TweetList = React.createClass({displayName: "TweetList",
  render:function(){
    var tweetsComp = this.props.tweets.map(function(tweet){
      var sname = " @"+tweet.screenname;
      var link = "http://www.twitter.com/"+tweet.screenname;
      return (
        React.createElement("div", {className: "tweet-wrapper"}, 
        React.createElement("div", {className: "panel panel-default"}, 
          React.createElement("div", {className: "panel-heading text-left"}, 
              React.createElement("div", {className: "tweetNameHeader"}, 
                React.createElement("div", {className: "username"}, 
                  React.createElement("strong", {className: "left-block"}, tweet.name), React.createElement("a", {href: link}, sname)
                )
              )
          ), 
          React.createElement("div", {className: "panel-body"}, 
              React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col-md-2 imageCol"}, 
                  React.createElement("img", {className: "img-rounded", src: tweet.imageUrl})
                ), 
                React.createElement("div", {className: "col-md-10 textCol"}, 
                  tweet.text
                )
              )
          )
        )
      )
      );
    });
    return (
      React.createElement("div", {className: "tweetList"}, 
        tweetsComp
      )
    );
  }
});


var TweetBox = React.createClass({displayName: "TweetBox",
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
      React.createElement("div", {className: "tweetBox"}, 
        React.createElement(TweetList, {tweets: this.state.tweets})

      )
    );
  }
});

React.render(React.createElement(TweetBox, null),document.getElementById('left'));




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

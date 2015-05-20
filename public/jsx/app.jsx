var socket = io.connect('http://localhost:8000');

var tdat = {"created_at":"Tue May 19 03:45:59 +0000 2015","id":600507666176192500,"id_str":"600507666176192512","text":"@KPLynne thank you so much for the support, please leave me a review!!","source":"<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>","truncated":false,"in_reply_to_status_id":null,"in_reply_to_status_id_str":null,"in_reply_to_user_id":175751842,"in_reply_to_user_id_str":"175751842","in_reply_to_screen_name":"KPLynne","user":{"id":2940105241,"id_str":"2940105241","name":"Tom Colosi","screen_name":"tomcolosi","location":"Santa Cruz","url":"http://www.amazon.com/dp/B00R13R976","description":"Tom Colosi is a children's book author, he wrote Tommy the Wishing Turtle and is currently working on an aviation children's book.","protected":false,"verified":false,"followers_count":1349,"friends_count":97,"listed_count":16,"favourites_count":17479,"statuses_count":96,"created_at":"Tue Dec 23 00:06:17 +0000 2014","utc_offset":null,"time_zone":null,"geo_enabled":true,"lang":"en","contributors_enabled":false,"is_translator":false,"profile_background_color":"C0DEED","profile_background_image_url":"http://abs.twimg.com/images/themes/theme1/bg.png","profile_background_image_url_https":"https://abs.twimg.com/images/themes/theme1/bg.png","profile_background_tile":false,"profile_link_color":"0084B4","profile_sidebar_border_color":"C0DEED","profile_sidebar_fill_color":"DDEEF6","profile_text_color":"333333","profile_use_background_image":true,"profile_image_url":"http://pbs.twimg.com/profile_images/576432200389820416/knKCK3Z4_normal.jpeg","profile_image_url_https":"https://pbs.twimg.com/profile_images/576432200389820416/knKCK3Z4_normal.jpeg","profile_banner_url":"https://pbs.twimg.com/profile_banners/2940105241/1419302464","default_profile":true,"default_profile_image":false,"following":null,"follow_request_sent":null,"notifications":null},"geo":null,"coordinates":null,"place":{"id":"4bbbc7799291b1cd","url":"https://api.twitter.com/1.1/geo/id/4bbbc7799291b1cd.json","place_type":"city","name":"Rio del Mar","full_name":"Rio del Mar, CA","country_code":"US","country":"United States","bounding_box":{"type":"Polygon","coordinates":[[[-121.906598,36.93643],[-121.906598,36.9754766],[-121.86257,36.9754766],[-121.86257,36.93643]]]},"attributes":{}},"contributors":null,"retweet_count":0,"favorite_count":0,"entities":{"hashtags":[],"trends":[],"urls":[],"user_mentions":[{"screen_name":"KPLynne","name":"K.P. Lynne","id":175751842,"id_str":"175751842","indices":[0,8]}],"symbols":[]},"favorited":false,"retweeted":false,"possibly_sensitive":false,"filter_level":"low","lang":"en","timestamp_ms":"1432007159166"}

function test_tweet(){
  var s = JSON.stringify(parseTweet(tdat));
  return (
    <Comment author="Kyle">
      {s}
    </Comment>
  )
}

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


var CommentList = React.createClass({
  render: function() {
    var commentNodes = test_tweet();
    /*
    console.log("data="+this.props.data);
    var commentNodes = this.props.data.map(function(comment){
      var s = JSON.stringify(comment);
      return (
        <Comment author="Kyle">
        {s}
        </Comment>
      );
    });
    */

    return (
      <div className="commentList">
    {commentNodes}
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
      <h2 className="commentAuthor">
    {this.props.author}
    </h2>
  {this.props.children}
  </div>
);
}
});

var CommentBox = React.createClass({
  getInitialState: function(){
    //socket.on('new tweet',this.newTweet);
    return {data:[]};
  },
  newTweet: function(tweet){
    //console.log(tweet);
    var prevTweets = this.state.data;
    prevTweets.unshift(tweet);
    this.setState({data:prevTweets});
  },
  render: function(){
    return (
      <div className="commentBox">
      <CommentList data={this.state.data}/>
    </div>
    );
  }
});



React.render(
  <CommentBox/>,
document.getElementById('content')
);

var TweetImage = React.createClass({
  render:function(){
      return(
        <img src={this.props.imageUrl}></img>
      );
  }
});

var TweetNameHeader = React.createClass({
  render:function(){
    var sname = " @"+this.props.screenname
    return (
      <div className="tweetNameHeader">
        <strong>{this.props.name}</strong>{sname}
          <br>
            {this.props.text}
          </br>
      </div>
    );
  }
});

var TweetList = React.createClass({
  render:function(){
    var tweetsComp = this.props.tweets.map(function(tweet){
      return (
        <div>
        <div className="tweet">
          <div className="tweetImage" id="user_image">
            <TweetImage imageUrl={tweet.imageUrl}></TweetImage>
          </div>
          <div id="user_header">
            <TweetNameHeader name={tweet.name} screenname={tweet.screenname} text={tweet.text}></TweetNameHeader>
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
}

function onGeoError(err){
  console.log(err);
}

window.onload = function(){
  var html5Options = { enableHighAccuracy: true, timeout: 6000, maximumAge: 0 };
  geolocator.locate(onGeoSuccess, onGeoError, true, html5Options);
};

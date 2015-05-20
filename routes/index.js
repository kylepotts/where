var express = require('express');
var router = express.Router();

//var tweets = require('../src/tweets.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home');
});


router.get('/app', function(req,res){
  res.render('app');
});


router.get('/comments.json',function(req,res){
  res.json(
    [
      {
        "author": "Pete Hunt",
        "text": "Hey there!"
      },
      {
        "author":"Kyle Potts",
        "text": "I am Kyle"

      }
    ]
  );
});

module.exports = router;

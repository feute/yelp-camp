var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.send('landing page');
});

app.listen(port, function() {
  console.log('Yelp Camp started');
});

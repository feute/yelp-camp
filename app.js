var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('landing');
});

app.get('/campgrounds', function(req, res) {
  var campgrounds = [
    { name: 'Salmon Creek', image: 'https://images.unsplash.com/photo-1519395612667-3b754d7b9086?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2408b72d00a5efaf0f2e14d02f144790&auto=format&fit=crop&w=500&q=60' },
    { name: 'Granite Hill', image: 'https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=343c64df1b43f50769656d03c2b9f523&auto=format&fit=crop&w=500&q=60' },
    { name: 'Mountain Goat\'s Rest', image: 'https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5cedc6b95f731395da7269d2341f9a5e&auto=format&fit=crop&w=500&q=60' }
  ];

  res.render('campgrounds', { campgrounds: campgrounds });
});

app.listen(port, function() {
  console.log('Yelp Camp started');
});

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var campgrounds = [
  { name: 'Salmon Creek', image: 'https://images.unsplash.com/photo-1519395612667-3b754d7b9086?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2408b72d00a5efaf0f2e14d02f144790&auto=format&fit=crop&w=500&q=60' },
  { name: 'Granite Hill', image: 'https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=343c64df1b43f50769656d03c2b9f523&auto=format&fit=crop&w=500&q=60' },
  { name: 'Mountain Goat\'s Rest', image: 'https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5cedc6b95f731395da7269d2341f9a5e&auto=format&fit=crop&w=500&q=60' }
];

app.get('/', function(req, res) {
  res.render('landing');
});

app.get('/campgrounds', function(req, res) {

  res.render('campgrounds', { campgrounds: campgrounds });
});

app.post('/campgrounds', function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = { name: name, image: image };

  campgrounds.push(newCampground);

  res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res) {
  res.render('new');
});

app.listen(port, function() {
  console.log('Yelp Camp started');
});

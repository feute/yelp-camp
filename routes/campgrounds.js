var express = require('express');

var Campground = require('../models/campground');
var middleware = require('../middleware');

var router = express.Router();

// List of campgrounds.
router.get('/', function(req, res) {
  Campground.find({}, function(err, campgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/index', { campgrounds: campgrounds });
    }
  });
});

// Create campground.
router.post('/', middleware.isLoggedIn, function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = { name: name, image: image, description: desc, author: author };

  Campground.create(newCampground, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/campgrounds');
    }
  });
});

// Show new campground form.
router.get('/new', middleware.isLoggedIn, function(req, res) {
  res.render('campgrounds/new');
});

// Show individual campground.
router.get('/:id', function(req, res) {
  Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      console.log(foundCampground);
      res.render('campgrounds/show', { campground: foundCampground });
    }
  });
});

router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    res.render('campgrounds/edit', { campground: campground });
  });
});

router.put('/:id', middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
    if (err) {
      res.redirect('/campgrounds');
    } else {
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});

router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect('/campgrounds');
    } else {
      res.redirect('/campgrounds');
    }
  });
});

module.exports = router;

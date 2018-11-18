var express = require('express');
var passport = require('passport');

var User = require('../models/user');

var router = express.Router();

// Index route.
router.get('/', function(req, res) {
  res.render('landing');
});

// Show register form.
router.get('/register', function(req, res) {
  res.render('register');
});

// Register a user from form data.
router.post('/register', function(req, res) {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('/register');
    }
    passport.authenticate('local')(req, res, function() {
      req.flash('success', 'Welcome to YelpCamp');
      res.redirect('/campgrounds');
    });
  });
});

// Show login form.
router.get('/login', function(req, res) {
  res.render('login');
});

// Authenticate user from form data.
router.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  failureRedirect: '/login'
}), function(req, res) {
});

// Log out user.
router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'Logged you out');
  res.redirect('/campgrounds');
});

module.exports = router;

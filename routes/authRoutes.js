const express = require('express');
const passport = require('passport');
const ensureAuthenticated = require('../middleware/auth');

const router = express.Router();

// Start Google authentication
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

// Google callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/failed'
  }),
  (req, res) => {
    res.redirect('/auth/profile');
  }
);

// Show the authenticated user
router.get('/profile', ensureAuthenticated, (req, res) => {
  return res.status(200).json({
    message: 'Authenticated successfully.',
    user: req.user
  });
});

// Authentication failure
router.get('/failed', (req, res) => {
  return res.status(401).json({
    message: 'Google authentication failed.'
  });
});

// Log out and delete the session
router.get('/logout', ensureAuthenticated, (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    req.session.destroy((error) => {
      if (error) {
        return next(error);
      }

      res.clearCookie('connect.sid');

      return res.status(200).json({
        message: 'Logged out successfully.'
      });
    });
  });
});

module.exports = router;
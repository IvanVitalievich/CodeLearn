const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport'); // Добавьте эту строку

exports.register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    
    const lastUser = await User.findOne().sort('-userId');
    const userId = lastUser ? lastUser.userId + 1 : 2;

    const user = await User.create({
      userId,
      email,
      password,
      firstName,
      lastName
    });

    const token = user.generateAuthToken();
    
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Google Auth функции только если настроены credentials
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  exports.googleAuth = passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  });

  exports.googleAuthCallback = passport.authenticate('google', { 
    failureRedirect: '/login' 
  }), (req, res) => {
    const token = req.user.generateAuthToken();
    res.cookie('jwt', token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' 
    });
    res.redirect('/');
  };
} else {
  exports.googleAuth = (req, res) => res.status(501).json({ error: 'Google auth not configured' });
  exports.googleAuthCallback = (req, res) => res.status(501).json({ error: 'Google auth not configured' });
}
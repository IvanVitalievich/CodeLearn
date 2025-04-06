const authMiddleware = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Регистрация
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const user = new User({ email, password, firstName, lastName });
    await user.save();
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('jwt', token, { httpOnly: true, maxAge: 86400000 });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Вход
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Неверные учетные данные' });
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('jwt', token, { httpOnly: true, maxAge: 86400000 });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { 
  failureRedirect: '/login',
  session: false 
}), (req, res) => {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.cookie('jwt', token, { httpOnly: true, maxAge: 86400000 });
  res.redirect('/');
});

// Проверка авторизации
router.get('/check', async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.json({ isAuthenticated: false });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    res.json({ 
      isAuthenticated: !!user,
      user: user ? { firstName: user.firstName, avatar: user.avatar } : null
    });
  } catch {
    res.json({ isAuthenticated: false });
  }
});

// Получение данных пользователя
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Выход
router.post('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.json({ success: true });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const User = require('../models/User');

// Получение данных текущего пользователя
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Обновление прогресса пользователя
router.post('/progress', auth, async (req, res) => {
  try {
    const { course, lesson, score } = req.body;
    const user = await User.findById(req.user.id);
    
    if (!user.progress[course]) {
      user.progress[course] = {};
    }
    
    user.progress[course][lesson] = score;
    await user.save();
    
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
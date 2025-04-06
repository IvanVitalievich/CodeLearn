const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    // 1. Получаем токен из куки или заголовка
    const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Не авторизован. Пожалуйста, войдите в систему.' 
      });
    }

    // 2. Проверяем токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Находим пользователя в базе
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ error: 'Пользователь не найден' });
    }

    // 4. Добавляем пользователя в запрос
    req.user = user;
    next();
  } catch (err) {
    console.error('Ошибка аутентификации:', err);
    res.status(401).json({ 
      error: 'Неверный или просроченный токен. Пожалуйста, войдите снова.' 
    });
  }
};

module.exports = authMiddleware;
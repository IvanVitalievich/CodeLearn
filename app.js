require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const authMiddleware = require('./middleware/auth');

// Инициализация
const app = express();

// Подключение к БД
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
require('./config/passport')(passport);

// Роуты
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/user', require('./routes/user'));

// Статические файлы
app.use(express.static(path.join(__dirname, 'public'), {
  extensions: ['html'],
  index: 'index.html'
}));

// Клиентские маршруты
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// После подключения cookieParser
app.use(passport.initialize());

// Использование (пример)
app.get('/api/protected-route', authMiddleware, (req, res) => {
  res.json({ message: 'Доступ разрешен', user: req.user });
});

// Подключаем Passport только если есть Google credentials
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  require('./config/passport')(passport);
} else {
  console.warn('Google OAuth disabled - missing credentials');
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
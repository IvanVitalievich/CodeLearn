const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected');
    
    // Создание администратора по умолчанию
    const User = require('../models/User');
    const adminExists = await User.findOne({ isAdmin: true });
    if (!adminExists) {
      const bcrypt = require('bcryptjs');
      await User.create({
        userId: 1,
        email: 'admin@coder-site.com',
        password: await bcrypt.hash('admin123', 12),
        firstName: 'Admin',
        lastName: 'System',
        isAdmin: true
      });
      
      console.log('Default admin created');
    }
  } catch (err) {
    console.error('DB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;

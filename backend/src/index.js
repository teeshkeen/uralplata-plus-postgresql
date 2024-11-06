const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config/default');
const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');
const categoriesRoutes = require('./routes/categories');
const { sequelize, User } = require('./config/database'); // Добавляем импорт User
const bcrypt = require('bcryptjs');

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api', productsRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API is working' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Что-то пошло не так!');
});

const PORT = process.env.PORT || 5001;

// Удаляем дублирующий код и оставляем только одну синхронизацию
sequelize.sync({ force: false })
  .then(async () => {
    console.log('Database synced');
    
    // Создаем администратора, если его еще нет
    const adminEmail = 'admin@example.com';
    const adminPassword = 'admin123';
    
    try {
      const existingAdmin = await User.findOne({ where: { email: adminEmail } });
      if (!existingAdmin) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);
        
        await User.create({
          username: 'Admin',
          email: adminEmail,
          password: hashedPassword
        });
        console.log('Admin user created successfully');
      }

      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    } catch (error) {
      console.error('Error creating admin user:', error);
    }
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

process.on('unhandledRejection', (err) => {
  console.log('Необработанная ошибка:', err);
});
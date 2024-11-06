const path = require('path');
module.exports = {
  port: process.env.PORT || 5001,
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret',
    expiresIn: '1h'
  },
  database: {
    name: process.env.DB_NAME || 'your_database_name',
    username: process.env.DB_USER || 'your_username',
    password: process.env.DB_PASSWORD || 'your_password',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
  },
  uploads: {
    path: 'uploads/',
    maxSize: 5 * 1024 * 1024,
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif']
  }
};
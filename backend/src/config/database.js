const Sequelize = require('sequelize');
const config = require('./default');

const sequelize = new Sequelize(config.database.name, config.database.username, config.database.password, {
  host: config.database.host,
  dialect: config.database.dialect,
  port: config.database.port,
  logging: console.log,
});

const Category = require('../models/Category')(sequelize, Sequelize.DataTypes);
const Product = require('../models/Product')(sequelize, Sequelize.DataTypes);
const User = require('../models/User')(sequelize, Sequelize.DataTypes);

// Определение связей
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

module.exports = {
  sequelize,
  Category,
  Product,
  User
};
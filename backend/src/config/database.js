const Sequelize = require('sequelize');
const config = require('./default');

const sequelize = new Sequelize(config.database.url, {
  dialect: config.database.dialect,
  dialectOptions: config.database.dialectOptions
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
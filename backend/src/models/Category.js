// backend/src/models/Category.js

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cost: {
      type: DataTypes.STRING, // Изменим на STRING, если вы храните текстовое значение
      allowNull: false
    },
    typeCostFirst: {
      type: DataTypes.STRING,
      allowNull: false
    },
    typeCostSecond: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    timestamps: true
  });

  return Category;
};
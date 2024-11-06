module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    costFirst: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    costSecond: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    countType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    }
  }, {
    timestamps: true
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Category, { as: 'category', foreignKey: 'categoryId' });
  };

  return Product;
};
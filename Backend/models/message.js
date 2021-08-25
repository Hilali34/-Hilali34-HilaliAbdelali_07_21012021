
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.message.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }

      })
    }
  }
  Post.init({
    UsersId: DataTypes.INT,
    title: DataTypes.STRING,
    article: DataTypes.STRING,
    comment: DataTypes.STRING,
    likes: DataTypes.INT
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};

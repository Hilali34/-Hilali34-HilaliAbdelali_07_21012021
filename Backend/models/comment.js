'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Comment.belongsTo(models.User, { //belongsTo = type de relation
        foreignKey: { //Notre clef étrangère
          allowNull: false
        },
      }),
          models.Comment.belongsTo(models.Post, {
            foreignKey: { //Notre clef étrangère
              allowNull: false
            }
          })
    }
  };
  Comment.init({
    content: DataTypes.STRING,
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Post',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};

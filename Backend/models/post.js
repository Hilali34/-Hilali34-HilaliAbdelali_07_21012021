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
      // define association here
      // RELATION "belongsTo" LE POST EST LIE A UN SEUL UTILISATEUR
      models.Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
          // RELATION "hasMAny" LE POST PEUT AVOIR PLUSIEUR COMMENATIRE
          models.Post.hasMany(models.Comment, {
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            hooks: true
          })
    }
  };
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};

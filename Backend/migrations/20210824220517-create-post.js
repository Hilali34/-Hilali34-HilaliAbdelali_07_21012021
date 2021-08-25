'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INT
      },
      UsersId: {
        allowNull: false,
        type: Sequelize.INT,
        reference:{
          mode:"Users",
          key:"id"
        }
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      article: {
        allowNull: false,
        type: Sequelize.STRING
      },
      comment: {
        allowNull: true,
        type: Sequelize.STRING
      },
      likes: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Posts');
  }
};

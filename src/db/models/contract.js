const Sequelize = require('sequelize');
const sequelizeDB = require('../sequelize');

class Contract extends Sequelize.Model { }
Contract.init(
  {
    terms: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM('new', 'in_progress', 'terminated')
    }
  },
  {
    sequelize: sequelizeDB,
    modelName: 'Contract'
  }
);

module.exports = Contract;

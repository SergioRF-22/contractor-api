const { balanceService } = require('../services');

const deposit = ({ params, body, app }) => {
    const models = app.get('models');
    const sequelize = app.get('sequelize');

    return balanceService.deposit(models, sequelize, params.user_id, body.amount);
}

module.exports = {
    deposit
}
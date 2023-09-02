const { adminService } = require('../services');

const getBestClients = ({ query, app }) => {
    const { start, end, limit = 2 } = query;
    const models = app.get('models');
    const sequelize = app.get('sequelize');

    return adminService.getBestClients(models, sequelize, start, end, limit);
}

const getBestProffesion = ({ query, app }) => {
    const { start, end } = query;
    const models = app.get('models');
    const sequelize = app.get('sequelize');
    return adminService.getBestProffesion(models, sequelize, start, end);
}

module.exports = {
    getBestClients,
    getBestProffesion,
}
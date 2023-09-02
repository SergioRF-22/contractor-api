const { jobService } = require('../services');

const getUnpaids = ({ profile, app }) => {
    const models = app.get('models');
    return jobService.getUnpaids(models, profile.id);
}

const pay = ({ params, app, profile }) => {
    const models = app.get('models');
    const sequelize = app.get('sequelize');
    return jobService.pay(models, sequelize, params.job_id, profile);
}

module.exports = {
    getUnpaids,
    pay
}
const { contractService } = require('../services');

const getContractById = ({ profile, params, app }) => {
    const models = app.get('models');
    return contractService.findById(models, params.id, profile.id);;
};

const getContracts = ({ profile, app }) => {
    const models = app.get('models');
    return contractService.findAllNonTerminated(models, profile.id);
};

module.exports = {
    getContractById,
    getContracts
};

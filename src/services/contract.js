const { Op } = require('sequelize');

const findById = ({Contract}, contractId, profileId) => Contract.findOne({
  where: {
    id: contractId,
    [Op.or]: [
      { ContractorId: profileId },
      { ClientId: profileId },
    ],
  },
});


const findAllNonTerminated = ({Contract}, profileId) => Contract.findAll({
  where: {
    [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
    status: {
      [Op.ne]: 'terminated',
    },
  },
});

module.exports = {
  findById,
  findAllNonTerminated
}
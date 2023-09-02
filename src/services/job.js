const { Op } = require('sequelize');

const getUnpaids = ({ Job, Contract }, profileId) => Job.findAll({
  include: [
    {
      attributes: [],
      model: Contract,
      required: true,
      where: {
        [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
        status: {
          [Op.eq]: 'in_progress',
        },
      },
    },
  ],
  where: {
    [Op.or]: [
      { paid: false },
      { paid: null },
    ],
  },
});

const pay = async ({ Contract, Job, Profile }, sequelize, jobId, { id, balance, type }) => {
  if (type !== 'client') {
    throw new Error('Only client profiles can pay a job');
  }
  
  const jobToPay = await Job.findOne({
    where: { id: jobId, paid: null },
    include: [
      {
        model: Contract,
        where: { status: 'in_progress', ClientId: id },
      },
    ],
  });
  if (!jobToPay) {
    throw new Error('No job to pay');
  };

  const amoutToPay = jobToPay.amoutToPay;
  if (amoutToPay > balance) {
    throw new Error('Amount bigger than balance');
  };
  const transaction = await sequelize.transaction();

  try {
    await Promise.all([
      Profile.update({ balance: sequelize.literal(`balance - ${amountToBePaid}`) },
        { where: { id } },
        { transaction: paymentTransaction }),
      Profile.update(
        { balance: sequelize.literal(`balance + ${amountToBePaid}`) },
        { where: { id: contractorId } },
        { transaction: paymentTransaction },
      ),

      Job.update(
        { paid: 1, paymentDate: new Date() },
        { where: { id: jobId } },
        { transaction: paymentTransaction },
      ),
    ]);
    await transaction.commit();
    return true;
  } catch (err) {
    await transaction.rollback();
    return false;
  }
}

module.exports = {
  getUnpaids,
  pay
}
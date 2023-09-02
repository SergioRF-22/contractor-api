const { Op } = require('sequelize');

const getBestProffesion = ({ Profile, Job, Contract }, sequelize, startDate, endDate) => Profile.findAll({
  attributes: ['profession', [sequelize.fn('SUM', sequelize.col('price')), 'earned']],
  include: [
    {
      model: Contract,
      as: 'Contractor',
      attributes: [],
      required: true,
      include: [
        {
          model: Job,
          required: true,
          attributes: [],
          where: {
            paid: true,
            paymentDate: {
              [Op.gte]: startDate,
              [Op.lte]: endDate,
            },
          },
        },
      ],
    },
  ],
  where: {
    type: 'contractor',
  },
  group: ['profession'],
  order: [[sequelize.col('earned'), 'DESC']],
  limit: 1,
  subQuery: false,
});;

const getBestClients = ({ Profile, Job, Contract }, sequelize, startDate, endDate, limit) => sequelize.query(
  `SELECT
profile.id AS id,
profile.firstName || ' ' || profile.lastName AS fullName,
SUM(job.price) AS paid
FROM Jobs AS job
JOIN Contracts AS contract
  ON contract.id = job.ContractId
JOIN Profiles AS profile
  ON contract.ClientId = profile.id
WHERE job.paid IS NOT NULL
AND job.paymentDate BETWEEN '${startDate}' AND '${endDate}'
GROUP BY fullName
ORDER BY paid DESC
LIMIT ${limit};
)`);

module.exports = {
  getBestClients,
  getBestProffesion
}
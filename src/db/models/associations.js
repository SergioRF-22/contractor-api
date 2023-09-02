const Profile = require('./profile');
const Job = require('./job');
const Contract = require('./contract');

Profile.hasMany(Contract, { as: 'Contractor', foreignKey: 'ContractorId' });
Contract.belongsTo(Profile, { as: 'Contractor' });
Profile.hasMany(Contract, { as: 'Client', foreignKey: 'ClientId' });
Contract.belongsTo(Profile, { as: 'Client' });
Contract.hasMany(Job),  { as: 'Jobs' };
Job.belongsTo(Contract);
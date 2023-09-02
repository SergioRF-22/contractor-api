const contractRouter = require('./contracts');
const jobRouter = require('./jobs');
const balancesRouter = require('./balances');
const adminRouter = require('./admin');

module.exports = {
    contractRouter,
    jobRouter,
    balancesRouter,
    adminRouter
}
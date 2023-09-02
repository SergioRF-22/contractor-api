require('./db/models');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');

const sequelize = require('./db/sequelize');
const { getProfile } = require('./middleware');
const { contractRouter, balancesRouter, adminRouter, jobRouter } = require('./routes');

const app = express();

app.set('sequelize', sequelize);
app.set('models', sequelize.models);
app.use(getProfile);

app.use(bodyParser.json());
app.use(helmet());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use('/contracts', contractRouter);
app.use('/balances', balancesRouter);
app.use('/jobs', jobRouter);
app.use('/admin', adminRouter);

app.use((err, req, res, next) => {
    console.error('An error ocurred', err);
    res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;

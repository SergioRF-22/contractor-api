const express = require('express');
const { jobController } = require('../controllers');

const router = express.Router();

router.get('/unpaid', async (req, res, next) => {
    try {
        const unpaidJobs = await jobController.getUnpaids(req);
        res.json(unpaidJobs);
    } catch (err) {
        next(err);
    }

});

router.post('/:job_id/pay', async (req, res, next) => {
    try {
        await jobController.pay(req);
        res.send('Payment succesfull')
    } catch (err) {
        next(err);
    }
});

module.exports = router;
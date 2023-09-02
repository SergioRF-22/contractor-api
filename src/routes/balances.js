const express = require('express');
const { balanceController } = require('../controllers');

const router = express.Router();

router.post('/deposit/:user_id', async (req, res, next) => {
    try {
        await balanceController.deposit(req);
        res.send('Deposit was succesfull');
    } catch (err) {
        next(err);
    }
})

module.exports = router;

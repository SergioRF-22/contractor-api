const express = require('express');
const { contractController } = require('../controllers');

const router = express.Router();

router.get('/:id', async (req, res, next) => {
    try {
        const contract = await contractController.getContractById(req);
        if (!contract) {
            res.status(404).end()
        }
        res.json(contract);
    } catch (err) {
        next(err);
    }

});

router.get('/', async (req, res, next) => {
    try {
        const contracts = await contractController.getContracts(req);
        res.json(contracts);
    } catch (err) {
        next(err);
    }

});

module.exports = router;

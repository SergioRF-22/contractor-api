const express = require('express');
const { adminController } = require('../controllers');

const router = express.Router();

router.get('/best-profession', async (req, res, next) => {
    try {
        const professions = await adminController.getBestProffesion(req);
        res.json(professions);
    } catch (err) {
        next(err);
    }
});

router.get('/best-clients', async (req, res, next) => {
    try {
        const clients = await adminController.getBestClients(req);
        res.json(clients);
    } catch (err) {
        next(err);
    }
});


module.exports = router;

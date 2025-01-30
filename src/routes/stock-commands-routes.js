/* Libraries */
const express = require('express');
const { check } = require('express-validator');

/* Application files */
const stockCommandsController = require('../services/commands/stock-commands');

const router = express.Router();

router.post('/:id/restock', 
    [
        check('stock').not().isEmpty()
    ],
    stockCommandsController.restock);

router.post('/:id/sell', 
    [
        check('stock').not().isEmpty()
    ],
    stockCommandsController.sell);

module.exports = router;

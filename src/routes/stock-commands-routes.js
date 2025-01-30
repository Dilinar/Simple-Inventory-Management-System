/* Libraries */
const express = require('express');
const { check } = require('express-validator');

/* Application files */
const stockCommands = require('../services/commands/stock-commands');

const router = express.Router();

router.post('/:id/restock', 
    [
        check('stock').not().isEmpty()
    ],
    stockCommands.restock);

router.post('/:id/sell', 
    [
        check('stock').not().isEmpty()
    ],
    stockCommands.sell);

module.exports = router;

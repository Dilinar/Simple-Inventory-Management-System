/* Libraries */
const express = require('express');
const { check } = require('express-validator');

/* Application files */
const stockControllers = require('../controllers/stock-controllers');

const router = express.Router();

router.post('/:id/restock', 
    [
        check('stock').not().isEmpty()
    ],
    stockControllers.restock);

router.post('/:id/sell', 
    [
        check('stock').not().isEmpty()
    ],
    stockControllers.sell);

module.exports = router;

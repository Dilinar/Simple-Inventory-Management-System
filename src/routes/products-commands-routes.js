/* Libraries */
const express = require('express');
const { check } = require('express-validator');

/* Application files */
const productsCommandsController = require('../services/commands/products-commands');

const router = express.Router();

router.post('/add', 
    [
        check('name').not().isEmpty().isLength({ max: 50 }),
        check('description').not().isEmpty().isLength({ max: 50 }),
        check('price').not().isEmpty().isFloat({ gt: 0 }),
        check('stock').not().isEmpty().isInt({ gt: 0 }),
    ],
    productsCommandsController.addProduct);

module.exports = router;

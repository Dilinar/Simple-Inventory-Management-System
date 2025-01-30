/* Libraries */
const express = require('express');
const { check } = require('express-validator');

/* Application files */
const productsQueries = require('../services/queries/products-queries');

const router = express.Router();

router.get('/', productsQueries.getAllProducts);

module.exports = router;

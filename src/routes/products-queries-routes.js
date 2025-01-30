/* Libraries */
const express = require('express');
const { check } = require('express-validator');

/* Application files */
const productsQueriesController = require('../services/queries/products-queries');

const router = express.Router();

router.get('/', productsQueriesController.getAllProducts);

module.exports = router;

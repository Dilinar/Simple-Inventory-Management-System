const express = require('express');
const { check } = require('express-validator');

/* Application files */
const ordersCommands = require('../services/commands/orders-commands');

const router = express.Router();

router.post(
    '/',
    [
      check('customerId').not().isEmpty(),
      check('products').isArray({ min: 1 }),
      check('products.*._id').not().isEmpty(),
      check('products.*.quantity').isInt({ gt: 0 })
    ],
    ordersCommands.createOrder
  );
  
  module.exports = router;
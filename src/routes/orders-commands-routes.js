const express = require('express');
const { check } = require('express-validator');

/* Application files */
const ordersCommandsController = require('../services/commands/orders-commands');

const router = express.Router();

router.post(
    '/',
    [
      check('customerId').not().isEmpty(),
      check('products').isArray({ min: 1 }),
      check('products.*._id').not().isEmpty(),
      check('products.*.quantity').isInt({ gt: 0 })
    ],
    ordersCommandsController.createOrder
  );
  
  module.exports = router;
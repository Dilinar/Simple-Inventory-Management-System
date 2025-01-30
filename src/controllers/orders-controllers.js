/* Libraries */
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

/* Application files */
const HttpError = require('../models/http-error');
const Order = require('../models/order');
const Product = require('../models/product');

async function createOrder(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }
  
    const { customerId, products } = req.body;

    const productIds = products.map(p => new mongoose.Types.ObjectId(p._id));
  
    let orderProducts;
    try {
      orderProducts = await Product.find({ _id: { $in: productIds } });
    } catch (err) {
      return next(new HttpError('Fetching products failed, please try again later.', 500));
    }
  
    for (const product of products) {
      const productInStock = orderProducts.find(p => p.id === product._id);
      if (!productInStock || productInStock.stock < product.quantity) {
        return next(new HttpError('Insufficient stock for one or more products.', 422));
      }
    }

    let totalSum = 0;
    for (const product of products) {
      const productInStock = orderProducts.find(p => p.id === product._id);
      totalSum += productInStock.price * product.quantity;
    }
  
    const createdOrder = new Order({
        customerId,
        products: products.map(p => ({
            productId: p._id,
            quantity: p.quantity
        })),
        totalSum
    });
  
    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      await createdOrder.save({ session });
  
      for (const product of products) {
        const productInStock = orderProducts.find(p => p.id === product._id);
        productInStock.stock -= product.quantity;
        await productInStock.save({ session });
      }
  
      await session.commitTransaction();
    } catch (err) {
      return next(new HttpError('Creating order failed, please try again.', 500));
    }
  
    res.status(201).json({ order: createdOrder });
  }
  
  exports.createOrder = createOrder;

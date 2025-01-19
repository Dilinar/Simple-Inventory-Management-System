const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  customerId: { type: mongoose.Types.ObjectId, required: true, ref: 'Customer' },
  products: [
    {
      productId: { type: mongoose.Types.ObjectId, required: true, ref: 'Product' },
      quantity: { type: Number, required: true }
    }
  ],
  totalSum: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);

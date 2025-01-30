/* Libraries */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productCommandSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { 
        type: Number, 
        required: true,
        validate: {
          validator: function(value) {
            return value > 0;
          },
          message: 'Price must be a positive number'
        }
    },
    stock: { type: Number, required: true },
});

module.exports = mongoose.model('ProductCommand', productCommandSchema);

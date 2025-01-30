const stockEvents = require('../events/stock-events');
const ProductQuery = require('../models/queries/product-query');

stockEvents.on('stockUpdated', async (product) => {
    try {
        const productQuery = await ProductQuery.findById(product._id);
        if (productQuery) {
            productQuery.stock = product.stock;
            await productQuery.save();
        } else {
            console.error('Product not found in query model');
        }
    } catch (err) {
        console.error('Failed to update stock in query model:', err);
    }
});

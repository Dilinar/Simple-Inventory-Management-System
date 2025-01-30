const productEvents = require('../events/product-events');
const ProductQuery = require('../models/queries/product-query');

productEvents.on('productCreated', async (product) => {
    const newProductQuery = new ProductQuery({
        _id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
    });

    try {
        await newProductQuery.save();
    } catch (err) {
        console.error('Failed to save product to query model:', err);
    }
});

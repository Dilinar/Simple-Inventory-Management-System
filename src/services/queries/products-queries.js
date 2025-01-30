/* Application files */
const HttpError = require('../../models/http-error');
const Product = require('../../models/queries/product-query');

async function getAllProducts(req, res, next) {

    let products;

    try {
        products = await Product.find({});
    } catch (err) {
        return next(new HttpError('Fetching products failed, please try again later.', 500));
    }

    if (!products || products.length === 0) {
        return next(new HttpError('Could not find any products.', 404));
    }

    res.json({ products: products.map(product => product.toObject({ getters: true })) });
}

exports.getAllProducts = getAllProducts;

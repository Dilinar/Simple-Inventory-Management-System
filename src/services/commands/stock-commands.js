/* Application files */
const HttpError = require('../../models/http-error');
const Product = require('../../models/product');

async function fetchProductAndValidateStock(req, res, next) {
    const { id } = req.params;
    const { stock } = req.body;

    if (!stock || isNaN(stock)) {
        return next(new HttpError('Invalid stock value.', 422));
    }

    let product;
    try {
        product = await Product.findById(id);
    } catch (err) {
        return next(new HttpError('Failed to fetch the requested product', 500));
    }

    if (!product) {
        return next(new HttpError('Could not find product for the provided id.', 404));
    }

    return { product, stock };
}

async function restock(req, res, next) {
    const { product, stock } = await fetchProductAndValidateStock(req, res, next);
    if (!product) return;

    if (stock <= product.stock) {
        return next(new HttpError('New stock value must be greater than the current stock value.', 422));
    }

    product.stock = stock;

    try {
        await product.save();
    } catch (err) {
        return next(new HttpError('Something went wrong, could not update stock.', 500));
    }

    res.status(200).json({ product: product.toObject({ getters: true }) });
}


async function sell(req, res, next) {
    const { product, stock } = await fetchProductAndValidateStock(req, res, next);
    if (!product) return;

    if (stock >= product.stock) {
        return next(new HttpError('New stock value must be smaller than the current stock value.', 422));
    }

    product.stock = stock;

    try {
        await product.save();
    } catch (err) {
        return next(new HttpError('Something went wrong, could not update stock.', 500));
    }

    res.status(200).json({ product: product.toObject({ getters: true }) });
}

exports.restock = restock;
exports.sell = sell;

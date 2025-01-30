/* Libraries */
const { validationResult } = require('express-validator');

/* Application files */
const HttpError = require('../models/http-error');
const Product = require('../models/product');

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

async function addProduct(req, res, next) {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }
    
    const { name, description, price, stock } = req.body;

    const newProduct = new Product( {
        name,
        description,
        price,
        stock,
    });

    try {
        await newProduct.save();
    } catch (err) {
        const error = new HttpError('Creating a new product failed.', 500);
        return next(error);
    }

    res.status(201).json({ product: newProduct });
}

exports.getAllProducts = getAllProducts;
exports.addProduct = addProduct;

/* Libraries */
const { validationResult } = require('express-validator');

/* Application files */
const HttpError = require('../../models/http-error');
const Product = require('../../models/product');

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

exports.addProduct = addProduct;

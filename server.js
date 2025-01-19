/* Libraries */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

/* Application files */
const productsRoutes = require('./routes/products-routes');
const stockRoutes = require('./routes/stock-routes');
const ordersRoutes = require('./routes/orders-routes');

const app = express();

app.use(bodyParser.json());

/* Usually I would prepend each route with /api to differentiate them from other routes, but I omitted it since the guidelines didn't call for it. */
app.use('/products', productsRoutes);
app.use('/products', stockRoutes);
app.use('/orders', ordersRoutes);

mongoose
    .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@buffout.20mcd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Buffout`)
    .then(app.listen(5000))
    .catch(err => console.log(err));

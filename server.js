/* Libraries */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

/* Application files */
const productsCommandsRoutes = require('./src/routes/products-commands-routes');
const productsQueriesRoutes = require('./src/routes/products-queries-routes');
const stockCommandsRoutes = require('./src/routes/stock-commands-routes');
const ordersCommandsRoutes = require('./src/routes/orders-commands-routes');

require('./src/listeners/product-listeners');
require('./src/listeners/stock-listeners');

const app = express();

app.use(bodyParser.json());

app.use('/api/products', productsCommandsRoutes);
app.use('/api/products', productsQueriesRoutes);
app.use('/api/products', stockCommandsRoutes);
app.use('/api/orders', ordersCommandsRoutes);

mongoose
    .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@buffout.20mcd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Buffout`)
    .then(app.listen(5000))
    .catch(err => console.log(err));

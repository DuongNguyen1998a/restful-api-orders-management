const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Import and Using Routes
const customerRoute = require('./routes/customers');
const staffRoute = require('./routes/staffs');
const StoreRoute = require('./routes/stores');
const brandRoute = require('./routes/brands');
const categoriesRotue = require('./routes/categories');
const productRoute = require('./routes/products');
const stockRoute = require('./routes/stocks');
const orderRoute = require('./routes/orders');
const orderItemRoute = require('./routes/order_items');
app.use('/customers', customerRoute);
app.use('/staffs', staffRoute);
app.use('/stores', StoreRoute);
app.use('/brands', brandRoute);
app.use('/categories', categoriesRotue);
app.use('/products', productRoute);
app.use('/stocks', stockRoute);
app.use('/orders', orderRoute);
app.use('/order-items', orderItemRoute);

// Server listening on port 3000
app.listen(process.env.SERVER_PORT, (err) => {
    if (err) {
        console.log(`Server Error: ${err}`);
    }
    else {
        console.log(`Server listening port ${process.env.SERVER_PORT}`);
    }
});
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
app.use('/customers', customerRoute);
app.use('/staffs', staffRoute);

// Server listening on port 3000
app.listen(process.env.SERVER_PORT, (err) => {
    if (err) {
        console.log(`Server Error: ${err}`);
    }
    else {
        console.log(`Server listening port ${process.env.SERVER_PORT}`);
    }
});
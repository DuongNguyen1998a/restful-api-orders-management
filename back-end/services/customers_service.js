const mssql = require('mssql');
const dbConfig = require('../dbConfig');

module.exports = {
    async getCustomers(res) {

        try {
            let pool = await mssql.connect(dbConfig);

            const query = 'select * from sales.customers';

            let response = await pool.request()
                .query(query);

            res.status(200).json({
                data: response.recordsets[0]
            });
            
            // close db connection
            pool.close();

        } catch(err) {
            console.log(`Error: ${err}`);
        }
        
        mssql.on('error', err => {
            console.log(`Db Error: ${err}`);
        });
    },

    async getCustomer(req, res) {
        try {
            let pool = await mssql.connect(dbConfig);

            const query = `select * from sales.customers where customer_id=+${req.params.customerId}`;

            let response = await pool.request()
                .query(query);

            res.status(200).json({
                data: response.recordsets[0]
            });
            
            // close db connection
            pool.close();
        } catch (err) {
            console.log(`Error: ${err}`);
        }

        mssql.on('error', err => {
            console.log(`Db Error: ${err}`);
        });
    },

    async createNewCustomer(req, res) {
        try {
            let pool = await mssql.connect(dbConfig);

            const query = `insert into sales.customers(first_name, last_name, phone, email, street, city, state, zip_code) values(@first_name, @last_name, @phone, @email, @street, @city, @state, @zip_code)`;

            let response = await pool.request()
                .input('first_name', mssql.VarChar(255), req.body.first_name)
                .input('last_name', mssql.VarChar(255), req.body.last_name)
                .input('phone', mssql.VarChar(25), req.body.phone)
                .input('email', mssql.VarChar(255), req.body.email)
                .input('street', mssql.VarChar(255), req.body.street)
                .input('city', mssql.VarChar(50), req.body.city)
                .input('state', mssql.VarChar(25), req.body.state)
                .input('zip_code', mssql.VarChar(5), req.body.zip_code)

                .output('ofirst_name', mssql.VarChar(255), req.body.first_name)
                .output('olast_name', mssql.VarChar(255), req.body.last_name)
                .output('ophone', mssql.VarChar(25), req.body.phone)
                .output('oemail', mssql.VarChar(255), req.body.email)
                .output('ostreet', mssql.VarChar(255), req.body.street)
                .output('ocity', mssql.VarChar(50), req.body.city)
                .output('ostate', mssql.VarChar(25), req.body.state)
                .output('ozip_code', mssql.VarChar(5), req.body.zip_code)
                .query(query);

            res.status(201).json({
                data: response.output
            });

            // close db connection
            pool.close();
        } catch (err) {
            console.log(`Error: ${err}`);
        }

        mssql.on('error', err => {
            console.log(`Db Error: ${err}`);
        });
    },

    async updateCustomer(req, res) {
        try {
            let pool = await mssql.connect(dbConfig);

            const query = `update sales.customers set first_name = @first_name, last_name = @last_name, phone = @phone, email = @email, street = @street, city = @city, state = @state, zip_code = @zip_code where customer_id=${req.params.customerId}`;

            let response = await pool.request()
                .input('first_name', mssql.VarChar(255), req.body.first_name)
                .input('last_name', mssql.VarChar(255), req.body.last_name)
                .input('phone', mssql.VarChar(25), req.body.phone)
                .input('email', mssql.VarChar(255), req.body.email)
                .input('street', mssql.VarChar(255), req.body.street)
                .input('city', mssql.VarChar(50), req.body.city)
                .input('state', mssql.VarChar(25), req.body.state)
                .input('zip_code', mssql.VarChar(5), req.body.zip_code)

                .output('ofirst_name', mssql.VarChar(255), req.body.first_name)
                .output('olast_name', mssql.VarChar(255), req.body.last_name)
                .output('ophone', mssql.VarChar(25), req.body.phone)
                .output('oemail', mssql.VarChar(255), req.body.email)
                .output('ostreet', mssql.VarChar(255), req.body.street)
                .output('ocity', mssql.VarChar(50), req.body.city)
                .output('ostate', mssql.VarChar(25), req.body.state)
                .output('ozip_code', mssql.VarChar(5), req.body.zip_code)
                .query(query);

            res.status(200).json({
                data: response.output
            });

            // close db connection
            pool.close();
        } catch (err) {
            console.log(`Error: ${err}`);
        }

        mssql.on('error', err => {
            console.log(`Db Error: ${err}`);
        });
    },

    async deleteCustomer(req, res) {
        try {
            let pool = await mssql.connect(dbConfig);

            const query = `delete from sales.customers where customer_id=${req.params.customerId}`;

            let response = await pool.request()
                .output('customer_id', mssql.Int, req.params.customerId)
                .query(query);

            res.status(200).json({
                data: response.output
            });

            // close db connection
            pool.close();
        } catch (err) {
            console.log(`Error: ${err}`);
        }

        mssql.on('error', err => {
            console.log(`Db Error: ${err}`);
        });
    }

}
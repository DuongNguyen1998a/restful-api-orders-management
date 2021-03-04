const mssql = require('mssql');
const dbConfig = require('../dbConfig');

module.exports = {
    async getStores(res) {

        try {
            let pool = await mssql.connect(dbConfig);

            const query = 'select * from sales.stores';

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

    async getStore(req, res) {

        try {
            let pool = await mssql.connect(dbConfig);

            const query = 'select * from sales.stores where store_id='+req.params.storeId;

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

    async createNewStore(req, res) {
        try {
            let pool = await mssql.connect(dbConfig);

            const query = `insert into sales.stores(store_name, phone, email, street, city, state, zip_code) values(@store_name, @phone, @email, @street, @city, @state, @zip_code)`;

            let response = await pool.request()
            .input('store_name', mssql.VarChar(255), req.body.store_name)
            .input('phone', mssql.VarChar(25), req.body.phone) 
            .input('email', mssql.VarChar(255), req.body.email)
            .input('street', mssql.VarChar(255), req.body.street)
            .input('city', mssql.VarChar(255), req.body.city)
            .input('state', mssql.VarChar(255), req.body.state)
            .input('zip_code', mssql.VarChar(255), req.body.zip_code)

            .output('ostore_name', mssql.VarChar(255), req.body.store_name)
            .output('ophone', mssql.VarChar(25), req.body.phone) 
            .output('oemail', mssql.VarChar(255), req.body.email)
            .output('ostreet', mssql.VarChar(255), req.body.street)
            .output('ocity', mssql.VarChar(255), req.body.city)
            .output('ostate', mssql.VarChar(255), req.body.state)
            .output('ozip_code', mssql.VarChar(255), req.body.zip_code)
            .query(query);

            res.status(201).json({
                data: response.output
            });

            pool.close();
        } catch (err) {
            console.log(`Error: ${err}`);
        }

        mssql.on('error', err => {
            console.log(`Db Error: ${err}`);
        });
    },

    async updateStore(req, res) {
        try {
            let pool = await mssql.connect(dbConfig);

            const query = `update sales.stores set store_name = @store_name, phone = @phone, email = @email, street = @street, city = @city, state = @state, zip_code = @zip_code where store_id=${req.params.storeId}`;

            let response = await pool.request()
            .input('store_name', mssql.VarChar(255), req.body.store_name)
            .input('phone', mssql.VarChar(25), req.body.phone) 
            .input('email', mssql.VarChar(255), req.body.email)
            .input('street', mssql.VarChar(255), req.body.street)
            .input('city', mssql.VarChar(255), req.body.city)
            .input('state', mssql.VarChar(255), req.body.state)
            .input('zip_code', mssql.VarChar(255), req.body.zip_code)

            .output('ostore_name', mssql.VarChar(255), req.body.store_name)
            .output('ophone', mssql.VarChar(25), req.body.phone) 
            .output('oemail', mssql.VarChar(255), req.body.email)
            .output('ostreet', mssql.VarChar(255), req.body.street)
            .output('ocity', mssql.VarChar(255), req.body.city)
            .output('ostate', mssql.VarChar(255), req.body.state)
            .output('ozip_code', mssql.VarChar(255), req.body.zip_code)
            .query(query);

            res.status(200).json({
                data: response.output
            });

            pool.close();
        } catch (err) {
            console.log(`Error: ${err}`);
        }

        mssql.on('error', err => {
            console.log(`Db Error: ${err}`);
        });
    },

    async deleteStore(req, res) {
        try {
            let pool = await mssql.connect(dbConfig);

            const query = `delete from sales.stores where store_id=${req.params.storeId}`;

            let response = await pool.request()
                .output('store_id', mssql.Int, req.params.storeId)
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
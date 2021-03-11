const mssql = require('mssql');
const dbConfig = require('../dbConfig');


module.exports = {
    async getStocks(res) {
        try {
            let pool = await mssql.connect(dbConfig);

            const query = 'select * from production.stocks';

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
    async getStock(req, res) {
        try {
            let pool = await mssql.connect(dbConfig);

            // if params = null => Url Api = null
            let storeId = req.params.storeId;
            let productId = req.params.productId;

            const query = `select * from production.stocks where (store_id = ${storeId} or ${storeId} is null) and (product_id = ${productId} or ${productId} is null)`;

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
    async createNewStock (req, res) {
        try {

            let pool = await mssql.connect(dbConfig);

            const query = `insert into production.stocks(store_id, product_id, quantity) values (@store_id, @product_id, @quantity)`;

            let response = await pool.request()
            .input('store_id', mssql.Int, req.body.store_id)
            .input('product_id', mssql.Int, req.body.product_id)
            .input('quantity', mssql.Int, req.body.quantity)
            .output('ostore_id', mssql.Int, req.body.store_id)
            .output('oproduct_id', mssql.Int, req.body.product_id)
            .output('oquantity', mssql.Int, req.body.quantity)
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
    async updateStock (req, res) {
        try {

            let pool = await mssql.connect(dbConfig);

            const query = `update production.stocks set store_id = @store_id, product_id = @product_id, quantity = @quantity where (store_id = ${req.params.storeId} or ${req.params.storeId} is null) and (product_id = ${req.params.productId} or ${req.params.productId} is null)`;

            let response = await pool.request()
            .input('store_id', mssql.Int, req.body.store_id)
            .input('product_id', mssql.Int, req.body.product_id)
            .input('quantity', mssql.Int, req.body.quantity)
            .output('ostore_id', mssql.Int, req.body.store_id)
            .output('oproduct_id', mssql.Int, req.body.product_id)
            .output('oquantity', mssql.Int, req.body.quantity)
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
    }
}
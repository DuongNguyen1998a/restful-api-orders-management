const mssql = require('mssql');
const dbConfig = require('../dbConfig');

module.exports = {
    async getProducts(res) {
        try {
            let pool = await mssql.connect(dbConfig);

            const query = `select * from production.products`;

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

    async getProduct(req, res) {
        try {
            let pool = await mssql.connect(dbConfig);

            const query = `select * from production.products where product_id=${req.params.productId}`;

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

    async createNewProduct(req, res) {
        try {
            let pool = await mssql.connect(dbConfig);

            const query = `insert into production.products(product_name, brand_id, category_id, model_year, list_price) values(@product_name, @brand_id, @category_id, @model_year, @list_price)`;

            let response = await pool.request()
                .input('product_name', mssql.VarChar(255), req.body.product_name)
                .input('brand_id', mssql.Int, req.body.brand_id)
                .input('category_id', mssql.Int, req.body.category_id)
                .input('model_year', mssql.SmallInt, req.body.model_year)
                .input('list_price', mssql.Decimal(10,2), req.body.list_price)

                .output('oproduct_name', mssql.VarChar(255), req.body.product_name)
                .output('obrand_id', mssql.Int, req.body.brand_id)
                .output('ocategory_id', mssql.Int, req.body.category_id)
                .output('omodel_year', mssql.SmallInt, req.body.model_year)
                .output('olist_price', mssql.Decimal(10,2), req.body.list_price)
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

    async updateProduct(req, res) {
        try {
            let pool = await mssql.connect(dbConfig);

            const query = `update production.products set product_name = @product_name, brand_id = @brand_id, category_id = @category_id, model_year = @model_year, list_price = @list_price where product_id=${req.params.productId}`;

            let response = await pool.request()
                .input('product_name', mssql.VarChar(255), req.body.product_name)
                .input('brand_id', mssql.Int, req.body.brand_id)
                .input('category_id', mssql.Int, req.body.category_id)
                .input('model_year', mssql.SmallInt, req.body.model_year)
                .input('list_price', mssql.Decimal(10,2), req.body.list_price)

                .output('oproduct_name', mssql.VarChar(255), req.body.product_name)
                .output('obrand_id', mssql.Int, req.body.brand_id)
                .output('ocategory_id', mssql.Int, req.body.category_id)
                .output('omodel_year', mssql.SmallInt, req.body.model_year)
                .output('olist_price', mssql.Decimal(10,2), req.body.list_price)
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

    async deleteProduct(req, res) {
        try {
            let pool = await mssql.connect(dbConfig);

            const query = `delete from production.products where product_id=${req.params.productId}`;

            let response = await pool.request()
                .output('product_id', mssql.Int, req.params.productId)
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
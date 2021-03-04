const mssql = require('mssql');
const dbConfig = require('../dbConfig');

module.exports = {
    async getCategories(res) {
        try {
            let pool = await mssql.connect(dbConfig);

            const query = 'select * from production.categories';

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

    async getCategory(req, res) {
        try {
            let pool = await mssql.connect(dbConfig);

            const query = 'select * from production.categories where category_id='+req.params.categoryId;

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

    async createNewCategory(req, res) {
        try {
            let pool = await mssql.connect(dbConfig);

            const query = `insert into production.categories(category_name) values(@category_name)`;

            let response = await pool.request()
                .input('category_name', mssql.VarChar(255), req.body.category_name)
                .output('ocategory_name', mssql.VarChar(255), req.body.category_name)
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

    async updateCategory(req, res) {
        try {
            let pool = await mssql.connect(dbConfig);

            const query = `update production.categories set category_name = @category_name where category_id=${req.params.categoryId}`;

            let response = await pool.request()
                .input('category_name', mssql.VarChar(255), req.body.category_name)
                .output('ocategory_name', mssql.VarChar(255), req.body.category_name)
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

    async deleteCategory(req, res) {
        try {
            let pool = await mssql.connect(dbConfig);

            const query = `delete from production.categories where category_id=${req.params.categoryId}`;

            let response = await pool.request()
                .output('category_id', mssql.Int, req.params.categoryId)
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
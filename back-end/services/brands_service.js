const mssql = require('mssql');
const dbConfig = require('../dbConfig');

module.exports = {
    async getBrands(res) {
        try {
            let pool = await mssql.connect(dbConfig);

            const query = 'select * from production.brands';

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

    async getBrand(req, res) {
        try {
            let pool = await mssql.connect(dbConfig);

            const query = 'select * from production.brands where brand_id='+req.params.brandId;

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

    async craeteNewBrand(req, res) {
        try {
            let pool = await mssql.connect(dbConfig);

            const query = `insert into production.brands(brand_name) values(@brand_name)`;

            let response = await pool.request()
                .input('brand_name', mssql.VarChar(255), req.body.brand_name)
                .output('obrand_name', mssql.VarChar(255), req.body.brand_name)
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

    async udpateBrand(req, res) {
        try {
            let pool = await mssql.connect(dbConfig);

            const query = `update production.brands set brand_name = @brand_name where brand_id=${req.params.brandId}`;

            let response = await pool.request()
                .input('brand_name', mssql.VarChar(255), req.body.brand_name)
                .output('obrand_name', mssql.VarChar(255), req.body.brand_name)
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

    async deleteBrand(req, res) {
        try {
            let pool = await mssql.connect(dbConfig);

            const query = `delete from production.brands where brand_id=${req.params.brandId}`;

            let response = await pool.request()
                .output('brand_id', mssql.Int, req.params.brandId)
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
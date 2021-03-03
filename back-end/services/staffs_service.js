const mssql = require('mssql');
const dbConfig = require('../dbConfig');

module.exports = {
    async getStaffs(res) {

        try {
            let pool = await mssql.connect(dbConfig);

            const query = 'select * from sales.staffs';

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

    async getStaff(req, res) {
        try {
            let pool = await mssql.connect(dbConfig);

            const query = `select * from sales.staffs where staff_id=+${req.params.staffId}`;

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
    }
}
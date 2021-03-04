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
    },

    async createNewStaff(req, res) {
        try {
            let pool = await mssql.connect(dbConfig);

            const query = `insert into sales.staffs(first_name, last_name, email, phone, active, store_id, manager_id) values(@first_name, @last_name, @email, @phone, @active, @store_id, @manager_id)`;

            let response = await pool.request()
            .input('first_name', mssql.VarChar(255), req.body.first_name)
            .input('last_name', mssql.VarChar(255), req.body.last_name)
            .input('email', mssql.VarChar(255), req.body.email)
            .input('phone', mssql.VarChar(25), req.body.phone)  
            .input('active', mssql.TinyInt, req.body.active)
            .input('store_id', mssql.Int, req.body.store_id)
            .input('manager_id', mssql.Int, req.body.manager_id)

            .output('ofirst_name', mssql.VarChar(255), req.body.first_name)
            .output('olast_name', mssql.VarChar(255), req.body.last_name)
            .output('oemail', mssql.VarChar(255), req.body.email)
            .output('ophone', mssql.VarChar(25), req.body.phone)  
            .output('oactive', mssql.TinyInt, req.body.active)
            .output('ostore_id', mssql.Int, req.body.store_id)
            .output('omanager_id', mssql.Int, req.body.manager_id)
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

    async updateStaff(req, res) {
        try {
            let pool = await mssql.connect(dbConfig);

            const query = `update sales.staffs set first_name = @first_name, last_name = @last_name, email = @email, phone = @phone, active = @active, store_id = @store_id, manager_id = @manager_id where staff_id=${req.params.staffId}`;

            let response = await pool.request()
            .input('first_name', mssql.VarChar(255), req.body.first_name)
            .input('last_name', mssql.VarChar(255), req.body.last_name)
            .input('email', mssql.VarChar(255), req.body.email)
            .input('phone', mssql.VarChar(25), req.body.phone)  
            .input('active', mssql.TinyInt, req.body.active)
            .input('store_id', mssql.Int, req.body.store_id)
            .input('manager_id', mssql.Int, req.body.manager_id)

            .output('ofirst_name', mssql.VarChar(255), req.body.first_name)
            .output('olast_name', mssql.VarChar(255), req.body.last_name)
            .output('oemail', mssql.VarChar(255), req.body.email)
            .output('ophone', mssql.VarChar(25), req.body.phone)  
            .output('oactive', mssql.TinyInt, req.body.active)
            .output('ostore_id', mssql.Int, req.body.store_id)
            .output('omanager_id', mssql.Int, req.body.manager_id)
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

    async deleteStaff(req, res) {
        try {
            let pool = await mssql.connect(dbConfig);

            const query = `delete from sales.staffs where staff_id=${req.params.staffId}`;

            let response = await pool.request()
                .output('staff_id', mssql.Int, req.params.staffId)
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
const mssql = require('mssql');
const dbConfig = require('../dbConfig');

module.exports = { 
    async getOrders(res) {
        try {
            let pool = await mssql.connect(dbConfig);

            const query = `select 
                order_id, customer_id, order_status, 
                cast(order_date as varchar) as order_date,
                cast(required_date as varchar) as required_date,
                cast(shipped_date as varchar) as shipped_date,
                store_id, staff_id
            from sales.orders`;

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
    async getOrder(req, res) {
        try {
            let pool = await mssql.connect(dbConfig);

            const query = `select 
                order_id, customer_id, order_status, 
                cast(order_date as varchar) as order_date,
                cast(required_date as varchar) as required_date,
                cast(shipped_date as varchar) as shipped_date,
                store_id, staff_id
            from sales.orders where order_id = ${req.params.orderId}`;

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
    async createNewOrder(req, res) {
        try {
            let pool = await mssql.connect(dbConfig);

            const query = `insert into sales.orders(customer_id, order_status, order_date, required_date, shipped_date, store_id, staff_id) values(@customer_id, @order_status, @order_date, @required_date, @shipped_date, @store_id, @staff_id)`;

            let response = await pool.request()
                .input('customer_id', mssql.Int, req.body.customer_id)
                .input('order_status', mssql.Int, req.body.order_status)
                .input('order_date', mssql.Date, req.body.order_date)
                .input('required_date', mssql.Date, req.body.required_date)
                .input('shipped_date', mssql.Date, req.body.shipped_date)
                .input('store_id', mssql.Int, req.body.store_id)
                .input('staff_id', mssql.Int, req.body.staff_id)

                .output('ocustomer_id', mssql.Int, req.body.customer_id)
                .output('oorder_status', mssql.Int, req.body.order_status)
                .output('oorder_date', mssql.Date, req.body.order_date)
                .output('orequired_date', mssql.Date, req.body.required_date)
                .output('oshipped_date', mssql.Date, req.body.shipped_date)
                .output('ostore_id', mssql.Int, req.body.store_id)
                .output('ostaff_id', mssql.Int, req.body.staff_id)
                .query(query);

            res.status(201).json({
                data: response.output
            });

        } catch (err) {
            console.log(`Error: ${err}`);
        }

        mssql.on('error', err => {
            console.log(`Db Error: ${err}`);
        });
    },
    async updateOrder(req, res) {
        try {
            let pool = await mssql.connect(dbConfig);
            const query = `update sales.orders set 
                customer_id = @customer_id, order_status = @order_status,
                order_date = @order_date, required_date = @required_date,
                shipped_date = @shipped_date, store_id = @store_id,
                staff_id = @staff_id where order_id = ${req.params.orderId}`;

            let response = await pool.request()
                .input('customer_id', mssql.Int, req.body.customer_id)
                .input('order_status', mssql.Int, req.body.order_status)
                .input('order_date', mssql.Date, req.body.order_date)
                .input('required_date', mssql.Date, req.body.required_date)
                .input('shipped_date', mssql.Date, req.body.shipped_date)
                .input('store_id', mssql.Int, req.body.store_id)
                .input('staff_id', mssql.Int, req.body.staff_id)

                .output('oorder_id', mssql.Int, req.params.orderId)
                .output('ocustomer_id', mssql.Int, req.body.customer_id)
                .output('oorder_status', mssql.Int, req.body.order_status)
                .output('oorder_date', mssql.Date, req.body.order_date)
                .output('orequired_date', mssql.Date, req.body.required_date)
                .output('oshipped_date', mssql.Date, req.body.shipped_date)
                .output('ostore_id', mssql.Int, req.body.store_id)
                .output('ostaff_id', mssql.Int, req.body.staff_id)
                .query(query);

            res.status(200).json({
                data: response.output
            });

        } catch (err) {
            console.log(`Error: ${err}`);
        }

        mssql.on('error', err => {
            console.log(`Db Error: ${err}`);
        });
    },
    async deleteOrder(req, res) {
        try {
            let pool = await mssql.connect(dbConfig);

            const query = `delete from sales.orders where order_id = ${req.params.orderId}`;

            let response = await pool.request()
            .output('order_id', mssql.Int, req.params.orderId)
            .query(query);

            res.status(200).json({
                data: response.output
            });
            
        } catch (err) {
            console.log(`Error: ${err}`);
        }

        mssql.on('error', err => {
            console.log(`Db Error: ${err}`);
        });
    }
}
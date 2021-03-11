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
    }
}
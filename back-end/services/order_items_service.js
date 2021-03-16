const mssql = require('mssql');
const dbConfig = require('../dbConfig');

module.exports = {
    async getOrderDetails(res) {
        try {
            let pool = await mssql.connect(dbConfig);
            const query = `select * from sales.order_items`;

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
    async getOrderDetail(req, res) {
        try {
            let pool = await mssql.connect(dbConfig);
            const query = `select * from sales.order_items where order_id = ${req.params.orderId}`;

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
    async createNewOrderItem(req, res) {
        try {
            let pool = await mssql.connect(dbConfig);
            const query = `insert into sales.order_items(order_id, item_id, product_id, quantity, list_price, discount) values(@order_id, @item_id, @product_id, @quantity, @list_price, @discount)`;
        
            let response = await pool.request()
                .input('order_id', mssql.Int, req.body.order_id)
                .input('item_id', mssql.Int, req.body.item_id)
                .input('product_id', mssql.Int, req.body.product_id)
                .input('quantity', mssql.Int, req.body.quantity)
                .input('list_price', mssql.Decimal(10,2), req.body.list_price)
                .input('discount', mssql.Decimal(4,2), req.body.discount)
                
                .output('oorder_id', mssql.Int, req.body.order_id)
                .output('oitem_id', mssql.Int, req.body.item_id)
                .output('oproduct_id', mssql.Int, req.body.product_id)
                .output('oquantity', mssql.Int, req.body.quantity)
                .output('olist_price', mssql.Decimal(10,2), req.body.list_price)
                .output('odiscount', mssql.Decimal(4,2), req.body.discount)
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
    async updateOrderItem(req, res) {
        try {
            let pool = await mssql.connect(dbConfig);
            const query = `update sales.order_items set 
                product_id = @product_id, quantity = @quantity,
                list_price = @list_price, discount = @discount
                where order_id = ${req.params.orderId} and item_id = ${req.params.itemId}`;

            let response = await pool.request()
                .input('product_id', mssql.Int, req.body.product_id)
                .input('quantity', mssql.Int, req.body.quantity)
                .input('list_price', mssql.Decimal(10,2), req.body.list_price)
                .input('discount', mssql.Decimal(4,2), req.body.discount)
                
                .output('oorder_id', mssql.Int, req.params.orderId)
                .output('oitem_id', mssql.Int, req.params.itemId)
                .output('oproduct_id', mssql.Int, req.body.product_id)
                .output('oquantity', mssql.Int, req.body.quantity)
                .output('olist_price', mssql.Decimal(10,2), req.body.list_price)
                .output('odiscount', mssql.Decimal(4,2), req.body.discount)
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
    async deleteOrderItem(req, res) {
        try {
            let pool = await mssql.connect(dbConfig);
            const query = `delete from sales.order_items where order_id = ${req.params.orderId} and item_id = ${req.params.itemId}`;

            let response = await pool.request()
                .output('oorder_id', mssql.Int, req.params.orderId)
                .output('oitem_id', mssql.Int, req.params.itemId)
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
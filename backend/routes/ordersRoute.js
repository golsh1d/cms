let express = require('express')
let sqlConnection = require('./../DB/cmsShop')
let ordersRoute = express.Router()

ordersRoute.get('/' , (req , res) => {
    let selectAllOrdersQuery = `SELECT orders.id , orders.date , orders.hour , orders.price , orders.off , orders.sale , orders.popularity , orders.count , orders.sale_count , orders.isActive , users.firstName AS userId , products.title AS productId FROM orders INNER JOIN users ON users.id = orders.userId INNER JOIN products ON products.id = orders.productId`
    sqlConnection.query(selectAllOrdersQuery , (err , result) => {
        if (err) {
            res.send(null)
        } else {
            res.send(result)
        }
    })
})

ordersRoute.delete('/:orderId' , (req , res) => {
    let orderId = req.params.orderId
    let deleteOrderQuery = `DELETE FROM orders WHERE id = ${orderId}`
    sqlConnection.query(deleteOrderQuery , (err , result) => {
        if (err) {
            res.send(null)
        } else {
            res.send(result)
        }
    })
})

ordersRoute.put('/active-order/:orderId/:isActive' , (req , res) => {
    let orderId = req.params.orderId
    let isActive = req.params.isActive
    let isActiveQuery = `UPDATE orders SET isActive=${isActive} WHERE id = ${orderId}`
    sqlConnection.query(isActiveQuery , (err , result) => {
        if (err) {
            res.send(null)
        } else {
            res.send(result)
        }
    })
})

module.exports = ordersRoute
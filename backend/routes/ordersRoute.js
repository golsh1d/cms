let express = require('express')
let sqlConnection = require('./../DB/cmsShop')
let ordersRoute = express.Router()

ordersRoute.get('/' , (req , res) => {
    let selectAllOrdersQuery = `SELECT * FROM orders`
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
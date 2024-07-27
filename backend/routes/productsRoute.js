let express = require('express')
let sqlConnection = require('./../DB/cmsShop.js')
let productsRoute = express.Router()

productsRoute.get('/' , (req , res) => {
    let selectAllProductsQuery = `SELECT * FROM products`
    sqlConnection.query(selectAllProductsQuery , (err , result) => {
        if (err) {
            res.send(null)
        } else {
            res.send(result)
        }
    })
})

productsRoute.delete('/:productId' , (req , res) => {
    let productId = req.params.productId
    let deleteProductquery = `DELETE FROM products WHERE id = ${productId}`
    sqlConnection.query(deleteProductquery , (err , result) => {
        if (err) {
            res.send(null)
        } else {
            res.send(result)
        }
    })
})

module.exports = productsRoute
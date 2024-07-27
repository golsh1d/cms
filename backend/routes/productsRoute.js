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
    let deleteProductQuery = `DELETE FROM products WHERE id = ${productId}`
    sqlConnection.query(deleteProductQuery , (err , result) => {
        if (err) {
            res.send(null)
        } else {
            res.send(result)
        }
    })
})

productsRoute.put('/:productId' , (req , res) => {
    let body = req.body
    let productId = req.params.productId
    let updateProductQuery = `UPDATE products SET id=NULL,title=${body.title},price=${body.price},count=${body.count},img=${body.img},popularity=${body.popularity},sale=${body.sale},color=${body.color} WHERE id = ${productId}`
    sqlConnection.query(updateProductQuery , (err , result) => {
        if (err) {
            res.send(null)
        } else {
            res.send(result)
        }
    })
})

productsRoute.post('/' , (req , res) => {
    let body = req.body
    let addProductQuery = `INSERT INTO products (id, title, price, count, img, popularity, sale, color) VALUES (NULL,${body.title},${body.price},${body.count},${body.img},${body.popularity},${body.sale},${body.color})`
    sqlConnection.query(addProductQuery , (err , result) => {
        if (err) {
            res.send(null)
        } else {
            res.send(result)
        }
    })
})

module.exports = productsRoute
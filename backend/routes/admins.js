let express = require('express')
let sqlConnection = require('./../DB/cmsShop')
let adminsRoute = express.Router()

adminsRoute.get('/' , (req , res) => {
    let adminToken = req.headers.authorization
    let selectAdminQuery = `SELECT * FROM admins WHERE token = ${adminToken}`
    sqlConnection.query(selectAdminQuery , (err , result) => {
        if (err) {
            res.send(null)
        } else {
            res.send(result)
        }
    })
})

module.exports = adminsRoute
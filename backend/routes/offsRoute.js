let express = require('express')
let sqlConnection = require('./../DB/cmsShop')
let offsRoute = express.Router()

offsRoute.get('/' , (req , res) => {
    let selectAllOffsQuery = `SELECT offs.id , offs.code , offs.percent , offs.date , offs.isActive , admins.firstName as adminId , products.title AS productId FROM offs INNER JOIN admins ON admins.id = offs.adminId INNER JOIN products ON products.id = offs.productId`
    sqlConnection.query(selectAllOffsQuery , (err , result) => {
        if (err) {
            res.send(null)
        } else {
            res.send(result)
        }
    })
})

offsRoute.delete('/:offsId' , (req , res) => {
    let offsId = req.params.offsId
    let deleteOffQuery = `DELETE FROM offs WHERE id = ${offsId}`
    sqlConnection.query(deleteOffQuery , (err , result) => {
        if (err) {
            res.send(null)
        } else {
            res.send(result)
        } 
    })
})

offsRoute.put('/active-offs/:offsId/:isActive' , (req ,res) => {
    let offsId = req.params.offsId
    let isActive = req.params.isActive
    let isActiveQuery = `UPDATE offs SET isActive=${isActive} WHERE id = ${offsId}`
    sqlConnection.query(isActiveQuery , (err , result) => {
        if (err) {
            res.send(null)
        } else {
            res.send(result)
        } 
    })
})

module.exports = offsRoute
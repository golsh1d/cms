let express = require('express')
let sqlConnection = require('./../DB/cmsShop')
let offsRoute = express.Router()

offsRoute.get('/' , (req , res) => {
    let selectAllOffsQuery = `SELECT * FROM offs`
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
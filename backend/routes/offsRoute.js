let express = require('express')
let sqlConnection = require('./../DB/cmsShop')
const { result } = require('lodash')
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

module.exports = offsRoute
let express = require('express')
let sqlConnection = require('./../DB/cmsShop')
let commentsRoute = express.Router()

commentsRoute.get('/', (req , res) => {
    let selectAllCommentsQuery = `SELECT * FROM comments`
    sqlConnection.query(selectAllCommentsQuery , (err , result) => {
        if (err) {
            res.send(null)
        } else {
            res.send(result)
        }
    })
})

module.exports = commentsRoute
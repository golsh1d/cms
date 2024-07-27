let express = require('express')
let sqlConnection = require('./../DB/cmsShop')
let usersRoute = express.Router()

usersRoute.get('/' , (req , res) => {
    let selectAllUsers = `SELECT * FROM users`
    sqlConnection.query(selectAllUsers , (err , result) => {
        if (err) {
            res.send(null)
        } else {
            res.send(result)
        }
    })
})

module.exports = usersRoute
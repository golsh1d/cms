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

usersRoute.delete('/:userId' , (req , res) => {
    let userId = req.params.userId
    let deleteUserQuery = `DELETE FROM users WHERE id = ${userId}`
    sqlConnection.query(deleteUserQuery , (err , result) => {
        if (err) {
            res.send(null)
        } else {
            res.send(result)
        }
    })
})

usersRoute.put('/:userId' , (req , res) => {
    let userId = req.params.userId
    let body = req.body
    let updateUserQuery = `UPDATE users SET firstName='${body.firstName}',lastName='${body.lastName}',userName='${body.userName}',password='${body.password}',phone=${body.phone},email='${body.email}',city='${body.city}',address='${body.address}',score=${body.score},buy=${body.buy} WHERE id = ${userId}`
    sqlConnection.query(updateUserQuery , (err , result) => {
        if (err) {
            res.send(null)
        } else {
            res.send(result)
        }
    })
})

module.exports = usersRoute
let express = require('express')
let sqlConnection = require('./../DB/cmsShop')
const { result } = require('lodash')
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

commentsRoute.delete('/:commentId' , (req , res) => {
    let commentId = req.params.commentId
    let deleteCommentQuery = `DELETE FROM comments WHERE id = ${commentId}`
    sqlConnection.query(deleteCommentQuery , (err , result) => {
        if (err) {
            res.send(null)
        } else {
            res.send(result)
        }
    })
})

commentsRoute.put('/:commentId' , (req , res) => {
    let commentId = req.params.commentId
    let body = req.body
    let updateCommentQuery = `UPDATE comments SET body=${body.body} WHERE id = ${commentId}`
    sqlConnection.query(updateCommentQuery , (err , result) => {
        if (err) {
            res.send(null)
        } else {
            res.send(result)
        }
    })
})

module.exports = commentsRoute
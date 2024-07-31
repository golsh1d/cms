let express = require('express')
let sqlConnection = require('./../DB/cmsShop')
let commentsRoute = express.Router()

commentsRoute.get('/', (req , res) => {
    let selectAllCommentsQuery = `SELECT comments.id , comments.body , comments.date , comments.hour , comments.isActive , comments.isReply , comments.userId , users.firstName , comments.productId , products.title , comments.adminId , admins.userName FROM comments INNER JOIN users ON users.id = comments.userId INNER JOIN products ON products.id = comments.productId INNER JOIN admins ON admins.id = comments.adminId;`
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
    let updateCommentQuery = `UPDATE comments SET body='${body.body}' WHERE id = ${commentId}`
    sqlConnection.query(updateCommentQuery , (err , result) => {
        if (err) {
            res.send(null)
        } else {
            res.send(result)
        }
    })
})

commentsRoute.put('/active-comment/:commentId/:isActive' , (req , res) => {
    let commentId = req.params.commentId
    let isActive = req.params.isActive
    let updateIsActiveQuery = `UPDATE comments SET isActive=${isActive} WHERE id = ${commentId}`
    sqlConnection.query(updateIsActiveQuery , (err , result) => {
        if (err) {
            res.send(null)
        } else {
            res.send(result)
        }
    })
})

commentsRoute.post('/' , (req , res) => {
    let body = req.body
    let addCommentQuery = `INSERT INTO comments(replyId, body, date, hour, userId, productId, isActive, isReply, adminId) VALUES (${body.replyId} ,'${body.body}','${body.date}','${body.hour}',${body.userId},${body.productId},${body.isActive},${body.isReply},${body.adminId})`
    sqlConnection.query(addCommentQuery , (err , result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
})

module.exports = commentsRoute
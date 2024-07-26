let mysql = require('mysql')

let sqlConnection = mysql.createConnection ({
    host : 'localhost' ,
    user : 'root' ,
    password : '' ,
    database : 'cms-shop'
})

module.exports = sqlConnection
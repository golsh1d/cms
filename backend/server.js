let express = require('express')
let cors = require('cors')
let bodyParser = require('body-parser')
let productsRouter = require('./routes/productsRoute')
let commentsRouter = require('./routes/commentsRoute')
let usersRouter = require('./routes/usersRoute')
let ordersRouter = require('./routes/ordersRoute')

let app = express()
app.use(cors())
app.use(bodyParser.json())

app.use('/api/products' , productsRouter)
app.use('/api/comments' , commentsRouter)
app.use('/api/users' , usersRouter)
app.use('/api/orders' , ordersRouter)

app.listen(3000)
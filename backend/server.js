let express = require('express')
let cors = require('cors')
let bodyParser = require('body-parser')
let productsRouter = require('./routes/productsRoute')

let app = express()
app.use(cors())
app.use(bodyParser.json())

app.use('/api/products' , productsRouter)

app.listen(3000)
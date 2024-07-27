let express = require('express')
let cors = require('cors')
let bodyParser = require('body-parser')

let app = express()
app.use(cors())
app.use(bodyParser.json())

app.listen(3000)
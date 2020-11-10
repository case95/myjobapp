const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const router = require('./routes/routes')
const config = require('./config/config')
const { sequelize } = require('./models')

const app = express()

app.use(cors())
app.use(bodyParser.json({ limit: '3000kb' }))

app.use(router)

//we want to create our database before we start our server
sequelize.sync().then(() => {
  app.listen(config.port)
  console.log(`Server started on port ${config.port}`)
})

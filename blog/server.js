import express from 'express'
import dotenv from 'dotenv'
import connectDb from './db/connect.js'
import notfound from './middlewares/notfound.js'
import errorHandler from './middlewares/errorHandler.js'

dotenv.config()
// implementing the main app
const app = express()
const port = process.env.PORT || 5000

app.get('/api/v1/blog/', function (req, res) {
  res.send('<h1>Welcome to the blog</h1>')
})

app.use(errorHandler)
app.use(notfound)

app.listen(port, async () => {
  await connectDb(process.env.MONGO_URI)
  console.log(`server listing on port ${port}`)
})

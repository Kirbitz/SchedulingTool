import Express from 'express'
import dataRouter from './api/dataHelper.js'

// Creates a new Express app to run locally on a machine
const app = new Express()

// Logs all request made to the server
app.use((req, response, next) => {
  console.log(`${req.method} at ${req.path}`)
  next()
})

// Connects the dataRouter endpoint to the many entry
app.use('/data', dataRouter)

// Serves the static page to the base URL
app.use(Express.static('public'))

// Connection created at "localhost:8000"
app.listen(8000)
console.log('Listening on port 8000')

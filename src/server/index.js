import express from 'express'

// Build app
const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 3000

app.use(express.static('public'))

server.listen(port, () => console.log(`Listening on port ${port}`))

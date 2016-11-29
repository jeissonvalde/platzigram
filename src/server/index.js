import http from 'http'
import express from 'express'

// Build app
const app = express()
// const server = http.createServer(app)
const port = process.env.PORT || 3000

app.set('view engine', 'pug');

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/signup', (req, res) => {
  res.render('index')
})

app.get('/signin', (req, res) => {
  res.render('index')
})

app.listen(port, () => console.log(`Listening on port ${port}`))

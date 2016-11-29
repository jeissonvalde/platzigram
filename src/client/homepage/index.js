var page = require('page')

page('/', (ctx, next) => {
  main.innerHTML = '<a href="/signup">Signup</a>'
})
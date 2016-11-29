var page = require('page')

var main = document.getElementById('main-container')

page('/', (ctx, next) => {
  main.innerHTML = 'Home <a href="/signup">Pagina 2</a>' // home
})

page('/signup', (ctx, next) => {
  main.innerHTML = 'Signup <a href="/">Pagina 1</a>' // signup
})

page();

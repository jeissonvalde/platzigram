import http from 'http'
import express from 'express'
import multer from 'multer'
import ext from 'file-extension'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import expressSession from 'express-session'
import config from './config'
import passport from 'passport'
import auth from './auth'
import platzigram from 'platzigram-client'

// Build app
const app = express()
// const server = http.createServer(app)
const port = process.env.PORT || 5050
// Estanciar platzigram-client
const client = platzigram.createClient(config.client)

// Almacenamiento de imagenes
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/server/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, + Date.now() + '.' + ext(file.originalname))
  }
});

var upload = multer({ storage: storage }).single('picture');

// Definición de middlewares para Passport en local
app.set(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(expressSession({
  secret: config.secret,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'pug')

app.use(express.static('public'))

passport.use(auth.localStrategy)
passport.use(auth.facebookStrategy)
passport.deserializeUser(auth.deserializeUser)
passport.serializeUser(auth.serializeUser)

app.get('/', (req, res) => {
  res.render('index', { title: 'Platzigram' })
})

app.get('/signup', (req, res) => {
  res.render('index', { title: 'Registro en Platzigram' })
})

app.post('/signup', (req, res) => {
  var user = req.body;
  client.saveUser(user, (err, usr) => {
    if (err) return res.status(500).send(err.message)

    res.redirect('/signin')
  })
})

app.get('/signin', (req, res) => {
  res.render('index', { title: 'Entra a Platzigram' })
})

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/signin'
}))

app.get('/logout', function logoutEP (req, res) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
})

app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }))

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/signin'
}))

function ensureAuth (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.status(401).send({ error: 'not authenticated' })
}

app.get('/whoami', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json(req.user)
  }

  res.json({ auth: false })
})

app.get('/api/pictures', (req, res, next) => {
  /* var pictures = [
    {
      user: {
        username: 'JeissonValde',
        avatar: 'https://pbs.twimg.com/profile_images/626849450665877504/wzFzZ2MS.jpg'
      },
      url: 'http://materializecss.com/images/sample-1.jpg',
      comments: 0,
      likes: 12,
      liked: true,
      createdAt: new Date().getTime()
    },
    {
      user: {
        username: 'Aczino',
        avatar: 'http://vignette2.wikia.nocookie.net/rap/images/f/f6/Aczino_imagen.png/revision/latest/scale-to-width-down/236?cb=20161029094231&path-prefix=es'
      },
      url: 'http://materializecss.com/images/sample-1.jpg',
      comments: 1,
      likes: 0,
      liked: false,
      createdAt: new Date().setDate(new Date().getDate() - 10)
    }
  ]; */

  client.listPictures(function (err, pictures) {
    if (err) return res.send([]) 

    res.send(pictures);
    /* setTimeout(() => {
      res.send(pictures);
    }, 1000) */
  })
})

app.post('/api/pictures', ensureAuth, function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.send(500, `Error uploading file ${err.message}`)
      console.log(err.message)
    }
    
    var user = req.user
    var token = req.user.token
    var username = req.user.username
    var src = './src/server/uploads'

    client.savePicture({
      src: src,
      userId: username,
      user: {
        username: username,
        avatar: user.avatar,
        name: user.name
      }
    }, token, function (err, img) {
      if (err) {
        return res.status(500).send(err.message)
        console.log(err.message)
      }

      res.send(`File uploaded successfull`)
    })
  })
})

app.get('/api/user/:username', (req, res) => {
  const user = {
    username: `${req.params.username}`,
    fullname: 'Aczino Hernandez',
    avatar: 'https://pbs.twimg.com/profile_images/626849450665877504/wzFzZ2MS.jpg',
    pictures: [
      {
        id: 1,
        src: 'http://frasesbonitasweb.com/wp-content/uploads/2016/07/nuevos.jpg',
        likes: 4
      },
      {
        id: 2,
        src: 'http://4.bp.blogspot.com/-3veCNx3vL-0/VcEX6Byv4kI/AAAAAAAAIUM/Nl67AbouGIQ/s1600/FB_IMG_1438484406493.jpg',
        likes: 0
      },
      {
        id: 3,
        src: 'http://www.lapatria.com/sites/default/files/fotosencontenido/2015/Nov/atanasio_web.jpg',
        likes: 3
      },
      {
        id: 4,
        src: 'http://www.ambientalex.info/_admin/boletin/images/noticias/oz.jpg',
        likes: 15
      },
      {
        id: 5,
        src: 'http://www.ambientalex.info/_admin/boletin/images/noticias/oz.jpg',
        likes: 89
      },
      {
        id: 6,
        src: 'http://www.lapatria.com/sites/default/files/fotosencontenido/2015/Nov/atanasio_web.jpg',
        likes: 3
      }
    ]
  }

  res.send(user)
})

app.get('/user/:username', (req, res) => {
  res.render('index', { title: `${req.params.username} en Platzigram` })
})

app.get('/user/:username/:id', (req, res) => {
  res.render('index', { title: `${req.params.username} en Platzigram` })
})

app.listen(port, () => console.log(`Listening on port ${port}`))

/*
    Hay un archivo de hosts que me permite configurar las ip locales con un dominio.
    Este, está ubicado en la dirección: /etc/hosts
*/

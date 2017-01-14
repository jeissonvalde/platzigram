import platzigram from 'platzigram-client'
import config from '../config'
const LocalStrategy = require('passport-local').Strategy

const client = platzigram.createClient(config.client)

exports.localStrategy = new LocalStrategy((username, password, done) => {
  client.auth(username, password, (err, token) => {
    if (err) {
      return done(null, false, { message: 'username and/or password not found' })
    }

    client.getUser(username, (err, user) => {
      if (err) {
        return done(null, false, { message: `an error ocurred ${err.message}` })
      }

      user.token = token
      return done(null, user)
    })
  })
})

exports.serializeUser = function (user, done) {
  done(null, {
    username: user.username,
    token: user.token
  })
}

exports.deserializeUser = function (user, done) {
  client.getUser(user.username, (err, usr) => {
    usr.token = user.token
    done(err. usr)
  })
}

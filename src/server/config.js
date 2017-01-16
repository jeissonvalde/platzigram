'use strict'

const config = {
  aws: {
    accessKey: process.env.AWS_ACCESS_KEY,
    secretKey: process.env.AWS_SECRET_KEY
  },
  client: {
    endpoints: {
      pictures: 'http://api.platzigram.com/picture',
      users: 'http://api.platzigram.com/user',
      auth: 'http://api.platzigram.com/auth'
    }
  },
  auth: {
    facebook: {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FAVEBOOK_CLIENT_SECRET,
      callbackURL: 'http://platzigram.com/auth/facebook/callback'
    }
  },
  secret: process.env.PLATZIGRAM_SECRET || 'pl4tZi'
}

if (process.env.NODE_ENV !== 'production') {
  config.client.endpoints = {
    pictures: 'http://localhost:5000',
    users: 'http://localhost:5001',
    auth: 'http://localhost:5002'
  }

  config.auth.facebook.callbackURL = 'http://platzigram.test:5050/auth/facebook/callback'
}

module.exports = config

/***
 **
 *
   Para definir las variables de entorno, hay una opción,
   1. crear archivo 'env.sh' en el servidor, y escribir allí estas variables.
   2. Hacer una prueba si existe la(s) variable de entorno con '$ echo $AWS_ACCESS_KEY'
      Me debe imprimir algo, o un error. Si ya existe una variable de entorno con este nombre,
      debo setear nuevamente la variable.
   3. Setear las variables con '$ source env.sh' Llamando al archivo se setean las variables.
   4. Comprobar la conexión con la API.
*/

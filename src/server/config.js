'use strict'

const config = {
  aws: {
    accessKey: process.env.AWS_ACCESS_KEY,
    secretKey: process.env.AWS_SECRET_KEY
  }
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

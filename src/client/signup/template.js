var yo = require('yo-yo')


module.export = yo`<div class="container">
                      <div class="row">
                        <div class="col s10 push-s1">
                          <div class="row">
                            <div class="col m5 hide-on-small-only">
                              <img src="images/iphone.png" class="iphone">
                            </div>
                            <div class="col s12 m7">
                              <div class="row">
                                <div class="signup-box">
                                  <h1 class="platzigram">Platzigram</h1>
                                  <form class="signup-form">
                                    <h2>Regístrate para ver fotos de tus amigos estudiando en Platzi</h2>
                                    <div class="section">
                                      <a class="btn btn-fb hiden-on-small-only">Iniciar sesión con Facebook</a>
                                      <a class="btn btn-fb hiden-on-med-up">Iniciar sesión</a>
                                    </div>
                                    <div class="divider"></div>
                                    <div class="section">
                                      <input type="email" name="email" placeholder="Correo electrónico">
                                      <input type="text" name="name" placeholder="Nombre completo">
                                      <input type="text" name="username" placeholder="Nombre de usuario">
                                      <input type="password" name="password" placeholder="Contraseña">
                                      <button class="btn waves-effect waves-light btn-signup" type="submit">Regístrate</button>
                                    </div>
                                  </form>
                                </div>              
                              </div>
                              <div class="row">
                                <div class="login-box">
                                  ¿Tienes una cuenta? <a href="/singin">Entrar</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>`
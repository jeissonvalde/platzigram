var page = require('page');
var title = require('title');
var empty = require('empty-element');
var template = require('./template');
var request = require('superagent');
var header = require('../header');
var axios = require('axios');
var webcam = require('webcamjs');
var picture = require('../picture-card');

page('/', header, loading, asyncLoad, function (ctx, next) {
  title('Platzigram');
  var main = document.getElementById('main-container');

  empty(main).appendChild(template(ctx.pictures));

  const picturePreview = $('#picture-preview');
  const cameraInput = $('#camara-input');
  const cancelPicture = $('#cancelPicture');
  const shootButton = $('#shoot');
  const uploadButton = $('#uploadBtn');
  
  function reset() {
    picturePreview.addClass('hide');
    cancelPicture.addClass('hide');
    uploadButton.addClass('hide');
    shootButton.removeClass('hide');
    cameraInput.removeClass('hide');
  }

  cancelPicture.click(reset);

  $(document).ready(function () {
    $('.modal').modal({
      ready: function () {
        // body, discharge
        webcam.attach('#camara-input');
        shootButton.click(ev => {
          webcam.snap(data_uri => {
            picturePreview.html(`<img src="${data_uri}" />`);
            picturePreview.removeClass('hide');
            cancelPicture.removeClass('hide');
            uploadButton.removeClass('hide');
            shootButton.addClass('hide');
            cameraInput.addClass('hide');
            uploadButton.off('click');
            uploadButton.click(() => {
              const pic = {
                url: data_uri,
                likes: 0,
                liked: false,
                comments: 0,
                createdAt: +new Date(),
                user: {
                  username: 'Andrés Manrique',
                  avatar: 'http://i.ebayimg.com/t/Fight-Club-In-Tyler-we-trust-cult-movie-T-Shirt-BlackSheepShirts-Brad-Pitt-/00/s/MTAwMFgxMDAw/$T2eC16hHJGoE9nuQhoOOBQ(rRbgoz!~~60_35.JPG'
                }
              }

              $('#picture-cards').prepend(picture(pic));
              reset();
              $('#modalCamara').modal('close');
            })
          })
        })
      },
      complete: function () {
        // body, close
        webcam.reset();
        reset();
      }
    })
  });
})

function loadPictures(ctx, next) {
  request
    .get('/api/pictures')
    .end(function (err, res) {
      if (err) return console.log(err);

      ctx.pictures = res.body;
      next();
    })
}

function loadPicturesAxios(ctx, next) {
  axios
    .get('/api/pictures')
    .then(function (res) {
      ctx.pictures = res.data;
      next();
    })
    .catch(function (err) {
      console.log(err);
    })
}

function loadPicturesFetch(ctx, next) {
  fetch('/api/pictures')
    .then(function (res) {
      return res.json();
    })
    .then(function (pictures) {
      ctx.pictures = pictures;
      next();
    })
    .catch(function (err) {
      console.log(err);
    })
}

async function asyncLoad(ctx, next) {
  try {
    ctx.pictures = await fetch('/api/pictures').then(res => res.json())
    next();
  } catch (err) {
    return console.log(err);
  }
}

function loading(ctx, next) {
  var el = document.createElement('div');
  el.classList.add('loader');
  document.getElementById('main-container').appendChild(el);
  setTimeout(function wait() {
    next();
  }, 2000);
}

/* ASÍ SE VERÍAN LOS CALLBACKS CON AXIOS
function loadPicturesAxios(ctx, next) {
  axios
    .get('/api/pictures')
    .then(function (res) {
      ctx.pictures = res.data;
      var pic = ctx.pictures[0];
      return axios.get('/api/pictures/${pic.id}')
      next();
    })
    .then(function (res) {
      ctx.pictures = res.data;
      next();
    })
    .catch(function (err) {
      console.log(err);
    })
}
*/


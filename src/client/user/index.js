import page from 'page'
import empty from 'empty-element'
import template from './template'
import title from 'title'
import translate from '../translate'
import header from '../header'

page('/:username', header, loadUser, function (ctx, next) {
  title(`${ translate.message('user.profile')} ${ctx.user.username}`)
  var main = document.getElementById('main-container');
  empty(main).appendChild(template(ctx.user));
  $('.modal').modal();
})

page('/:username/:id', header, loadUser, function (ctx, next) {
  title(`${ translate.message('user.profile')} ${ctx.user.username}`)
  var main = document.getElementById('main-container');
  empty(main).appendChild(template(ctx.user));
  $(`#modal${ctx.params.id}`).modal('open');
})

async function loadUser (ctx, next) {
  try {
    ctx.user = await fetch(`/api/user/${ctx.params.username}`).then(res => res.json())
    next()
  } catch (err) {
    console.log(err)
  }
}

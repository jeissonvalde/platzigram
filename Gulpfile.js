var gulp = require('gulp')
var sass = require('gulp-sass')
var rename = require('gulp-rename')
var babel = require('babelify')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var watchify = require('watchify')

gulp.task('styles', function() {
  gulp
    .src('src/server/index.scss')
    .pipe(sass())
    .pipe(rename('styles.css'))
    .pipe(gulp.dest('public/css'));
})

gulp.task('assets', () => {
  gulp
    .src('assets/*')
    .pipe(gulp.dest('public/images'));
})

function compile(watch) {
  var bundle = watchify(browserify('src/client/index.js'))
  
  function rebundle() {
    bundle
      .transform(babel)
      .bundle()
      .pipe(source('index.js'))
      .pipe(rename('scripts.js'))
      .pipe(gulp.dest('public'));
  }

  if (watch) {
    bundle.on('update', () => {
      console.log(`--> Bundling...`);
      rebundle();
    })
  }

  rebundle();
}


gulp.task('build', () => {
  return compile();
});

gulp.task('watch', () => {
  return compile(true);
});

gulp.task('default', ['styles', 'assets', 'build'])

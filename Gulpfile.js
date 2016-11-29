var gulp = require('gulp')
var sass = require('gulp-sass')
var rename = require('gulp-rename')
var babel = require('babelify')
var browserify = require('browserify')
var source = require('vinyl-source-stream')

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
    .pipe(gulp.dest('public'));
})

gulp.task('scripts', () => {
  browserify('src/client/index.js')
  .transform(babel)
  .bundle()
  .pipe(source('index.js'))
  .pipe(rename('scripts.js'))
  .pipe(gulp.dest('public'))

})

gulp.task('default', ['styles', 'assets', 'scripts'])

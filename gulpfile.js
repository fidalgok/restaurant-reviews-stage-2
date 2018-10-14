var gulp = require('gulp');
var sass = require('gulp-sass');
var bs = require('browser-sync').create();
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('sass', function() {
  return gulp
    .src('./css/sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'))
    .pipe(bs.reload({ stream: true }));
});

gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('./css/sass/**/*.scss', ['sass']);
  gulp.watch('./*.html').on('change', bs.reload);
  gulp.watch('./js/**/*.js').on('change', bs.reload);
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });
});

gulp.task('javascript', function() {
  return browserify('./js/main.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())

    .pipe(uglify())

    .pipe(gulp.dest('./dist/js/'));
});

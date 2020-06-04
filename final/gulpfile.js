const gulp = require('gulp');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const terser = require('gulp-terser');
const rename = require('gulp-rename');

gulp.task('styles:merge', () => {
  return gulp.src('less/style.less')
    .pipe(less())
    .pipe(postcss([
      require('autoprefixer'),
      require('postcss-csso'),
    ]))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('styles:pack', () => {
  return gulp.src('less/style.less')
    .pipe(less())
    .pipe(gulp.dest('css'));
});

gulp.task('js', () => {
  return gulp.src('js/script.js')
    .pipe(terser())
    .pipe(rename({
      suffix: '.min'
    }))
  .pipe(gulp.dest('js'));
});

gulp.task('default', gulp.series(
  'less',
  'js',
));

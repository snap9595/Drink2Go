const autoprefixer = require('autoprefixer');
const csso = require('postcss-csso');
const gulp = require('gulp');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sync = require('browser-sync');
const terser = require('gulp-terser');

const styles = () => {
  return gulp.src('less/style.less')
    .pipe(less())
    .pipe(postcss([
      autoprefixer,
      csso,
    ]))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('css'))
    .pipe(sync.stream());
}

exports.styles = styles;

const scripts = () => {
  return gulp.src('js/script.js')
    .pipe(terser())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('js'))
    .pipe(sync.stream());
}

exports.scripts = scripts;

const server = sync.create();

const reload = (done) => {
  server.reload();
  done();
}

const serve = (done) => {
  server.init({
		ui: false,
		notify: false,
		server: {
			baseDir: '.'
		},
  });
  done();
}

const watch = () => {
  gulp.watch('less/**/*.less', gulp.series(styles, reload));
  gulp.watch('js/script.js', gulp.series(scripts, reload));
}

exports.default = gulp.series(
  styles, scripts, serve, watch
);

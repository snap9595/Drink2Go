const gulp = require('gulp');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const sync = require('browser-sync').create();

gulp.task('styles:pack', () => {
  return gulp.src('less/style.less')
    .pipe(less())
    .pipe(postcss([
      require('autoprefixer'),
      require('postcss-csso'),
    ]))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('css'))
    .pipe(sync.stream());
});

gulp.task('styles:merge', () => {
  return gulp.src('less/style.less')
    .pipe(less())
    .pipe(gulp.dest('css'))
    .pipe(sync.stream());
});

gulp.task('js', () => {
  return gulp.src('js/script.js')
    .pipe(terser())
    .pipe(rename({
      suffix: '.min'
    }))
  .pipe(gulp.dest('js'))
  .pipe(sync.stream());
});

gulp.task('server', () => {
	sync.init({
		ui: false,
		notify: false,
		server: {
			baseDir: '.'
		}
	});
	gulp.watch([
    '*.html',
    'less/**/*.less',
    'js/script.js',
  ]).on('change', () => {
    sync.reload();
  });
});

gulp.task('default', gulp.series(
  'styles:merge',
  'js',
  'server',
));

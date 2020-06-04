import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import gulp from 'gulp';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import sync from 'browser-sync';
import terser from 'gulp-terser';

export const styles = () => {
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

export const scripts = () => {
  return gulp.src('js/script.js')
    .pipe(terser())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('js'))
    .pipe(sync.stream());
}

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

export default gulp.series(
  styles, scripts, serve, watch
);

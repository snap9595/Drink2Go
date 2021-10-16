В 8 разделе мы написали код для сборки проекта. Ниже мы предоставляем исходный код сборки для того, чтобы вы смогли
сравнить его со своим кодом .

**package.json**

```json
{
  "private": true,
  "devDependencies": {
    "@htmlacademy/editorconfig-cli": "1.0.0",
    "autoprefixer": "10.0.4",
    "browser-sync": "2.26.13",
    "del": "6.0.0",
    "gulp": "4.0.2",
    "gulp-htmlmin": "5.0.1",
    "gulp-imagemin": "7.1.0",
    "gulp-less": "4.0.1",
    "gulp-plumber": "1.2.1",
    "gulp-postcss": "9.0.0",
    "gulp-rename": "2.0.0",
    "gulp-sourcemaps": "3.0.0",
    "gulp-svgstore": "7.0.1",
    "gulp-uglify": "3.0.2",
    "gulp-webp": "4.0.1",
    "postcss": "8.1.10",
    "postcss-csso": "5.0.0",
    "stylelint": "13.8.0",
    "stylelint-config-htmlacademy": "0.1.4"
  },
  "scripts": {
    "editorconfig": "editorconfig-cli",
    "stylelint": "stylelint \"src/less/**/*.less\" --syntax less",
    "test": "npm run editorconfig && npm run stylelint",
    "build": "gulp build",
    "start": "gulp"
  },
  "browserslist": [
    "last 2 versions",
    "not dead",
    "not ie <= 11"
  ],
  "editorconfig-cli": [
    "*.json",
    "*.js",
    "src/*.html",
    "src/js/**/*.js",
    "src/img/**/*.svg",
    "src/less/**/*.less"
  ],
  "engines": {
    "node": "14.15.0"
  }
}
```

**gulpfile.js**

```javascript
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");
const sync = require("browser-sync").create();

// Styles

const styles = () => {
  return gulp.src("src/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// HTML

const html = () => {
  return gulp.src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
}

// Scripts

const scripts = () => {
  return gulp.src("src/js/script.js")
    .pipe(uglify())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
}

exports.scripts = scripts;

// Images

const images = () => {
  return gulp.src("src/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
}

exports.images = images;

// WebP

const createWebp = () => {
  return gulp.src("src/img/**/*.{jpg,png}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"))
}

exports.createWebp = createWebp;

// Sprite

const sprite = () => {
  return gulp.src("src/img/icons/*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
}

exports.sprite = sprite;

// Copy

const copy = (done) => {
  gulp.src([
    "src/fonts/*.{woff2,woff}",
    "src/*.ico",
    "src/img/**/*.{jpg,png,svg}",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
  done();
}

exports.copy = copy;

// Clean

const clean = () => {
  return del("build");
};

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Reload

const reload = done => {
  sync.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch("src/less/**/*.less", gulp.series(styles));
  gulp.watch("src/js/script.js", gulp.series(scripts));
  gulp.watch("src/*.html", gulp.series(html, reload));
}

// Build

const build = gulp.series(
  clean,
  gulp.parallel(
    styles,
    html,
    scripts,
    sprite,
    copy,
    images,
    createWebp
  ));

exports.build = build;

// Default

exports.default = gulp.series(
  clean,
  gulp.parallel(
    styles,
    html,
    scripts,
    sprite,
    copy,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  ));
```

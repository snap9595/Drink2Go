'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    csscomb = require('gulp-csscomb'),
    cssbeautify = require('gulp-cssbeautify'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyjs = require('gulp-js-minify'),
    rename = require("gulp-rename");

gulp.task('less', function () {
  return gulp.src('./less/*.less')
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(csscomb())
    .pipe(cssbeautify({
      indent: '  '
    }))
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest('./css'));
});

gulp.task('js', function(){
  return gulp.src('./js/source/*.js')
    .pipe(minifyjs())
    .pipe(rename({
      suffix: ".min"
    }))
  .pipe(gulp.dest('./js'));
});


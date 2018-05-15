'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    csscomb = require('gulp-csscomb'),
    cssbeautify = require('gulp-cssbeautify');

gulp.task('less', function () {
  return gulp.src('./less/*.less')
    .pipe(less())
    .pipe(cssbeautify({
      indent: '  '
    }))
    .pipe(gulp.dest('./css'));
});

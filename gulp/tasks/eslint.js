'use strict';

var eslint = require('gulp-eslint');
var gulp = require('gulp');

gulp.task('eslint', function() {
  return gulp.src(['./index.js', './{app,gulp,routes}/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

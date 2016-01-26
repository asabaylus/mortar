'use strict';

var gulp = require('gulp');
var sassLint = require('gulp-sass-lint')

gulp.task('test', function(){
  gulp.src('app/styles/**/*.scss')
  .pipe(sassLint())
  .pipe(sassLint.format())
  .pipe(sassLint.failOnError())
});

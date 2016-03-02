'use strict';

var gulp = require('gulp');
var sassLint = require('gulp-sass-lint')
var eslint = require('gulp-eslint');

gulp.task('test', [
  'eslint',
  'sasslint'
]);

gulp.task('eslint', function(){
  return gulp.src('app/{scripts,modules}/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('sasslint', function(){
  return gulp.src('app/{styles,modules}/**/*.scss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

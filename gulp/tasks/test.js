'use strict';

const gulp = require('gulp');
const sassLint = require('gulp-sass-lint')
const eslint = require('gulp-eslint');

gulp.task('test', [
  'eslint',
  'sasslint',
  'karma'
]);

gulp.task('eslint', function(){
  return gulp.src('app/{scripts,modules}/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('sasslint', function(){
  return gulp.src([
    'app/{styles,modules}/**/*.scss',
    '!app/styles/layout/_columns.scss'
  ])
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

// NOTE: keep an eye on https://github.com/sasstools/sass-lint/issues/70
// This way we can get rid of all the warnings in the test output

'use strict';

var gulp = require('gulp');

gulp.task('build', [
  'clean',
  'docs',
  'scripts',
  'styles',
  'icons'
]);

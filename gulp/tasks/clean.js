'use strict';

const gulp = require('gulp');
const del = require('del');

gulp.task('clean', function () {
  return del([
    '.tmp',
    'lib',
    'packages/pestle/**/*.js',
    'packages/pestle/README.md'
  ]);
});

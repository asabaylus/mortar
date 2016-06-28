'use strict';

const gulp = require('gulp');
const del = require('del');

gulp.task('clean', function () {
  return del([
    '.tmp',
    'packages/pestle/**/*.js'
  ]);
});

'use strict';

const gulp = require('gulp');

const paths = require('./paths');

gulp.task('copy', function() {
  // styles
  gulp.src(paths.mortarStylesSrc, {base: './src/'})
    .pipe(gulp.dest(paths.mortarDest));
});

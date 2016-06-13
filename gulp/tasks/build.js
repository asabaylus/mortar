'use strict';

const gulp = require('gulp');
// const argv = require('yargs')
//             .alias('p', 'production')
//             .argv;

gulp.task('build', [
  'scripts',
  'styles',
  'docs'
], function() {
  // if (argv.p) {
  //   return gulp.src('.tmp/assets/**/*')
  //     .pipe(gulp.dest('.tmp/site'));
  // }
});

gulp.task('prodBuild', [
  'prodScripts',
  'prodStyles',
  'docs'
], function() {
  return gulp.src('.tmp/assets/**/*')
    .pipe(gulp.dest('.tmp/site'));
});

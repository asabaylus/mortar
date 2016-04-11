'use strict';

const gulp = require('gulp');
const argv = require('yargs')
            .alias('p', 'production')
            .argv;

gulp.task('build', [
  'clean',
  'scripts',
  'styles',
  'docs'
], function() {
  if (argv.p) {
    console.log(argv.p);
    return gulp.src('.tmp/assets/{scripts,styles}/**/*')
      .pipe(gulp.dest('.tmp/site'));
  }
});

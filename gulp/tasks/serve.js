'use strict';

var bs = require('browser-sync').get('mortar');
var gulp = require('gulp');
var sass = require('gulp-sass');

// Static server
gulp.task('serve', ['clean', 'build', 'sass'], function() {
  bs.init({
    open: 'external',
    server: '.tmp',
    xip: true
  });

  gulp.watch('app/styles/*.scss', ['sass']);
  gulp.watch('app/site/**/*.{md,html}', ['build']);

  // since the wintersmith files aren't created in a gulp stream it appears
  // gulp watch has trouble with them. thankfully browsersync's watch does not
  bs.watch('.tmp/**/*.html').on('change', bs.reload);
});

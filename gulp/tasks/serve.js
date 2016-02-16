'use strict';

var bs = require('browser-sync').get('mortar');
var gulp = require('gulp');
var sass = require('gulp-sass');

// Static server
gulp.task('serve', ['clean', 'build', 'styles', 'icons'], function() {
  bs.init({
    open: 'external',
    server: {
      baseDir: [
        '.tmp/site',
        '.tmp/assets'
      ]
    },
    xip: true
  });

  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/**/*.{md,html}', ['build']);

  // since the wintersmith files aren't created in a gulp stream it appears
  // gulp watch has trouble with them. thankfully browsersync's watch does not
  bs.watch('.tmp/**/*.html').on('change', bs.reload);
});

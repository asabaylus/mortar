'use strict';

var bs = require('browser-sync').get('mortar');
var gulp = require('gulp');
var sass = require('gulp-sass');

// Static server
gulp.task('serve', ['build'], function() {
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

  gulp.watch('app/icons/*.svg', ['icons']);
  gulp.watch('app/{styles,modules}/**/*.scss', ['styles']);
  gulp.watch('app/{styles,modules}/**/*.js', ['scripts']);
  gulp.watch('app/**/*.{md,html}', ['docs']);

  // since the wintersmith files aren't created in a gulp stream it appears
  // gulp watch has trouble with them. thankfully browsersync's watch does not
  bs.watch('.tmp/site/**/*.html').on('change', bs.reload);
  bs.watch('.tmp/assets/**/*.svg').on('change', bs.reload);
  bs.watch('.tmp/assets/scripts/*.js').on('change', bs.reload);
});

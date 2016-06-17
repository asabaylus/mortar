'use strict';

const bs = require('browser-sync').get('mortar');
const gulp = require('gulp');
const sass = require('gulp-sass');
const argv = require('yargs')
            .usage('Usage: gulp serve [-s startPath]')
            .option('s', {
              alias: 'start',
              describe: 'optional startPath that the browser will open at',
              requiresArg: 's',
              type: 'string'
            })
            .argv;
const startPath = argv.s ? '/' + argv.s : null;

// Static server
gulp.task('serve', ['build'], function() {
  bs.init({
    open: 'external',
    startPath: startPath,
    server: {
      baseDir: [
        '.tmp/site',
        '.tmp/assets'
      ]
    },
    xip: true
  });

  gulp.watch('app/icons/*.svg', ['icons']);
  gulp.watch('app/{styles,modules,icons}/**/*.scss', ['styles']);
  gulp.watch('app/{scripts,modules}/**/*.{js,jsx}', ['scripts']);
  gulp.watch('app/**/*.{md,html}', ['docs']);
  gulp.watch('.tmp/assets/symbol/svg/*.svg', ['docs']);

  // since the wintersmith files aren't created in a gulp stream it appears
  // gulp watch has trouble with them. thankfully browsersync's watch does not
  bs.watch('.tmp/site/**/*.html').on('change', bs.reload);
  bs.watch('.tmp/assets/*.svg').on('change', bs.reload);
  bs.watch('.tmp/assets/scripts/*.js').on('change', bs.reload);
});

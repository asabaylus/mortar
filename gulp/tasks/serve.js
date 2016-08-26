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

const paths = require('./paths');

// Static server
gulp.task('serve', ['build'], function() {
  bs.init({
    open: 'external',
    startPath: startPath,
    server: {
      baseDir: [
        paths.siteDest,
        paths.mortarDest
      ]
    },
    xip: true
  });

  gulp.watch(paths.mortarIconsSrc, ['icons']);
  gulp.watch(paths.mortarSrc + '{styles,modules,icons,contentPackages}/**/*.scss', ['styles']);
  gulp.watch(paths.mortarSrc + '{scripts,modules,contentPackages}/**/*.{js,jsx}', ['scripts']);
  gulp.watch(paths.mortarSrc + '**/*.{md,html}', ['docs']);
  gulp.watch(paths.mortarDest + 'lib/symbol/svg/*.svg', ['docs']);

  // since the wintersmith files aren't created in a gulp stream it appears
  // gulp watch has trouble with them. thankfully browsersync's watch does not
  bs.watch(paths.siteDest + '**/*.html').on('change', bs.reload);
  bs.watch(paths.mortarDest + '*.svg').on('change', bs.reload);
  bs.watch(paths.mortarDest + 'scripts/*.js').on('change', bs.reload);
});

'use strict';

const gulp  = require('gulp');
const svgSprite = require('gulp-svg-sprite');
const config = {
  mode: {
    symbol: {
      dest: '.',
      sprite: 'mortar-symbol-sprite.svg'
    }
  },
  log                   : null,                     // Logging verbosity (default: no logging)
  shape                 : {
    spacing             : {                         // Spacing related options
      padding           : 2,                        // Padding around all shapes
      box               : 'content'                 // Padding strategy (similar to CSS `box-sizing`)
    },
    transform           : ['svgo'],                 // List of transformations / optimizations
  }
};

const iconsDest = 'lib/icons';
const iconZipDest = '.tmp/site';

gulp.task('icons', function() {
  return gulp.src('app/icons/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest(iconsDest));
});

gulp.task('moveIconZip', function() {
  return gulp.src('app/icons/natgeo-icons.zip')
    .pipe(gulp.dest(iconZipDest));
});

'use strict';

var gulp  = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var config = {
  mode: {
    symbol: true,
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

gulp.task('icons', function() {
  return gulp.src('app/icons/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('.tmp/assets'));
});

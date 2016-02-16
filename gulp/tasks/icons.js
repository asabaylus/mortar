'use strict';

var gulp  = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var config = {
  mode: {
    symbol: true
  }
};

gulp.task('icons', function() {
  return gulp.src('app/icons/*.svg')
    .pipe(svgSprite( config ))
    .pipe(gulp.dest('.tmp/assets'));
});

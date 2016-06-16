'use strict';

const gulp  = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('scripts', function(){
  return browserify('./app/scripts/main.js')
    .transform('babelify', {presets: ['es2015', 'stage-0', 'react']})
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./.tmp/assets/scripts'))
});

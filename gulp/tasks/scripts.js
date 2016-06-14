'use strict';

const gulp  = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

gulp.task('scripts', function(){
  return browserify('./app/scripts/main.js')
    .transform('babelify', {presets: ['es2015', 'react']})
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./.tmp/assets/scripts'))
});

gulp.task('prodScripts', function(){
  return browserify('./app/scripts/main.js')
    .transform('babelify', {presets: ['es2015', 'react']})
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./.tmp/assets/scripts'))
});

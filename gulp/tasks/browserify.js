'use strict';

var babelify = require('babelify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');

// using vinyl-source-stream:
gulp.task('browserify', function() {
  browserify('./app/scripts/main.js', {debug: !gulp.env.production})
    .transform(babelify)
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('public'));
});

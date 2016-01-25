'use strict';

var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    return gulp.src('app/styles/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('public'))
        .pipe(browserSync.stream());
});

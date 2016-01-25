'use strict';

var browserSync = require('browser-sync').create();
var gulp = require('gulp');

// Static server
gulp.task('serve', function() {
    browserSync.init({
        open: 'external',
        proxy: 'dst.dev:3003',
        xip: true
    });

    gulp.watch('app/scss/*.scss', ['sass']);
    gulp.watch('app/scripts/*.js', ['browserify']);
    gulp.watch('app/templates/*.hbs', ['browserify']);
    gulp.watch('public/*.js').on('change', browserSync.reload);
    gulp.watch('views/*.jade').on('change', browserSync.reload);
});

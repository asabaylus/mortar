'use strict';

const gulp = require('gulp');

gulp.task('copy', function() {
  // styles
  gulp.src(['app/styles/**/*.scss', 'app/icons/**/*.scss'], {base: './app/'})
    .pipe(gulp.dest('lib/'));

  // modules
  gulp.src(['app/modules/**/*.{js,jsx,scss,css}', '!app/modules/**/*Pestle.js'])
    .pipe(gulp.dest('lib/modules'));
});

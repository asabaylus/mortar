'use strict';

const bs = require('browser-sync').get('mortar');
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('styles', [
  'stylesMortar',
  'stylesDocs'
]);

gulp.task('stylesMortar', function() {
  return gulp.src('app/styles/*.scss')
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('.tmp/assets/styles/'))
    .pipe(bs.stream({once: true}));
});

gulp.task('stylesDocs', function() {
  return gulp.src('app/site/_styles/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('.tmp/assets/styles/'))
    .pipe(bs.stream({once: true}));
});

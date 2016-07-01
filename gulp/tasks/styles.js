'use strict';

const bs = require('browser-sync').get('mortar');
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');

const docStylesSrc = 'app/site/_styles/*.scss';
const docStylesDest = '.tmp/site/styles/';
const stylesSrc = 'app/styles/*.scss';
const stylesDest = 'lib/styles/';

gulp.task('styles', [
  'stylesMortar',
  'stylesDocs'
]);

gulp.task('prodStyles', [
  'prodStylesMortar',
  'prodStylesDocs'
]);

gulp.task('stylesMortar', function() {
  return gulp.src(stylesSrc)
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(stylesDest))
    .pipe(bs.stream({once: true}));
});

gulp.task('stylesDocs', function() {
  return gulp.src(docStylesSrc)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest(docStylesDest))
    .pipe(bs.stream({once: true}));
});

gulp.task('prodStylesMortar', function() {
  return gulp.src(stylesSrc)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest(stylesDest))
    .pipe(bs.stream({once: true}));
});

gulp.task('prodStylesDocs', function() {
  return gulp.src(docStylesSrc)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest(docStylesDest))
    .pipe(bs.stream({once: true}));
});

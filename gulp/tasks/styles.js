'use strict';

const bs = require('browser-sync').get('mortar');
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

const paths = require('./paths');

gulp.task('styles', [
  'stylesMortar',
  'stylesDocs'
]);

gulp.task('prodStyles', [
  'prodStylesMortar',
  'prodStylesDocs'
]);

gulp.task('stylesMortar', function() {
  return gulp.src(paths.mortarStylesSrc)
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.mortarStylesDest))
    .pipe(bs.stream({once: true}));
});

gulp.task('stylesDocs', function() {
  return gulp.src(paths.siteStylesSrc)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.siteStylesDest))
    .pipe(bs.stream({once: true}));
});

gulp.task('prodStylesMortar', ['stylesMortar'], function() {
  var mortarStylesSrc = paths.mortarStylesDest + '**/*.css';
  return gulp.src(mortarStylesSrc)
    .pipe(cleanCSS({processImport: false}))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.mortarStylesDest))
    .pipe(bs.stream({once: true}));
});

gulp.task('prodStylesDocs', function() {
  return gulp.src(paths.siteStylesSrc)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.siteStylesDest))
    .pipe(bs.stream({once: true}));
});

'use strict';

const gulp  = require('gulp');
const plumber = require("gulp-plumber");
const newer   = require("gulp-newer");
const through = require("through2");
const chalk   = require("chalk");
const babel   = require("gulp-babel");
const gutil   = require("gulp-util");

const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

const packagesSrc = './app/scripts/pestle/src/**/*.js'
const packagesDest = 'packages/pestle';

gulp.task('packages', function() {
  return gulp.src(packagesSrc)
    .pipe(plumber({
      errorHandler: function (err) {
        gutil.log(err.stack);
      }
    }))
    .pipe(newer(packagesDest))
    .pipe(through.obj(function (file, enc, callback) {
      gutil.log("Compiling", "'" + chalk.cyan(file.path) + "'...");
      callback(null, file);
    }))
    .pipe(babel({
      presets: ['es2015', 'stage-0']
    }))
    .pipe(gulp.dest(packagesDest));
});

gulp.task('scripts', function(){
  return browserify('./app/scripts/main.js')
    .transform('babelify', {presets: ['es2015', 'stage-0', 'react']})
    .transform('aliasify', { replacements: {
      '^@natgeo/mortar-pestle$': './app/scripts/pestle/src/main.js',
      '@natgeo\/mortar-pestle\/(.+)' : './app/scripts/pestle/src/$1.js'
    }})
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./.tmp/assets/scripts'))
});

gulp.task('prodScripts', ['packages'], function(){
  return browserify('./app/scripts/main.js')
    .transform('babelify', {presets: ['es2015', 'stage-0', 'react']})
    .transform('aliasify', { replacements: {
      '^@natgeo/mortar-pestle$': './app/scripts/pestle/src/main.js',
      '@natgeo\/mortar-pestle\/(.+)' : './app/scripts/pestle/src/$1.js'
    }})
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./.tmp/assets/scripts'))
});

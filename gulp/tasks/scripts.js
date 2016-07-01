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

const paths = require('./paths');

const packagesSrc = paths.pestleSrc + 'src/**/*.js'
const packagesDest = paths.pestleDest;

gulp.task('packages', function() {
  gulp.src(paths.pestleSrc + 'README.md')
    .pipe(gulp.dest(packagesDest));

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

gulp.task('scripts', ['packages'], function(){
  return browserify('./app/scripts/main.js')
    .transform('babelify', {presets: ['es2015', 'stage-0', 'react']})
    .transform('aliasify', { replacements: {
      '^@natgeo/mortar-pestle$': paths.pestleSrc + 'src/main.js',
      '@natgeo\/mortar-pestle\/(.+)' : paths.pestleSrc + 'src/$1.js'
    }})
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./' + paths.siteDest + 'scripts'))
});

gulp.task('prodScripts', ['packages'], function(){
  return browserify('./app/scripts/main.js')
    .transform('babelify', {presets: ['es2015', 'stage-0', 'react']})
    .transform('aliasify', { replacements: {
      '^@natgeo/mortar-pestle$': paths.pestleSrc + 'src/main.js',
      '@natgeo\/mortar-pestle\/(.+)' : paths.pestleSrc + 'src/$1.js'
    }})
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./' + paths.siteDest + 'scripts'))
});

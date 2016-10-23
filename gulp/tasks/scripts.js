'use strict';

const gulp  = require('gulp');
const plumber = require('gulp-plumber');
const newer   = require('gulp-newer');
const through = require('through2');
const chalk   = require('chalk');
const babel   = require('gulp-babel');
const gutil   = require('gulp-util');

const browserify = require('browserify');
const envify = require('envify');
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
      gutil.log('Compiling', '"' + chalk.cyan(file.path) + '"...');
      callback(null, file);
    }))
    .pipe(babel({
      presets: ['es2015', 'stage-0']
    }))
    .pipe(gulp.dest(packagesDest));
});

gulp.task('scripts', ['packages'], function(){

  gulp.src(paths.mortarModulesSrc)
    .pipe(babel({
      presets: ['es2015', 'react', 'stage-0']
    }))
    .pipe(gulp.dest(paths.mortarDest));

  gulp.src(paths.jquery)
    .pipe(gulp.dest(paths.jqueryDest));

  return browserify('./src/scripts/main.js')
    .transform('babelify', {presets: ['es2015', 'stage-0', 'react']})
    .transform('aliasify', { replacements: {
      '^@natgeo/pestle$': paths.pestleSrc + 'src/main.js',
      '@natgeo\/pestle\/(.+)' : paths.pestleSrc + 'src/$1.js',
      'natgeo-mortar\/lib\/(.+)' : './' + paths.mortarSrc + '$1'
    }})
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./' + paths.siteDest + 'scripts'))


});

gulp.task('prodScripts', ['packages'], function(){
  return browserify('./src/scripts/main.js')
    .transform('envify', {global: true, _: 'purge', NODE_ENV: 'production'})
    .transform('babelify', {presets: ['es2015', 'stage-0', 'react']})
    .transform('aliasify', { replacements: {
      '^@natgeo/pestle$': paths.pestleSrc + 'src/main.js',
      '@natgeo\/pestle\/(.+)' : paths.pestleSrc + 'src/$1.js',
      'natgeo-mortar\/lib\/(.+)' : './' + paths.mortarSrc + '$1'
    }})
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./' + paths.siteDest + 'scripts'))
});

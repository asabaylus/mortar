'use strict';

const bs = require('browser-sync').get('mortar');
const gulp  = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const glob = require("glob");

function extractFolderName(path) {
  return path.match(/([^\/]*)\/*$/)[1];
};

gulp.task('runExamples', function(done) {
  glob('./app/scripts/pestle/examples/*/', function(err, folders) {
    folders.map(function(folder) {
      const folderName = extractFolderName(folder);

      browserify('./app/scripts/pestle/examples/' + folderName + '/main.js')
      .transform('babelify', {presets: ['es2015', 'stage-0', 'react']})
      .transform('aliasify', {
        'replacements': {
          '@natgeo/mortar-pestle': './app/scripts/pestle/src/main.js',
          '@natgeo\/mortar-pestle\/(.*?(?:(?!\.js$).)*)' : './app/scripts/pestle/$1.js'
        }
      })
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./.tmp/pestle/examples/' + folderName));

    });

    bs.init({
      open: 'external',
      startPath: null,
      server: {
        baseDir: [
          '.tmp/pestle/examples',
          'app/scripts/pestle/examples'
        ]
      },
      xip: true
    });

    done();
  });
});

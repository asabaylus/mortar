'use strict';

const gulp = require('gulp');

const paths = require('./paths');

gulp.task('copy', function() {
  // styles
  gulp.src(paths.mortarStylesSrc, {base: './app/'})
    .pipe(gulp.dest(paths.mortarDest));

  // modules
  gulp.src(paths.mortarModulesSrc)
    .pipe(gulp.dest(paths.mortarModulesDest));

  // contentPackages
  gulp.src(paths.modulesContentPackageSrc)
    .pipe(gulp.dest(paths.modulesContentPackageDest));
});

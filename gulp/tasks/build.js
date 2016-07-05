'use strict';

const gulp = require('gulp');
const argv = require('yargs')
            .alias('p', 'production')
            .argv;
const devBuildTasks = [
  'scripts',
  'styles',
  'docs',
  'copy'
];
const prodBuildTasks = [
  'prodScripts',
  'prodStyles',
  'moveIconZip',
  'docs',
  'copy'
]
const buildTasks = argv.p ? prodBuildTasks : devBuildTasks;

const paths = require('./paths');

gulp.task('build', buildTasks, function() {
  if (argv.p) {
    return gulp.src(paths.mortarDest +'**/*')
      .pipe(gulp.dest(paths.siteDest));
  }
});

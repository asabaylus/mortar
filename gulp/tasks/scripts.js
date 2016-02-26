var gulp  = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
// var sourcemaps = require('gulp-sourcemaps');
// var buffer = require('vinyl-buffer');
// var babel = require('babelify');

gulp.task('scripts', function(){
  browserify('./app/scripts/main.js')
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./.tmp/assets/scripts'))
});

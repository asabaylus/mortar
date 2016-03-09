'use strict';

var gulp  = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var config = {
  mode: {
    symbol: true,
  },
  log                   : null,                     // Logging verbosity (default: no logging)
  shape                 : {                         // SVG shape related options
    id                  : {                         // SVG shape ID related options
      separator         : '--',                     // Separator for directory name traversal
      pseudo            : '~'                       // File name separator for shape states (e.g. ':hover')
    },
    dimension           : {                         // Dimension related options
      maxWidth          : 32,                       // Max. shape width
      maxHeight         : 32,                       // Max. shape height
      precision         : 2,                        // Floating point precision
      attributes        : false,                    // Width and height attributes on embedded shapes
    },
    spacing             : {                         // Spacing related options
      padding           : 0,                        // Padding around all shapes
      box               : 'content'                 // Padding strategy (similar to CSS `box-sizing`)
    },
    transform           : ['svgo'],                 // List of transformations / optimizations
    meta                : null,                     // Path to YAML file with meta / accessibility data
    align               : null,                     // Path to YAML file with extended alignment data
    dest                : null                      // Output directory for optimized intermediate SVG shapes
  },
  svg                   : {                         // General options for created SVG files
    xmlDeclaration      : true,                     // Add XML declaration to SVG sprite
    doctypeDeclaration  : true,                     // Add DOCTYPE declaration to SVG sprite
    namespaceIDs        : true,                     // Add namespace token to all IDs in SVG shapes
    dimensionAttributes : false                     // Width and height attributes on the sprite
  }
};

gulp.task('icons', function() {
  return gulp.src('app/icons/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('.tmp/assets'));
});

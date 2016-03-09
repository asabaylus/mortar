'use strict';

var gulp = require('gulp');
var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var fileMetadata = require('metalsmith-filemetadata');
var layouts = require('metalsmith-layouts');
var inPlace = require('metalsmith-in-place');
var fs = require('fs');

// Static server
gulp.task('docs', function() {
  // remove file extension from SVGs
  function trimExtension(item) {
    return item.slice(0, -4);
  }

  // filter non SVGs out of array
  function isSVG(file) {
    if (file.endsWith('.svg')) {
      return file
    }
  }

  Metalsmith('./')
  .source('./app/site')
  .destination('./.tmp/site')
  .metadata({
    'title': 'Mortar',
    'description': 'A living styleguide for National Geographic Partners'
  })
  .ignore('layouts')
  .use(markdown())
  .use(layouts({
    'engine': 'swig',
    'default': 'default.html',
    'directory': './app/site/_layouts/'
  }))
  .use(fileMetadata([
    // Pass list of icons to the icon page as metadata
    {
      'pattern': 'icons/*',
      'metadata': {
        // 1. read icon files from directory then
        // 2. filter SVGs from array
        // 3. remove `.svg` file extension from strings
        'icons': fs.readdirSync('app/icons/')
                  .filter(isSVG)
                  .map(trimExtension)
      }
    }
  ]))
  .use(inPlace({
    'engine': 'swig'
  }))
  .build(function(err) {
    if (err) throw err;
    console.log('Build finished!');
  });
});

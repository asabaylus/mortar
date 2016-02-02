'use strict';

var gulp = require('gulp');
var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var inPlace = require('metalsmith-in-place');

// Static server
gulp.task('build', function() {
  Metalsmith('./')
  .source('./app/site')
  .destination('./.tmp')
  .metadata({
    'title': 'Mortar',
    'description': 'A living styleguide for National Geographic Partners'
  })
  .ignore('layouts')
  .use(markdown())
  .use(layouts({
    'engine': 'swig',
    'default': 'default.html',
    'directory': './app/site/layouts/'
  }))
  .use(inPlace({
    'engine': 'swig'
  }))
  .build(function(err) {
    if (err) throw err;
    console.log('Build finished!');
  });
});

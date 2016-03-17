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
  const fileList = fs.readdirSync('app/icons/');
  const icons = fileList
    .filter(isSVG)
    .filter(isNotSocial)
    .map(trimExtension);
  const socialIcons = fileList
    .filter(isSVG)
    .filter(isSocial)
    .map(trimExtension);

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

  // filter non social icons out of array
  function isSocial(file) {
    if (file.startsWith('social-')) {
      return file
    }
  }

  // filter social icons out of array
  function isNotSocial(file) {
    if (!file.startsWith('social-')) {
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
        // 3. filter between social and non social icons
        // 4. remove `.svg` file extension from strings
        'icons': icons,
        'socialIcons': socialIcons
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

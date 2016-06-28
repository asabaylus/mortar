// Karma configuration

module.exports = function(config) {
  config.set({
    frameworks: [
      'browserify',
      'mocha',
      'chai',
      'sinon'
    ],

    basePath: '',

    browsers: ['PhantomJS'],

    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      // all files ending in "_test"
      'test/**/*_test.js',
      'test/DOMUtils.js'
    ],

    preprocessors: {
      // add webpack as preprocessor
      'test/**/*_test.js': ['browserify']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['mocha'],

    browserify: {
      debug: true,
      transform: [
        ['babelify', {presets: ["es2015", "stage-0", "react"]}],
        ['aliasify', { replacements: {
          '^@natgeo/mortar-pestle$': './app/scripts/pestle/src/main.js',
          '@natgeo\/mortar-pestle\/(.+)' : './app/scripts/pestle/src/$1.js'
        }}]
      ],
      extensions: ['.js', '.jsx'],
      configure: function(bundle) {
        bundle.on('prebundle', function() {
          bundle.external('react/addons');
          bundle.external('react/lib/ReactContext');
          bundle.external('react/lib/ExecutionEnvironment');
        });
      }
    },

    // web server port
    runnerPort: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_WARN,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false
  });
};

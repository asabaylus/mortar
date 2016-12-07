// Karma configuration

module.exports = function(config) {
  config.set({
    frameworks: [
      'browserify',
      'mocha',
      'chai',
      'sinon',
      'jquery-2.1.0'
    ],

    basePath: '',

    browsers: ['PhantomJS'],
    // browsers: ['Chrome'],
    // browsers: ['Chrome', 'Firefox', 'Safari', 'PhantomJS'],

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
    reporters: ['mocha', 'coverage'],

    browserify: {
      debug: true,
      transform: [
        ['babelify', {
          presets: ["es2015", "stage-0", "react"],
          plugins: ["istanbul"]
        }],
        ['browserify-istanbul', { instrumenterConfig: {
          embedSource: true
        }}],
        ['aliasify', { replacements: {
          '^@natgeo/pestle$': './src/scripts/pestle/src/main.js',
          '@natgeo\/pestle\/(.+)' : './src/scripts/pestle/src/$1.js',
          'natgeo-mortar\/lib\/(.+)' : './src/$1'
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

    coverageReporter: {
      reporters: [
        {'type': 'text'},
        {'type': 'html', dir: 'coverage'},
        {'type': 'lcov'}
      ],
      check: {
        global: {
          statements: 50,
          branches: 40,
          functions: 50,
          lines: 50
        }
      }
    },

    // web server port
    runnerPort: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.[LOG_DISABLE|LOG_ERROR|LOG_WARN|LOG_INFO|LOG_DEBUG]
    logLevel: config.LOG_WARN,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true
  });
};

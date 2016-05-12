// Karma configuration

module.exports = function(config) {
    config.set({
        frameworks: [
            'browserify',
            'mocha',
            'chai'
        ],

        basePath: '',

        browsers: ['PhantomJS'],

        files: [
            // all files ending in "_test"
            'test/**/*_test.js'
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
                ['babelify', {presets: ["es2015", "react"]}]
            ],
            extensions: ['.js', '.jsx']
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
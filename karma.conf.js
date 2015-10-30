module.exports = function(config) {

    config.set({

        // list of files / patterns to load in the browser
        files: [
            //libs
            'public/js/lib/angular.js',
            'public/js/lib/angular-mocks.js',
            'public/js/lib/angular-route.js',
            'public/js/lib/jquery.js',
            'public/js/lib/neosavvy-javascript-angular-core.js',

            //main js entry
            'public/js/dist/app.concat.js',
            //load html templates for html2js
            'public/js/app/**/*View.html',
            //load tests
            'test/unit/**/*.spec.js'
        ],

        // list of files to exclude
        exclude: [],

        //using the ng-html2js makes the directive testing trivial
        preprocessors: {
            'public/**/*View.html': ['ng-html2js']
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'public/',
            moduleName: 'templates'
        },

        proxies: {},

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,
        autoWatch: true,
        usePolling: true,

        // frameworks to use
        frameworks: ['jasmine'],
        browsers: ['ChromeDesktop'],

        customLaunchers: {
            ChromeDesktop: {
                base: 'Chrome',
                flags: ['--window-size=1280,720']
            }
        },

        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-mocha-reporter',
            'karma-ng-html2js-preprocessor',
        ],

        // Test results reporter to use
        // possible values: 'dots', 'progress', 'mocha', 'junit', 'growl', 'coverage'
        reporters: ['mocha'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        // singleRun: true

    });
};

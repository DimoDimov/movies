var SpecReporter = require('jasmine-spec-reporter');
var reporters = require('jasmine-reporters');
var JUnitXmlReporter = reporters.JUnitXmlReporter;

var path = require('path');

exports.config = {

    framework: 'jasmine2',
    directConnect: true,

    //Spec patterns are relative to the current working
    //when protractor is called 
    specs: [path.resolve('test/e2e/movieList/**/*.spec.js')],

    //the address of a running selenium address (default)
    seleniumAddress: 'http://localhost:4444/wd/hub',

    //capabilities to eb passed to the webdriver instance
    capabilities: {
        browserName: 'chrome'
    },
    baseUrl: 'http://localhost:3001',
    allScriptsTimeout: 500000,
    restartBrowserBetweenTests: false,

    onPrepare: function() {

        var reporter = new SpecReporter({
            displayStacktrace: true,
            displaySpecDuration: true,
            displaySuiteNumber: true
        });

        jasmine.getEnv().addReporter(reporter);
        browser.driver.manage().window().setSize(1440, 1000);
        browser.driver.manage().deleteAllCookies();
    },

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function() {},
        isVerbose: true,
        includeStackTrace: true,
        showTiming: true,
        realtimeFailure: true
    }


};

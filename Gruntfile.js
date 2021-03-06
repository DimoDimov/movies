var path = require('path');

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        //package Json
        pkg: grunt.file.readJSON('package.json'),

        //------------ Express Server Options ------------>
        'express': {
            options: {
                // Override defaults here
            },
            dev: {
                options: {
                    port: 8000,
                    script: path.resolve(__dirname, 'server/index.js'),
                }
            },
            prod: {
                options: {
                    script: path.resolve(__dirname, 'path/to/prod/server.js')
                }
            },
            test: {
                options: {
                    script: path.resolve(__dirname, 'path/to/test/server.js')
                }
            },
            'e2e-coverage': {
                options: {
                    port: 8000,
                    script: path.resolve(__dirname, 'test-coverage/e2e-coverage/instrumented/server/index.js'),
                }
            },
        },

        //------------ Front End Options - Concatenation, Minification, Syntax validity check ------------------------------>
        //concatenates js and css files
        'concat': {
            options: {
                //separator: ';'
            },
            distJS: {
                src: [path.resolve(__dirname, 'public/js/app/app-dependencies.js'), path.resolve(__dirname, 'public/js/app/app.js'), path.resolve(__dirname, 'public/js/app/**/*.js')],
                dest: path.resolve(__dirname, 'public/js/dist/app.concat.js'),
            },
            distCSS: {
                src: [path.resolve(__dirname, 'public/styles/app/**/*.css')],
                dest: path.resolve(__dirname, 'public/styles/dist/app.concat.css'),
            }
        },

        //minifies the js files
        'uglify': {
            dist: {
                src: [path.resolve(__dirname, 'public/js/dist/app.concat.js')],
                dest: path.resolve(__dirname, 'public/js/dist/app.min.js'),
            }
        },

        //minifies the css
        'cssmin': {
            css: {
                src: path.resolve(__dirname, 'public/styles/dist/app.concat.css'),
                dest: path.resolve(__dirname, 'public/styles/dist/app.min.css')
            }
        },

        //high quality code
        'jshint': {
            gruntfile: {
                src: path.resolve(__dirname, 'gruntfile.js')
            },
            test: [path.resolve(__dirname, 'test/**/*.js')],
            beforeconcat: [path.resolve(__dirname, 'public/js/app/**/*.js'), path.resolve(__dirname, 'server/**/*.js')],
            afterconcat: [path.resolve(__dirname, 'public/js/dist/**/*concat.js')],
            //all: ['public/js/app/**/*.js', 'server/**/*.js'],
            options: {
                // options here to override JSHint defaults
                debug: true,
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true,
                    curly: true,
                    eqeqeq: true,
                    eqnull: true,
                    browser: true,
                }
            }
        },

        //set watchers on files for running tasks on file change
        'watch': {
            test: {
                files: [path.resolve(__dirname, 'test/**/*.js'), '!' + path.resolve(__dirname, 'test/*-coverage/**/*')],
                tasks: ['jshint:test'],
            },
            express: {
                files: [path.resolve(__dirname, 'public/**/*'), path.resolve(__dirname, 'server/**/*'), path.resolve(__dirname, 'Gruntfile.js'), '!' + path.resolve(__dirname, 'public/js/dist/*'), '!' + path.resolve(__dirname, 'public/styles/dist/*'), '!' + path.resolve(__dirname, 'test/**/*')],
                tasks: ['start'],
                options: {
                    spawn: false,
                    livereload: true,
                    serverreload: true,
                }
            }
        },

        //clean folders pre-build
        'clean': {
            dist: {
                src: [path.resolve(__dirname, 'public/js/dist/**/*'), path.resolve(__dirname, 'public/styles/dist/**/*')],
                //filter: 'isFile',
            },
            lib: {
                src: [path.resolve(__dirname, 'public/js/lib/**/*'), path.resolve(__dirname, 'public/styles/lib/**/*'), path.resolve(__dirname, 'public/styles/fonts/**/*')],
                //filter: 'isFile',
            },
            'unit-coverage': {
                src: [path.resolve(__dirname, 'test-coverage/unit-coverage/**/*')],
            },
            'server-coverage': {
                src: [path.resolve(__dirname, 'test-coverage/server-coverage/**/*')],
            },
            'e2e-coverage': {
                src: [path.resolve(__dirname, 'test-coverage/e2e-coverage/**/*')],
            },
        },

        copy: {
            'e2e-coverage': {
                files: [
                    // includes files that should not be instrumented for e2e coverage test reporting
                    {
                        cwd: path.resolve(__dirname, ''),
                        expand: true,
                        //src: ['server/**/*', 'public/**', '!public/js/app/dist', '!public/js/app/**', '!public/styles/app/**'],
                        
                        src: ['server/data.json', 'public/**', '!public/js/app/dist', '!public/js/app/**', '!public/styles/app/**'],
                        dest: path.resolve(__dirname, 'test-coverage/e2e-coverage/instrumented')
                    },
                ],
            },
        },

        //instrument code for e2e coverage reports
        instrument: {
            files: ['server/**/*.js', 'public/js/dist/app.concat.js'],
            //files: ['public/js/dist/app.concat.js'],
            options: {
                cwd: path.resolve(__dirname, ''),
                lazy: true,
                basePath: path.resolve(__dirname, 'test-coverage/e2e-coverage/instrumented')
            }
        },

        protractor_coverage: {
            options: {
                collectorPort: 3001,
                configFile: path.resolve(__dirname, "protractor.conf.js"), // Default config file
                keepAlive: true, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                coverageDir: path.resolve(__dirname, 'test-coverage/e2e-coverage/instrumented/'),

                args: {
                    
                }
            },
            chrome: {
                options: {
                    args: {
                        baseUrl: 'http://localhost:3000/',
                        // Arguments passed to the command
                        'browser': 'chrome'
                    }
                }
            },
        },

        makeReport: {
            src: 'test-coverage/e2e-coverage/instrumented/**.json',
            options: {
                type: 'html',
                dir: 'test-coverage/e2e-coverage/e2e-unit-report',
                print: 'detail'
            }
        },

        //updates my libraries
        'bowercopy': {
            options: {
                // Task-specific options go here 
            },

            // js
            jsfiles: {
                options: {
                    srcPrefix: path.resolve(__dirname, 'bower_components/'),
                    destPrefix: path.resolve(__dirname, 'public/js/lib/')
                },
                files: {
                    'jquery.js': 'jquery/dist/jquery.js',
                    'bootstrap.js': 'bootstrap/dist/js/bootstrap.js',
                    'angular.js': 'angular/angular.js',
                    'angular-route.js': 'angular-route/angular-route.js',
                    'angular-mocks.js': 'angular-mocks/angular-mocks.js',
                    'angular-resource.js': 'angular-resource/angular-resource.js',
                    'neosavvy-javascript-angular-core.js': 'neosavvy-javascript-angular-core/neosavvy-javascript-angular-core.js',
                }
            },

            //css
            stylefiles: {
                options: {
                    srcPrefix: path.resolve(__dirname, 'bower_components/'),
                    destPrefix: path.resolve(__dirname, 'public/styles/')
                },
                files: {
                    'lib/bootstrap.css': 'bootstrap/dist/css/bootstrap.css',
                    'fonts': 'bootstrap/dist/fonts/**/*',
                }
            }
        },

        //>---------------Testing--------------------------------------->

        //----------------Protractor----------------------------------->

        //Set Automation Tests
        'protractor': {
            options: {
                configFile: path.resolve(__dirname, "protractor.conf.js"), // Default config file 
                keepAlive: true, // If false, the grunt process stops when the test fails. 
                noColor: false, // If true, protractor will not use colors in its output. 
                args: {
                    //baseUrl: 'http://localhost:8001'
                }
            },
            chrome: { // Grunt requires at least one target to run so we can simply put 'all: {}' here too. 
                all: {
                    baseUrl: 'http://localhost:8001/',
                    //seleniumPort : 9000,
                    //baseUrl: 'http://localhost:9000'
                }
            },
        },

        //------------------Karma-----------------
        'karma': {
            unit: {
                configFile: path.resolve(__dirname, 'karma.conf.js'),
                // background: true,
                singleRun: true
            }
        },

        //--------Mocha Coverage ------------->
        mocha_istanbul: {
            'server-test-coverage': {
                src: [path.resolve(__dirname, 'test/server/**/*')], // a folder works nicely

                options: {
                    // coverage: true,
                    coverageFolder: 'test-coverage/server-coverage',
                    reportFormats: ['text', 'lcov', 'lcovonly'],
                    print: 'detail'
                }
            },
            'e2e-server-coverage': {
                src: [path.resolve(__dirname, 'test-coverage/e2e-coverage/instrumented/server/**/*')], // a folder works nicely

                options: {
                    // coverage: true,
                    coverageFolder: 'test-coverage/e2e-coverage/e2e-server-report',
                    reportFormats: ['text', 'lcov', 'lcovonly'],
                    print: 'detail'
                }
            },
            // 'e2e-unit-coverage': {
            //     src: [path.resolve(__dirname, 'test-coverage/e2e-coverage/instrumented/public/js/dist/**/*')], // a folder works nicely

            //     options: {
            //         // coverage: true,
            //         coverageFolder: 'test-coverage/e2e-coverage/e2e-unit-report',
            //         reportFormats: ['html', 'text', 'lcov', 'lcovonly'],
            //         print: 'detail'
            //     }
            // },
        },

        istanbul_check_coverage: {
            'server-test': {
                options: {
                    coverageFolder: path.resolve(__dirname, 'test-coverage/server-coverage'), // will check both coverage folders and merge the coverage results
                    check: {
                        lines: 95,
                        statements: 95
                    }
                }
            },
            'e2e-server-test': {
                options: {
                    coverageFolder: path.resolve(__dirname, 'test-coverage/e2e-coverage/instrumented'), // will check both coverage folders and merge the coverage results
                    check: {
                        lines: 90,
                        statements: 90
                    }
                }
            },
        },
        //<-------Mocha Coverage -------------/

        //<---------------Testing---------------------------------------<
    });

    //-------------------Server----------------------------------------->
    grunt.loadNpmTasks('grunt-express-server');

    //-------------------Front End------------------------------------>
    grunt.loadNpmTasks('grunt-contrib-concat');

    // uglifiers/minifiers
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-css');

    //quality code watchers
    grunt.loadNpmTasks('grunt-contrib-jshint');

    //-----------File and Folder Manipulations---------------------------->

    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-bowercopy');

    grunt.loadNpmTasks('grunt-contrib-copy');
    //------------------Testing Tools------------------------------------>

    //Finally we need a Selenium server. If we don't have one set up already, we can install a local standalone version with this command:
    //./node_modules/grunt-protractor-runner/node_modules/protractor/bin/webdriver-manager update
    grunt.loadNpmTasks('grunt-protractor-runner');

    grunt.loadNpmTasks('grunt-protractor-coverage');

    grunt.loadNpmTasks('grunt-karma');

    grunt.loadNpmTasks('grunt-istanbul');

    grunt.loadNpmTasks('grunt-mocha-istanbul');

    //-------------------BUNDLES------------------------------------------>

    //updates front end libraries, cleans folder before the copy
    grunt.registerTask('update-frontendlibs', [
        'clean:lib',
        'bowercopy:jsfiles',
        'bowercopy:stylefiles'
    ]);

    //>-----------------------Test Bundles--------------------------------->

    //-----------------------E2E Tests ------------------------------------>

    grunt.registerTask('start-e2e-instrumented-server', [
        'clean:e2e-coverage',
        'copy:e2e-coverage',
        'instrument',
        'express:e2e-coverage',
    ]);

    grunt.registerTask('e2e-coverage-data', [
        'start-e2e-instrumented-server',
        'protractor_coverage:chrome',
    ]);

    grunt.registerTask('e2e-coverage-reports', [
        'mocha_istanbul:e2e-server-coverage',
        'makeReport',
    ]);

    //equivalent to package.json => "scripts" => "e2e": "protractor protractor.conf.js", 
    grunt.registerTask('e2e-test', ['protractor']);

    //--------------Front End Tests --------------------------------------->

    //equivalent to package.json => "scripts" => "unit": "karma start karma.conf.js", 
    grunt.registerTask('unit-test', [
        'clean:unit-coverage',
        'karma'
    ]);

    //-----------------Back End Tests ------------------------------------->

    //equivalent to package.json => "scripts" => "server-unit": "mocha test/server/**/*.spec.js", 
    grunt.registerTask('server-test-coverage', [
        'mocha_istanbul:server-test-coverage',
        'istanbul_check_coverage:server-test'
    ]);

    grunt.registerTask('server-test', [
        'clean:server-coverage',
        'server-test-coverage'
    ]);

    //<----------------Test Bundles------------------------------------------<

    //'grunt test' command will check the js files for syntax and 
    //all test methods will be run in consecutive bundle
    grunt.registerTask('test', [
        'jshint',
        'e2e-test',
        'unit-test',
        'server-test'
    ]);

    //'grunt rebuild' command will activte the 'rebuild' bundle of processes
    //rebuild bundle - it cleans 'public/js/dist' and 'public/css/dist' and 
    //prepares the 'dist' directories
    // for the new js and css bunbled files. The code is being tested for errors
    //with jshint, after what all js and css files are being concatenated into bundles
    // after this are being tested again and at the end - minified;
    grunt.registerTask('rebuild', [
        'clean:dist',
        'jshint:beforeconcat',
        'concat',
        'jshint:afterconcat',
        'uglify',
        'cssmin'
    ]);

    //'grunt start' command will activte the 'start' bundle of processes
    // additionaly after a succesfull rebuild we will run a express server
    // we will watch the java script files for any changes. A server will restart automatically
    // no CTRL+SHIFT+R or 'Refresh' is being done automatically. 
    grunt.registerTask('start', [
        'rebuild',
        'express:dev',
        'watch'
    ]);
};

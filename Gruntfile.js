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
                    bases: 'public',
                    script: path.resolve('server/index.js'),
                }
            },
            prod: {
                options: {
                    script: path.resolve('path/to/prod/server.js')
                }
            },
            test: {
                options: {
                    script: path.resolve('path/to/test/server.js')
                }
            }
        },

        //------------ Front End Options - Concatenation, Minification, Syntax validity check ------------------------------>
        //concatenates js and css files
        'concat': {
            options: {
                //separator: ';'
            },
            distJS: {
                src: [path.resolve('public/js/app/app-dependencies.js'), path.resolve('public/js/app/app.js'), path.resolve('public/js/app/**/*.js')],
                dest: path.resolve('public/js/dist/app.concat.js'),
            },
            distCSS: {
                src: [path.resolve('public/styles/app/**/*.css')],
                dest: path.resolve('public/styles/dist/app.concat.css'),
            }
        },

        //minifies the js files
        'uglify': {
            dist: {
                src: [path.resolve('public/js/dist/app.concat.js')],
                dest: path.resolve('public/js/dist/app.min.js'),
            }
        },

        //minifies the css
        'cssmin': {
            css: {
                src: path.resolve('public/styles/dist/app.concat.css'),
                dest: path.resolve('public/styles/dist/app.min.css')
            }
        },

        //high quality code
        'jshint': {
            gruntfile: {
                src: path.resolve('gruntfile.js')
            },
            test: [path.resolve('test/**/*.js')],
            beforeconcat: [path.resolve('public/js/app/**/*.js'), path.resolve('server/**/*.js')],
            afterconcat: [path.resolve('public/js/dist/**/*concat.js')],
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
                files: [path.resolve('test/**/*.js'), '!' + path.resolve('test/*-coverage/**/*')],
                tasks: ['jshint:test'],
            },
            express: {
                files: [path.resolve('public/**/*'), path.resolve('server/**/*'), path.resolve('Gruntfile.js'), '!' + path.resolve('public/js/dist/*'), '!' + path.resolve('public/styles/dist/*'), '!' + path.resolve('test/**/*')],
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
                src: [path.resolve('public/js/dist/**/*'), path.resolve('public/styles/dist/**/*')],
                //filter: 'isFile',
            },
            lib: {
                src: [path.resolve('public/js/lib/**/*'), path.resolve('public/styles/lib/**/*'), path.resolve('public/styles/fonts/**/*')],
                //filter: 'isFile',
            },
            'unit-coverage': {
                src: [path.resolve('test-coverage/unit-coverage/**/*')],
            },
            'server-coverage': {
                src: [path.resolve('test-coverage/server-coverage/**/*')],
            },
        },

        //updates my libraries
        'bowercopy': {
            options: {
                // Task-specific options go here 
            },

            // js
            jsfiles: {
                options: {
                    srcPrefix: path.resolve('bower_components/'),
                    destPrefix: path.resolve('public/js/lib/')
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
                    srcPrefix: path.resolve('bower_components/'),
                    destPrefix: path.resolve('public/styles/')
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
                configFile: path.resolve("protractor.conf.js"), // Default config file 
                keepAlive: true, // If false, the grunt process stops when the test fails. 
                noColor: false, // If true, protractor will not use colors in its output. 
                args: {
                    // Arguments passed to the command 
                }
            },
            your_target: { // Grunt requires at least one target to run so we can simply put 'all: {}' here too. 
                all: {
                    //seleniumPort : 9000,
                    baseUrl: 'http://localhost:9000'
                }
            },
        },

        //------------------Karma-----------------
        'karma': {
            unit: {
                configFile: path.resolve('karma.conf.js'),
                // background: true,
                //singleRun: true
            }
        },


        //--------Mocha Coverage ------------->
        mocha_istanbul: {
            coverage: {
                src: [path.resolve('test/server/config/**/*')], // a folder works nicely

                options: {
                    // coverage: true,
                    coverageFolder: 'test-coverage/server-coverage',
                    reportFormats: ['text','lcov','lcovonly']
                }
            }
        },

        istanbul_check_coverage: {
            default: {
                options: {
                    coverageFolder: path.resolve('test-coverage/server-coverage'), // will check both coverage folders and merge the coverage results
                    check: {
                        lines: 95,
                        statements: 95
                    }
                }
            }
        },
        //<-------Mocha Coverage -------------/

        //<---------------Testing---------------------------------------<


        //-------------------DEBUG Add Ons------------------------------>
        'node-inspector': {
            'server-unit': {
                options: {
                    'preload': false,
                    'hidden': ['node_modules', 'bower_components', 'module.js'],
                    'stack-trace-limit': 4,
                }
            },
            'dev': {
                options: {
                    'preload': false,
                    'hidden': ['node_modules'],
                    'stack-trace-limit': 4,
                }
            }
        },

        shell: {
            'server-unit': {
                options: {
                    stdout: true
                },
                //windows debug
                command: "node-debug c:\\Users\\Dimo\\AppData\\Roaming\\npm\\node_modules\\grunt-cli\\bin\\grunt server-unit"
            },
            'dev': {
                options: {
                    stdout: true
                },
                command: "node-debug --hidden node_modules --no-preload " + path.resolve('server/index.js')
            },
            'e2e': {
                options: {
                    stdout: true
                },
                command: "protractor debug protractor.conf.js"
            },
        },

        concurrent: {
            'server-unit': {
                tasks: ['node-inspector:server-unit', 'shell:server-unit'],
                options: {
                    logConcurrentOutput: true
                }
            },
            'dev': {
                tasks: ['node-inspector:dev', 'shell:dev'],
                options: {
                    logConcurrentOutput: true
                }
            },
        },
        //-------------------DEBUG Add Ons------------------------------<
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


    //------------------Testing Tools------------------------------------>

    //Finally we need a Selenium server. If we don't have one set up already, we can install a local standalone version with this command:
    //./node_modules/grunt-protractor-runner/node_modules/protractor/bin/webdriver-manager update
    grunt.loadNpmTasks('grunt-protractor-runner');

    grunt.loadNpmTasks('grunt-karma');

    grunt.loadNpmTasks('grunt-istanbul');

    grunt.loadNpmTasks('grunt-mocha-istanbul');

    //---------------Debug Tasks------------------------------------------->

    grunt.loadNpmTasks('grunt-debug');

    grunt.loadNpmTasks('grunt-node-inspector');

    grunt.loadNpmTasks('grunt-concurrent');

    grunt.loadNpmTasks('grunt-shell');

    //-------------------BUNDLES------------------------------------------>

    //updates front end libraries, cleans folder before the copy
    grunt.registerTask('update-frontendlibs', ['clean:lib', 'bowercopy:jsfiles', 'bowercopy:stylefiles']);

    //>-----------Test Bundle------------------------------------------>


    //------------E2E Tests ----------------

    //equivalent to package.json => "scripts" => "e2e": "protractor protractor.conf.js", 
    grunt.registerTask('e2e-test', ['protractor']);

    grunt.registerTask('debug-e2e', ['shell:e2e-coverage']); //debug object - window.clientSideScripts

    //------------Front End Tests ----------------

    //equivalent to package.json => "scripts" => "unit": "karma start karma.conf.js", 
    grunt.registerTask('unit-test', ['clean:unit-coverage', 'karma']);

    //------------Back End Tests ----------------

    //equivalent to package.json => "scripts" => "server-unit": "mocha test/server/**/*.spec.js", 
    grunt.registerTask('server-test-coverage', ['mocha_istanbul:coverage', 'istanbul_check_coverage']);
    grunt.registerTask('server-test', ['clean:server-coverage', 'server-test-coverage']);

    //grunt.registerTask('debug-server-unit', ['concurrent:server-unit']);

    //<-----------Test Bundle------------------------------------------<

    //'grunt test' command will check the js files for syntax and 
    //all test methods will be run in consecutive bundle
    grunt.registerTask('test', ['jshint', 'e2e-test', 'unit-test', 'server-test']);

    //'grunt rebuild' command will activte the 'rebuild' bundle of processes
    //rebuild bundle - it cleans 'public/js/dist' and 'public/css/dist' and 
    //prepares the 'dist' directories
    // for the new js and css bunbled files. The code is being tested for errors
    //with jshint, after what all js and css files are being concatenated into bundles
    // after this are being tested again and at the end - minified;
    grunt.registerTask('rebuild', ['clean:dist', 'jshint:beforeconcat', 'concat', 'jshint:afterconcat', 'uglify', 'cssmin']);

    //'grunt start' command will activte the 'start' bundle of processes
    // additionaly after a succesfull rebuild we will run a express server
    // we will watch the java script files for any changes. A server will restart automatically
    // no CTRL+SHIFT+R or 'Refresh' is being done automatically. 
    grunt.registerTask('start', ['rebuild', 'express:dev', 'watch']);


    //debugging
    grunt.registerTask('debug-dev', ['shell:dev']);
};

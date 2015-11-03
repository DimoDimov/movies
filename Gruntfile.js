module.exports = function(grunt) {

    // Project configuration.++
    grunt.initConfig({
        //package Json
        pkg: grunt.file.readJSON('package.json'),

        //file manipulations - concatenation, minification, syntax validity checking
        concat: {
            options: {
                separator: ';'
            },
            distJS: {
                // src: ['public/js/app/app.js', 'public/js/app/**/*.js', '!public/js/app/app-dependencies.js', 'public/js/app/app-dependencies.js'],
                src: [ 'public/js/app/app-dependencies.js', 'public/js/app/app.js', 'public/js/app/**/*.js'],
                dest: 'public/js/dist/app.concat.js',
            },
            distCSS: {
                src: ['public/styles/app/**/*.css'],
                dest: 'public/styles/dist/app.concat.css',
            }
        },
        //js minifier
        uglify: {
            dist: {
                files: {
                    'public/js/dist/app.min.js': ['public/js/dist/app.concat.js'],
                }
            }
        },
        //css minifier
        cssmin: {
            css: {
                src: 'public/styles/dist/app.concat.css',
                dest: 'public/styles/dist/app.min.css'
            }
        },
        //high quality code
        jshint: {
            gruntfile: {
                src: 'gruntfile.js'
            },
            test: ['test/**/*.js'],
            beforeconcat: ['public/js/app/**/*.js', 'server/**/*.js'],
            afterconcat: ['public/js/dist/**/*concat.js'],
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

        //clean folders pre-build
        clean: {
            dist: {
                src: ['public/js/dist/**/*', 'public/styles/dist/**/*'],
                //filter: 'isFile',
            },
            lib: {
                src: ['public/js/lib/**/*', 'public/styles/lib/**/*'],
                //filter: 'isFile',
            }
        },

        //set watchers on files
        watch: {
            test: {
                files: ['test/**/*.js'],
                tasks: ['jshint:test'],
            },
            express: {
                files: ['public/**/*', 'server/**/*', 'Gruntfile.js', '!public/js/dist/*', '!public/styles/dist/*'],
                tasks: ['start'],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
        },

        //set express server
        express: {
            options: {
                // Override defaults here
            },
            dev: {
                options: {
                    script: 'server/index.js',
                }
            },
            prod: {
                options: {
                    script: 'path/to/prod/server.js',
                    node_env: 'production'
                }
            },
            test: {
                options: {
                    script: 'path/to/test/server.js'
                }
            }
        },

        //Set Automation Tests
        protractor: {
            options: {
                configFile: "protractor.conf.js", // Default config file 
                keepAlive: true, // If false, the grunt process stops when the test fails. 
                noColor: false, // If true, protractor will not use colors in its output. 
                args: {
                    // Arguments passed to the command 
                }
            },
            your_target: { // Grunt requires at least one target to run so we can simply put 'all: {}' here too. 
                all: {}
            },
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        simplemocha: {
            options: {
                globals: ['should'],
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'tap'
            },

            all: {
                src: 'test/server/**/*.spec.js'
            }
        },

        bowercopy: {
            options: {
                // Task-specific options go here 
            },

            // Javascript 
            jsfiles: {
                options: {
                    destPrefix: 'public/js/lib'
                },
                files: {
                    'jquery.js': 'jquery/jquery.js',
                    'bootstrap.js': 'bootstrap/dist/js/bootstrap.js',
                    'angular.js': 'angular/angular.js',
                    'angular-route.js': 'angular-route/angular-route.js',
                    'angular-mocks.js': 'angular-mocks/angular-mocks.js',
                    'angular-resource.js': 'angular-resource/angular-resource.js',
                    'neosavvy-javascript-angular-core.js': 'neosavvy-javascript-angular-core/neosavvy-javascript-angular-core.js',

                }
            },
            stylefiles: {
                options: {
                    destPrefix: 'public/styles/lib'
                },
                files: {
                    'bootstrap.css': 'bootstrap-css-only/css/bootstrap.css',
                }
            },
        },

        copy: {
            main: {
                files: [
                    // includes files within path
                    {
                        //cwd: '../CurrProjIce/',
                        expand: true,
                        src: ['../CurrProjIce/**/*', '!**/bower_components/**', '!**/node_modules/**'], //'!**/bower_components/**', '!**/node_modules/**'
                        dest: '../CashProjIce/',
                        //filter: 'isFile',
                    },
                ],
            },
        },

    });

    grunt.loadNpmTasks('grunt-contrib-concat');

    // uglifiers/minifiers
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-css');

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.loadNpmTasks('grunt-express-server');

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-bowercopy');

    grunt.loadNpmTasks('grunt-contrib-copy');

    //Finally we need a Selenium server. If we don't have one set up already, we can install a local standalone version with this command:
    //./node_modules/grunt-protractor-runner/node_modules/protractor/bin/webdriver-manager update
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-debug');
    //-------------------BUNDLES

    grunt.registerTask('debug-mocha', ['debug', 'simplemocha']);

    //updates front end libraries, cleans folder before the copy
    grunt.registerTask('update-frontendlibs', ['clean:lib', 'bowercopy:jsfiles', 'bowercopy:stylefiles']);

    //equivalent to package.json => "scripts" => "e2e": "protractor protractor.conf.js", 
    grunt.registerTask('e2e', ['protractor']);

    //equivalent to package.json => "scripts" => "unit": "karma start karma.conf.js", 
    grunt.registerTask('unit', ['karma']);

    //equivalent to package.json => "scripts" => "server-unit": "mocha test/server/**/*.spec.js", 
    grunt.registerTask('server-unit', ['simplemocha']);

    //'grunt test' command will check the js files for syntax and 
    //after this it all the test methods will be run in consecutive bundle
    grunt.registerTask('test', ['jshint', 'e2e', 'unit', 'simplemocha']);

    //'grunt rebuild' command will activte the 'rebuild' bundle of processes
    //rebuild bundle - it cleans 'public/js/app/dist' and prepares the 'dist' directory
    // for the new js bunbled files. The code is being tested for errors
    //with jshint, after waht all file are being concatenated into one and then minified;
    grunt.registerTask('rebuild', ['clean:dist', 'jshint:beforeconcat', 'concat', 'jshint:afterconcat', 'uglify', 'cssmin']);

    //'grunt start' command will activte the 'start' bundle of processes
    // additionaly after a succesfull rebuild we will run a express server
    // we will watch the java script files for any changes. A server will restart automatically
    // no CTRL+SHIFT+R or 'Refresh' is being done automatically. 
    grunt.registerTask('start', ['rebuild', 'express:dev', 'watch']);
};

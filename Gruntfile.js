var path = require('path');

module.exports = function(grunt) {

    // Project configuration.++
    grunt.initConfig({
        //package Json
        pkg: grunt.file.readJSON('package.json'),
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
                command: "node-debug --hidden node_modules --no-preload " + path.resolve('/server/index.js')
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

        //file manipulations - concatenation, minification, syntax validity checking
        'concat': {
            options: {
                separator: ';'
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

        //js minifier
        'uglify': {
            dist: {
                src: [path.resolve('public/js/dist/app.concat.js')],
                dest: path.resolve('public/js/dist/app.min.js'),
            }
        },

        //css minifier
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
            test: [path.resolve('test/**/*.js'), '!' + path.resolve('test/*-coverage/**/*')],
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
                src: [path.resolve('test/unit-coverage/**/*')],
            }
        },

        //set watchers on files
        'watch': {
            test: {
                files: [path.resolve('test/**/*.js'), '!' + path.resolve('test/*-coverage/**/*')],
                tasks: ['jshint:test'],
            },
            express: {
                files: [path.resolve('public/**/*'), path.resolve('server/**/*'), path.resolve('Gruntfile.js'), '!' + path.resolve('public/js/dist/*'), '!' + path.resolve('public/styles/dist/*'), '!' + path.resolve('test/**/*')],
                tasks: ['express:dev'],
                options: {
                    spawn: false,
                    //l ivereload: true,
                    // serverreload: true,
                }
            }
        },

        //set express server
        'express': {
            options: {
                // Override defaults here
            },
            dev: {
                options: {
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
                all: {}
            },
        },

        'karma': {
            unit: {
                configFile: path.resolve('karma.conf.js')
            }
        },

        'simplemocha': {
            options: {
                globals: ['should'],
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'tap'
            },

            all: {
                src: path.resolve('test/server/**/*.spec.js')
            }
        },

        'bowercopy': {
            options: {
                // Task-specific options go here 
            },

            // Javascript 
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

        'copy': {
            main: {
                files: [
                    // includes files within path
                    {
                        //cwd: '',
                        expand: true,
                        src: [''],
                        dest: '',
                        //filter: 'isFile',
                    },
                ],
            },
        },
    });

    //debugger tasks
    grunt.loadNpmTasks('grunt-node-inspector');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');


    grunt.loadNpmTasks('grunt-contrib-concat');

    // uglifiers/minifiers
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-css');

    //quality code watchers
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.loadNpmTasks('grunt-express-server');

    grunt.loadNpmTasks('grunt-contrib-watch');

    //front end version control managment (migght be applied to more libraries)
    grunt.loadNpmTasks('grunt-bowercopy');

    grunt.loadNpmTasks('grunt-contrib-copy');

    //Finally we need a Selenium server. If we don't have one set up already, we can install a local standalone version with this command:
    //./node_modules/grunt-protractor-runner/node_modules/protractor/bin/webdriver-manager update
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-debug');

    //-------------------BUNDLES

    //updates front end libraries, cleans folder before the copy
    grunt.registerTask('update-frontendlibs', ['clean:lib', 'bowercopy:jsfiles', 'bowercopy:stylefiles']);

    //equivalent to package.json => "scripts" => "e2e": "protractor protractor.conf.js", 
    grunt.registerTask('e2e', ['protractor']);
    grunt.registerTask('debug-e2e', ['shell:e2e']); //debug object - window.clientSideScripts


    //equivalent to package.json => "scripts" => "unit": "karma start karma.conf.js", 
    grunt.registerTask('unit', ['clean:unit-coverage', 'karma']);

    //equivalent to package.json => "scripts" => "server-unit": "mocha test/server/**/*.spec.js", 
    grunt.registerTask('server-unit', ['simplemocha']);
    grunt.registerTask('debug-server-unit', ['concurrent:server-unit']);

    //'grunt test' command will check the js files for syntax and 
    //after this it all the test methods will be run in consecutive bundle
    grunt.registerTask('test', ['jshint', 'e2e', 'unit', 'server-unit']);

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

    grunt.registerTask('debug-dev', ['shell:dev']);
};

(function() {
    'use strict';
    // Organizing the code
    // The Domain Style
    // modules are declared into namespacing at app-dependencies.js
    var app = angular.module('app', appDep.AllDependencies);

    // the Structure:
    // resuable modules. What works together lives together. All necessary files
    // of a module are in one folder. Ex: 'modules/movieList'. This helps to easily store
    // and find the build files of each module. This work great for average or huge 
    // Web Applications where hundreds
    // of Controllers, Directives and Views are being declared in the code.

    // Organazing the code 'The Domain Style'
    // With a complex domain model and hundreds of components, an enterprise
    // application can easily become a mess if certain concerns are overlooked. One of the
    // best ways to organize the code in this situation is by distributing each component in
    // a domain-named folder structure. 

    // app/ -> files of the application
    //  dist/ -> the concatenated js and css files
    //      app.min.css -> main application stylesheet, consists of concatenated and minified css files
    //      app.min.js -> main application java script, consists of concatenated and minified js files 
    //  ReusableModules/
    //      login/ -> login module directory
    //          login.css -> login stylesheet
    //          loginCtrl.js -> login controller
    //          login.html -> login view
    //      listMovies/ -> listMovies module directory
    //          listMovies.css -> listMovies stylesheet
    //          listMovies.js -> listMovies controller
    //          listMovies.html -> listMovies view
    //      movie/ -> movie module directory
    //          movie.css -> movie stylesheet
    //          carCtrl.js -> movie controller
    //          movie.html -> movie view
    //  lib/ -> javascript libraries
    //      angular.js -> AngularJS script
    // index.html -> main html file 

    app.controller('MainCtrl', ['$scope', function($scope) {}]);

    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $routeProvider.
        when('/', {
            templateUrl: 'views/movieListTemplate.html',
            // templateUrl: function (routeParams) {
            //     return '/js/app/htmlTemplates/movieListTemplate.html';
            // },
            controller: 'MainCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);

    // app.run([
    //     '$rootScope',
    //     function($rootScope) {
    //         // see what's going on when the route tries to change
    //         $rootScope.$on('$routeChangeStart', function(event, next, current) {
    //             // next is an object that is the route that we are starting to go to
    //             // current is an object that is the route where we are currently
    //             if (current) {
    //                 var currentPath = current.originalPath;
    //                 var nextPath = next.originalPath;

    //                 console.log('Starting to leave %s to go to %s', currentPath, nextPath);
    //             }

    //         });
    //     }
    // ]);
})();

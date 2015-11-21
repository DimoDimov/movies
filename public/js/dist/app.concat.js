(function() {
    'use strict';
    //we are breaking down the dependencies for mid and huge applications
    //in the current example we will just add all the dependecies in a bulk
    
    //in 'strict mode' used within IIF the 'this' key word was 
    //activley replaced by self. So strange.
    //setting global variable
    self.appDep = self.appDep || {};

    //namespacing
    self.appDep.Libs = angular.module('app.libs', ['ngRoute']);

    self.appDep.Constants = angular.module('app.constants', []);
    self.appDep.Services = angular.module('app.services', []);
    self.appDep.Filters = angular.module('app.filters', []);
    self.appDep.Controllers = angular.module('app.controllers', []);
    self.appDep.Directives = angular.module('app.directives', []);
    self.appDep.Tests = angular.module('app.tests', ['templates']);

    self.appDep.AllDependencies = Neosavvy.AngularCore.Dependencies.concat(
        [
            'app.libs',
            'app.constants',
            'app.services',
            'app.filters',
            'app.controllers',
            'app.directives'
        ]);

    self.appDep.TestDependencies = Neosavvy.AngularCore.Dependencies.concat(
        [
            'app.libs',
            'app.constants',
            'app.services',
            'app.filters',
            'app.controllers',
            'app.directives',
            'app.tests'
        ]);
})();

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

(function() {
    'use strict';
    // API service provider. Responsible for declaring and offering 
    // services to the backend using $http. It handles and saves (logs) 
    // any errors related ot backend requests.
    // It offers Layer of abstraction for dealing with backend manipulations.
    // 'APIservices' are being used together with the 'modelServices'. 
    // Model services is another layer of abstraction for saving and updating
    // any data with the backend. It offers to the controllers in the application reusable logic
    // for saving and sharing temporary data models saved in the model services.
    // randomController => modelService => APIService => backend request. 

    appDep.Services.factory('movieAPIServices',

        //inline array annotation. Best way for minification approach
        ['$http', '$q', 'routingConstants', '$location',
            function($http, $q, routingConstants, $location) {

                var _getAllMovies = function(maxList, page, searchPhrase) {
                    var deferred = $q.defer();

                    var params = {};
                    params.list = maxList;
                    params.page = page;
                    params.q = searchPhrase;
                    
                    var getMovieListUrl = $location.absUrl() + routingConstants.moviesAPI;

                    $http.get(getMovieListUrl, {
                            params: params
                        })
                        .success(function(data, status, headers, config, statusText) {

                            if (data) {
                                if (maxList &&
                                    maxList > 0 &&
                                    data.movies &&
                                    data.movies.length) {

                                    maxList = data.movies.length < maxList ? data.movies.length : maxList;

                                    var movieSubset = [];
                                    for (var i = 0; i < maxList; i++) {
                                        movieSubset.push(data.movies[i]);
                                    }

                                    data.movies = movieSubset;
                                }

                            } else {
                                //we can save and log the problem for history and error tracking purposes
                                console.warn("Error in movieAPIServices _getAllMovies");
                            }

                            deferred.resolve(data);
                        })
                        .error(function(data, status, headers, config, statusText) {

                            if (status === 404) {
                                console.warn("No movies found.");
                                deferred.reject(data, status);
                            } else {
                                //we can save and log the problem for history and error tracking purposes
                                console.warn("Error in movieAPIServices _getAllMovies");
                                data.errorMessage = "Server problems. Please try again later";
                                deferred.reject(data);
                            }
                        });

                    return deferred.promise;
                };

                return {
                    getAllMovies: _getAllMovies
                };
            }
        ]);
})();

(function() {
    'use strict';
    //Declaring routes that are being used by the API Services
    //Change of the routings will be easily updated for the whole application
    //White labeling or multitenancy friendly
    appDep.Constants.constant("routingConstants", {
        url: "http://127.0.0.1",
        port: "8000",
        moviesAPI: "api/movies"
    });

    appDep.Constants.constant("commonConstants", {
        numberMoviesPageLoad: 20,
    });
})();

(function() {
    'use strict';
    appDep.Filters.filter('filterActors', ['validationServices',
        function(validationServices) {

            return function(actors) {
                //debugger; //jshint ignore:line
                if (validationServices.isObject(actors) && validationServices.isArray(actors.list)) {
                    var result = "";
                    //debugger //jshint ignore:line
                    for (var i = 0; i < actors.list.length; i++) {
                        if (i < actors.list.length - 1) {
                            result += actors.list[i].name + ", ";
                        } else {
                            result += actors.list[i].name;
                        }
                    }

                    return result;
                } else {
                    return "";
                }
            };
        }
    ]);

    appDep.Filters.filter('filterDuration', ['validationServices',
        function(validationServices) {

            return function(duration) {

                if (validationServices.isNumeric(duration)) {
                    //make sure we always return integer
                    duration = parseInt(duration);
                    var result = duration / 60;
                    return result;
                } else {
                    return duration;
                }
            };
        }
    ]);
})();

(function() {
    'use strict';
    //API service provider. Responsible for declaring and offering 
    //services to the backend using $http. It handles and saves (logs) 
    //any errors related ot backend requests.
    //It offers Layer of abstraction for dealing with backend manipulations.
    //'APIservices' are being used together with the 'modelServices'. 
    //Model services is another layer of abstraction for saving and updating
    //any data with the backend. It offers to the controllers in the application reusable logic
    //for saving and sharing temporary data models saved in the model services.
    // randomController => modelService => APIService => backend request. 
    appDep.Services.factory('movieModelServices',

        //inline array annotation. Best way for minification approach
        ['$q', 'movieAPIServices', 'validationServices',
            function($q, movieAPIServices, validationServices) {
                var self = this;
                //cashed theMovieList to work and save with temporary model
                //send the updated model back do DB upon request.
                //updates of the model happens here, before Save for example 
                //All CRUD operations are being applied to this model 
                //before sending to Middleware for further manipulation 

                self.movieListCached = null;

                var _getAllMovies = function(maxList, page, searchPhrase, getCashedMovies) {
                    var deferred = $q.defer();
                    
                    if (getCashedMovies && self.movieListCached) {

                        //if need the cashed movieListModel
                        deferred.resolve(self.movieListCached);
                    } else {
                        //go to DB
                        //update page and list values
                        var valdiationResult = validationServices.validateInput(maxList, page);

                        maxList = valdiationResult.numberOfItemsToReturn;

                        page = valdiationResult.pageNumber;

                        movieAPIServices.getAllMovies(maxList, page, searchPhrase)
                            //errors regarding the http request
                            //are being handled and logged in API services
                            .then(function(data) {
                                if (data) {
                                    //process the successfully received from the API service data
                                    this.movieListCached = data;

                                    deferred.resolve(data);
                                } else {
                                    deferred.resolve(data);
                                    //we can save and log the problem for history and error tracking purposes
                                    console.warn("Error in movieModelServices _getAllMovies");
                                }
                            }.bind(self), 
                            function(data, status) {

                                deferred.reject(data);
                            });
                    }

                    return deferred.promise;
                };

                return {
                    getAllMovies: _getAllMovies
                };
            }
        ]);
})();

(function() {
    'use strict';
    appDep.Services.factory('validationServices', [function() {
        //isNumeric tests used by jQuery project http://run.plnkr.co/plunks/93FPpacuIcXqqKMecLdk/
        //more details: http://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric/1830844#1830844
        var _isNumeric = function(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };

        var _isObject = function(o) {
            return o !== null && typeof o === 'object';
        };

        var _isArray = function (arr) {
            return arr && arr.constructor === Array;
        };

        var _isFunction = function (functionToCheck) {
            var getType = {};
            return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
        };

        var _validateInput = function(numberOfItemsToReturn, pageNumber) {

            //------------------------- NumberOfItemsToReturn Validation -----------

            //if Not Valid numberOfItemsToReturn then throw ex
            if (numberOfItemsToReturn !== undefined && !_isNumeric(numberOfItemsToReturn)) {
                console.warn(numberOfItemsToReturn);
                throw "Please provide valid integer for number of items to return.";
            }

            //the numberOfItemsToReturn int should be >= 1

            numberOfItemsToReturn = numberOfItemsToReturn < 1 || numberOfItemsToReturn === undefined ? 1 : numberOfItemsToReturn;

            //we make sure we have a int for numberOfItemsToReturn
            numberOfItemsToReturn = parseInt(numberOfItemsToReturn);

            //---------------------------- PageNumber Validation -----------------

            //if Not Valid pageNumber then throw ex
            if (pageNumber !== undefined && !_isNumeric(pageNumber)) {
                console.warn(pageNumber);
                throw "Please provide valid integer for page number.";
            }

            //the pagenumber int should be >= 1
            pageNumber = pageNumber < 1 || pageNumber === undefined ? 1 : pageNumber;

            //we make sure we have a int for pageNumber
            pageNumber = parseInt(pageNumber);

            return {
                pageNumber: pageNumber,
                numberOfItemsToReturn: numberOfItemsToReturn
            };
        };

        return {
            validateInput: _validateInput,
            isNumeric: _isNumeric,
            isFunction: _isFunction,
            isArray:_isArray,
            isObject:_isObject
        };
    }]);
})();

(function() {
    'use strict';
    appDep.Controllers.controller('movieListCtrl', [
        '$scope', 'movieModelServices', 'commonConstants', 'validationServices',
        function($scope, movieModelServices, commonConstants, validationServices) {
            self = this;

            self.scope = $scope;
            $scope.movieList = [];
            $scope.searchPhrase = '';
            $scope.errorMessage = '';

            $scope.pagination = {};
            $scope.list = commonConstants.numberMoviesPageLoad;
            $scope.currentPage = 1;
            $scope.finalPage = 1;

            $scope.totalfilteredMovies = $scope.list;
            $scope.totalMoviesCount = $scope.list;

            //send this for custom pagination
            $scope.nextcallback = function() {
                if (self.scope.finalPage > self.scope.currentPage) {
                    self.scope.currentPage++;
                }
            }.bind(self);

            $scope.previouscallback = function() {
                if (1 < self.scope.currentPage) {
                    self.scope.currentPage--;
                }
            }.bind(self);

            //self invoked to load 20 movies on page load
            // - On page load, you should display first 20 movies, 
            // ordered alphabetically by title.
            var loadMoviesOnInit = function() {
                movieModelServices.getAllMovies(commonConstants.numberMoviesPageLoad)
                    .then(function(data) {
                        $scope.movieList = data.movies || 1;
                        $scope.list = commonConstants.numberMoviesPageLoad;
                        $scope.totalfilteredMovies = data.totalMoviesCount;
                        $scope.totalMoviesCount = data.totalMoviesCount;
                        $scope.finalPage = Math.ceil(data.totalMoviesCount / $scope.list) || 1;
                    });
            };

            loadMoviesOnInit();

            //exposing the callback functions for testing
            var getAllMoviesSuccess = function(data) {
                
                //on each call we clear the errors
                //if we have more errors they will be loaded on the result
                if (!data.errorMessage) {
                    $scope.errorMessage = '';
                }
                else{
                    $scope.errorMessage = data.errorMessage;
                }

                $scope.movieList = data.movies;
                $scope.totalMoviesCount = data.totalMoviesCount;

                if ($scope.searchPhrase) {
                    $scope.totalfilteredMovies = data.totalfilteredMovies;
                    $scope.finalPage = Math.ceil(data.totalfilteredMovies / $scope.list) || 1;
                } else {
                    $scope.totalfilteredMovies = data.totalMoviesCount;
                    $scope.finalPage = Math.ceil(data.totalMoviesCount / $scope.list) || 1;
                }

                if ($scope.totalfilteredMovies < $scope.list) {

                    $scope.list = $scope.totalfilteredMovies || 1;
                }
            };
            
            //exposing the callback functions for testing
            var getAllMoviesError = function(data) {
                
                //when error received we handle it
                if (data.errorMessage) {
                    $scope.errorMessage = data.errorMessage;
                    $scope.movieList = [];
                }
            };

            var proccessMovies = function(list, currentPage, searchPhrase, forceList) {
                if (searchPhrase.length < 3) {
                    searchPhrase = '';
                }

                if (searchPhrase.length > 2 || searchPhrase === '') {
                
                    movieModelServices.getAllMovies(list, currentPage, searchPhrase)
                        .then(getAllMoviesSuccess, getAllMoviesError);
                }
            };

            $scope.$watch('searchPhrase', function(newVal, oldVal) {
     
                //if search phrase not valid do not call the backend
                if (newVal.length < 3) {
                    $scope.list = commonConstants.numberMoviesPageLoad;
                    $scope.errorMessage = '';
                }

                //if the search phrase have changed do request
                if (oldVal !== newVal) {
                    proccessMovies($scope.list, $scope.currentPage, newVal, false, 'search');
                    return;
                }
            });

            $scope.$watch('list', function(newVal, oldVal) {
                //handling any bad input data
                if (!validationServices.isNumeric(newVal)) {
                    $scope.list = commonConstants.numberMoviesPageLoad;
                }

                if (newVal < 1) {
                    $scope.list = 1;
                }

                if (newVal > $scope.totalMoviesCount) {
                    $scope.list = $scope.totalMoviesCount || 1;
                }

                //if search phrase valid then update $scope.list
                if ($scope.searchPhrase && $scope.searchPhrase.length && $scope.searchPhrase.length > 2) {
                    if ($scope.list > $scope.totalfilteredMovies && $scope.totalfilteredMovies > 0) {
                 
                        $scope.list = $scope.totalfilteredMovies;
                    }
                }

                //do not request final page many times
                //optimisation for uneeded calls
                if (oldVal !== newVal) {

                    if (newVal && oldVal &&
                        (newVal > $scope.totalfilteredMovies && oldVal === $scope.totalfilteredMovies ||
                            newVal >= $scope.totalfilteredMovies && oldVal >= $scope.totalfilteredMovies)) {
                        return;
                    }

                    proccessMovies($scope.list, $scope.currentPage, $scope.searchPhrase, false, 'list');
                }
            });

            $scope.$watch('currentPage', function(newVal, oldVal) {
            
                if (!validationServices.isNumeric(newVal)) {

                    $scope.currentPage = 1;
                    return;
                }

                if (newVal < 1) {
                    $scope.currentPage = 1;
                    return;
                }

                if ($scope.finalPage < $scope.currentPage) {
                    $scope.currentPage = $scope.finalPage;
                    return;
                }

                if (oldVal !== newVal && newVal <= $scope.finalPage && oldVal !== $scope.finalPage + 1) {
                    proccessMovies($scope.list, newVal, $scope.searchPhrase, false, 'currentPage');
                }
            });

            //for dynamic updating the front end
            $scope.$watch('finalPage', function(newVal, oldVal) {
                if ($scope.finalPage < $scope.currentPage) {
                    $scope.currentPage = $scope.finalPage ;
                }
            });
        }
    ]);
})();

(function() {
    'use strict';
    appDep.Directives.directive('movieList', function() {
        return {
            restrict: 'E',
            transclude: true,
            controller: 'movieListCtrl',
            link: function(scope, element, attrs) {
            },
            templateUrl: 'views/movieListView.html'
        };
    });

})();

(function() {
    'use strict';
    appDep.Controllers.controller('paginationCtrl', ['$scope', 'paginationService',
        function($scope, paginationService) {

            //needs to have the next and previous callback functions defined on the scope
            $scope.$watch("finalPage", function(newVal, oldVal) {
                $scope.pagination = paginationService.Pagination($scope.finalPage, $scope.currentPage, $scope.nextcallback, $scope.previouscallback);
            });

            $scope.$watch("currentPage", function(newVal, oldVal) {
                $scope.pagination = paginationService.Pagination($scope.finalPage, $scope.currentPage, $scope.nextcallback, $scope.previouscallback);
            });
        }
    ]);
})();

(function() {
    'use strict';
    appDep.Directives.directive('paginationDir', [
        function() {
            return {
                restrict: 'E',
                transclude: true,
                controller: 'paginationCtrl',
                scope: {
                    nextcallback: "&",
                    previouscallback: "&",

                    finalPage: "=finalpage",
                    currentPage: "=currentpage"
                },
                link: function(scope, element, attrs) {

                    if (!attrs.nextcallback || !attrs.previouscallback) {
                        throw "You must provide nextcallback and previouscallback for pagination service";
                    }
                },
                templateUrl: 'views/paginationView.html'
            };
        }
    ]);
})();

(function() {
    'use strict';
    appDep.Services.factory('paginationService', ['validationServices',
        function(validationServices) {

            var Pagination = function(maxCount, current, nextcallback, previouscallback) {

                var _maxCount = maxCount;
                var _counter = current;

                var self = this;

                self.nextcallback = nextcallback;
                self.previouscallback = previouscallback;

                if (!validationServices.isFunction(self.nextcallback) ||
                    !validationServices.isFunction(self.previouscallback)) {
                    throw "Please provide a next and previous callback functions";
                }

                self.max = function() {
                    return _maxCount;
                };
                self.current = function() {
                    return _counter;
                };
                self.next = function() {
                    if (self.hasNext()) {
                        _counter++;
                        nextcallback();

                    }
                };
                self.previous = function() {
                    if (self.hasPrevious()) {
                        _counter--;
                        self.previouscallback();
                    }
                };
                self.hasPrevious = function() {
                    return _counter > 1;
                };
                self.hasNext = function() {
                    return _counter < _maxCount;
                };
            };

            return {
                Pagination: function(maxCount, current, nextcallback, previouscallback) {
                    return new Pagination(maxCount, current, nextcallback, previouscallback);
                }
            };
        }
    ]);
})();

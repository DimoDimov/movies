(function() {

    // Organizing the code
    // The Domain Style
    var app = angular.module('app', ['ngRoute']);

    // the Structure:
    // resuable modules. What works together lives together. All necessary files
    // of a module are in one folder. Ex: 'modules/movieList'. This helps to easily store
    // and find the build files of each module. This work great for average or huge 
    // Web Applications where hundreds
    // of Controllers, Directives and Views are being declared in the code.

    //Organazing the code 'The Domain Style'
    //With a complex domain model and hundreds of components, an enterprise
    //application can easily become a mess if certain concerns are overlooked. One of the
    //best ways to organize the code in this situation is by distributing each component in
    //a domain-named folder structure. 

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
    //index.html -> main html file 

    app.controller('MainCtrl', ['$scope', function($scope) {}]);

    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $routeProvider.
        when("/", {
            templateUrl: "/js/app/htmlTemplates/movieListTemplate.html",
            controller: 'MainCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);

})();
;(function() {

    var app = angular.module('app');

    //API service provider. Responsible for declaring and offering 
    //services to the backend using $http. It handles and saves (logs) 
    //any errors related ot backend requests.
    //It offers Layer of abstraction for dealing with backend manipulations.
    //'APIservices' are being used together with the 'modelServices'. 
    //Model services is another layer of abstraction for saving and updating
    //any data with the backend. It offers to the controllers in the application reusable logic
    //for saving and sharing temporary data models saved in the model services.
    // randomController => modelService => APIService => backend request. 
    app.factory('movieAPIServices',

        //inline array annotation. Best way for minification approach
        ['$http', '$q', 'routingConstants',
            function($http, $q, routingConstants) {

                var _getAllMovies = function(maxList, page, searchPhrase) {
                    var deferred = $q.defer();

                    var params = {};
                    params.list = maxList;
                    params.page = page;
                    params.q = searchPhrase;

                    $http.get(routingConstants.moviesAPI, {
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
;(function() {

	var app = angular.module('app');
	//Declaring routes that are being used by the API Services
	//Change of the routings will be easily updated for the whole application
	//White labeling or multitenancy friendly
	app.constant("routingConstants", {
        url: "http://localhost",
        port: "8000",
        moviesAPI:"/api/movies"
    });

    app.constant("commonConstants", {
        numberMoviesPageLoad: 20,
    });

})();;(function() {

    var app = angular.module('app');

    app.filter('filterActors', function() {
        return function(actors) {
            var result = "";
            //debugger //jshint ignore:line
            for (var i = 0; i < actors.list.length; i++) {
                if (actors.list.length - 1) {
                     result += actors.list[i].name + ", ";
                 }
            }

            return result;
        };
    });

    app.filter('filterDuration', function() {
        return function(duration) {
            var result = duration / 60;
            return result;
        };
    });

})();
;(function() {

    var app = angular.module('app');

    //API service provider. Responsible for declaring and offering 
    //services to the backend using $http. It handles and saves (logs) 
    //any errors related ot backend requests.
    //It offers Layer of abstraction for dealing with backend manipulations.
    //'APIservices' are being used together with the 'modelServices'. 
    //Model services is another layer of abstraction for saving and updating
    //any data with the backend. It offers to the controllers in the application reusable logic
    //for saving and sharing temporary data models saved in the model services.
    // randomController => modelService => APIService => backend request. 
    app.factory('movieModelServices',

        //inline array annotation. Best way for minification approach
        ['$q', 'movieAPIServices', 'validationServices',
            function($q, movieAPIServices, validationServices) {

                //cashed theMovieList to work and save with temporary model
                //send the updated model back do DB upon request.
                var movieListCached = null;

                var _getAllMovies = function(maxList, page, searchPhrase, getCashedMovies) {
                    var deferred = $q.defer();

                    // debugger //jshint ignore:line
                    if (getCashedMovies && movieListCached) {

                        //if need the cashed movieListModel
                        deferred.resolve(movieListCached.movies);
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
                                    movieListCached = data;

                                    deferred.resolve(data);
                                } else {
                                    //we can save and log the problem for history and error tracking purposes
                                    console.warn("Error in movieModelServices _getAllMovies");
                                }
                            }, function(data, status) {

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
;(function() {

    var app = angular.module('app');

    app.factory('validationServices', [function() {
        //isNumeric tests used by jQuery project http://run.plnkr.co/plunks/93FPpacuIcXqqKMecLdk/
        //more details: http://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric/1830844#1830844
        var isNumeric = function(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };

        var _validateInput = function (numberOfItemsToReturn, pageNumber) {

            //------------------------- NumberOfItemsToReturn Validation -----------

            //if Not Valid numberOfItemsToReturn then throw ex
            if (numberOfItemsToReturn !== undefined && !isNumeric(numberOfItemsToReturn)) {
                console.log(numberOfItemsToReturn);
                throw "Please provide valid integer for number of items to return.";
            }

            //the numberOfItemsToReturn int should be >= 1

            numberOfItemsToReturn = numberOfItemsToReturn < 1 || numberOfItemsToReturn === undefined ? 1 : numberOfItemsToReturn;

            //we make sure we have a int for numberOfItemsToReturn
            numberOfItemsToReturn = parseInt(numberOfItemsToReturn);

            //---------------------------- PageNumber Validation -----------------

            //if Not Valid pageNumber then throw ex
            if (pageNumber !== undefined && !isNumeric(pageNumber)) {
                console.log(pageNumber);
                throw "Please provide valid integer for page number.";
            }

            //the pafenumber int should be >= 1
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
            isNumeric: isNumeric
        };
    }]);
})();
;(function() {

    var app = angular.module('app');

    app.controller('movieListCtrl', [
        '$scope', 'movieModelServices', 'commonConstants', 'paginatonService', 'validationServices',
        function($scope, movieModelServices, commonConstants, paginatonService, validationServices) { //) {

            $scope.Title = "Title1";
            $scope.movieList = [];
            $scope.searchPhrase = '';

            $scope.pagination = {};
            $scope.list = 20;
            $scope.currentPage = 1;
            $scope.finalPage = 1;
            $scope.maxList = 1;

            $scope.totalfilteredMovies = 0;

            //self invoked to load 20 movies on page load
            // - On page load, you should display first 20 movies, 
            // ordered alphabetically by title.

            (function() {
                movieModelServices.getAllMovies(commonConstants.numberMoviesPageLoad)
                    .then(function(data) {
                        // debugger //jshint ignore:line
                        $scope.movieList = data.movies;
                        $scope.list = commonConstants.numberMoviesPageLoad;
                        $scope.pagination = paginatonService.Pagination($scope.finalPage, $scope.currentPage);
                    });
            })();

            var proccessMovies = function(list, currentPage, searchPhrase, forceList) {
                if ($scope.searchPhrase.length > 2 || $scope.searchPhrase === '') {

                    movieModelServices.getAllMovies(list, currentPage, searchPhrase)
                        .then(function(data) {
                            if ($scope.errorMessage) {
                                $scope.errorMessage = '';
                            }

                            $scope.movieList = data.movies;
                            
                            if (searchPhrase) {
                                $scope.finalPage = Math.ceil(data.totalfilteredMovies / $scope.list);
                                $scope.totalfilteredMovies = data.totalfilteredMovies;
                            } else {
                                $scope.totalfilteredMovies = data.totalMoviesCount;
                                $scope.finalPage = Math.ceil(data.totalMoviesCount / $scope.list);
                            }

                            if ($scope.totalfilteredMovies < $scope.list) {
                                $scope.list = $scope.totalfilteredMovies;
                            }

                            $scope.pagination = paginatonService.Pagination($scope.finalPage, $scope.currentPage);

                        }, function(data) {
                            if (data.errorMessage) {
                                $scope.errorMessage = data.errorMessage;
                                $scope.movieList = [];
                            }
                        });
                }
            };

            $scope.$watch('searchPhrase', function(newVal, oldVal) {
                proccessMovies($scope.list, $scope.currentPage, newVal);
            });

            $scope.$watch('list', function(newVal, oldVal) {
                if (newVal < 1) {
                    $scope.list = 1;
                }

                if ($scope.list > $scope.totalfilteredMovies && $scope.totalfilteredMovies > 0) {
                    $scope.list = $scope.totalfilteredMovies;
                }

                proccessMovies(newVal, $scope.currentPage, $scope.searchPhrase);
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

                if ($scope.finalPage < newVal) {
                    $scope.currentPage = $scope.finalPage;
                    return;
                }

                proccessMovies($scope.list, newVal, $scope.searchPhrase);
            });

            $scope.$watch('finalPage', function(newVal, oldVal) {
                if (newVal < $scope.currentPage) {
                    $scope.currentPage = newVal;
                }
            });

            $scope.$on('pagination:next', function() {
                // change page to next
                $scope.currentPage++;
            });
            $scope.$on('pagination:previous', function() {
                // change page to previous
                $scope.currentPage--;
            });
        }
    ]);
})();
;(function() {

	var app = angular.module('app');

	app.directive('movieList', function() {
		return {
			restrict: 'E',
			transclude: true,
			controller: 'movieListCtrl',
			link: function(scope, element, attrs) {
				
			},
			templateUrl: 'js/app/modules/movieList/movieListView.html'
		};
	});

})();

;(function() {

    var app = angular.module('app');

    app.factory('paginatonService', 
        ['$rootScope', 
        function($rootScope) {
        return {
            Pagination: function(maxCount, current) {
                return new Pagination(maxCount, current, $rootScope);
            }
        };
    }]);


    function Pagination(maxCount, current, $rootScope) {
        this.maxCount = maxCount;
        this.counter = current;

        this.max = function() {
            return this.maxCount;
        };
        this.current = function() {
            return this.counter;
        };
        this.next = function() {
            if (this.hasNext()) {
                this.counter++;
                $rootScope.$broadcast("pagination:next", this.counter);
            }
        };
        this.previous = function() {
            if (this.hasPrevious()) {
                this.counter--;
                $rootScope.$broadcast("pagination:previous", this.counter);
            }
        };
        this.hasPrevious = function() {
            return this.counter > 1;
        };
        this.hasNext = function() {
            return this.counter < this.maxCount;
        };
    }    
})();

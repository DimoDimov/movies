(function() {

 appDep.Controllers.controller('movieListCtrl', [
        '$scope', 'movieModelServices', 'commonConstants', 'validationServices',
        function($scope, movieModelServices, commonConstants, validationServices) { //) {
            self = this;

            self.scope = $scope;
            $scope.movieList = [];
            $scope.searchPhrase = '';
            $scope.errorMessage = '';

            $scope.pagination = {};
            $scope.list = 20;
            $scope.currentPage = 1;
            $scope.finalPage = 1;

            $scope.totalfilteredMovies = 0;
            $scope.totalMoviesCount = 0;

            $scope.nextcallback = function () {
                self.scope.currentPage++;
            }.bind(self);

            $scope.previouscallback = function () {
                self.scope.currentPage--;
            }.bind(self);

            var doNotUpdateList = false;

            //self invoked to load 20 movies on page load
            // - On page load, you should display first 20 movies, 
            // ordered alphabetically by title.
            (function() {
                movieModelServices.getAllMovies(commonConstants.numberMoviesPageLoad)
                    .then(function(data) {
                        $scope.movieList = data.movies;
                        $scope.list = commonConstants.numberMoviesPageLoad;
                        $scope.totalfilteredMovies = data.totalMoviesCount;
                        $scope.totalMoviesCount = data.totalMoviesCount;
                        $scope.finalPage = Math.ceil(data.totalMoviesCount / $scope.list);
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
                            $scope.totalMoviesCount = data.totalMoviesCount;

                            if (searchPhrase) {
                                $scope.finalPage = Math.ceil(data.totalfilteredMovies / $scope.list);
                                $scope.totalfilteredMovies = data.totalfilteredMovies;
                            } else {
                                $scope.totalfilteredMovies = data.totalMoviesCount;
                                $scope.finalPage = Math.ceil(data.totalMoviesCount / $scope.list);
                            }

                            if ($scope.totalfilteredMovies < $scope.list) {
                                doNotUpdateList = true;
                                $scope.list = $scope.totalfilteredMovies;
                            }
                        }, function(data) {
                            requestSent = false;

                            if (data.errorMessage) {
                                $scope.errorMessage = data.errorMessage;
                                $scope.movieList = [];
                            }
                        });
                }
            };

            $scope.$watch('searchPhrase', function(newVal, oldVal) {
                if (oldVal && oldVal.length && oldVal.length > 0 && newVal.length === 0) {
                    $scope.list = commonConstants.numberMoviesPageLoad;
                }

                if (oldVal !== newVal) {
                    proccessMovies($scope.list, $scope.currentPage, newVal, false, 'search');
                }

                if (newVal === '' || newVal.length > 2) {
                    $scope.errorMessage = '';
                }
            });

            $scope.$watch('list', function(newVal, oldVal) {
                if (newVal < 1) {
                    $scope.list = 1;
                }

                if ($scope.searchPhrase && $scope.searchPhrase.length && $scope.searchPhrase.length > 2) {
                    if ($scope.list > $scope.totalfilteredMovies && $scope.totalfilteredMovies > 0) {
                        $scope.list = $scope.totalfilteredMovies;
                    }
                }

                if (oldVal !== newVal && !doNotUpdateList) {
                    proccessMovies(newVal, $scope.currentPage, $scope.searchPhrase, false, 'list');
                }
                else{
                    doNotUpdateList = false;
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
                // debugger; //jshint ignore:line
                if ($scope.finalPage < newVal) {
                    $scope.currentPage = $scope.finalPage;
                    return;
                }

                if (oldVal !== newVal) {
                    proccessMovies($scope.list, newVal, $scope.searchPhrase, false, 'currentPage');
                }
            });

            $scope.$watch('finalPage', function(newVal, oldVal) {
                if (newVal < $scope.currentPage) {
                    $scope.currentPage = newVal;
                }
            });
        }
    ]);
})();

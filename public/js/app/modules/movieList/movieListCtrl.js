(function() {

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

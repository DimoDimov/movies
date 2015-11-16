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

                if (searchPhrase.length < 3) {
                    searchPhrase = '';
                }
                
                if (searchPhrase.length > 2 || searchPhrase === '') {
                    
                    movieModelServices.getAllMovies(list, currentPage, searchPhrase)
                        .then(function(data) {

                            //on each call we clear the errors
                            //if we have more errors they will be loaded on the result
                            if ($scope.errorMessage && !data.errorMessage) {
                                $scope.errorMessage = '';
                            }

                            $scope.movieList = data.movies;
                            $scope.totalMoviesCount = data.totalMoviesCount;

                            if (searchPhrase) {
                                $scope.totalfilteredMovies = data.totalfilteredMovies;
                                $scope.finalPage = Math.ceil(data.totalfilteredMovies / $scope.list);
                            } else {
                                $scope.totalfilteredMovies = data.totalMoviesCount;
                                $scope.finalPage = Math.ceil(data.totalMoviesCount / $scope.list);
                            }

                            if ($scope.totalfilteredMovies < $scope.list) {

                                $scope.list = $scope.totalfilteredMovies;
                            }
                        }, function(data) {
                            requestSent = false;

                            //when error received we handle it
                            if (data.errorMessage) {
                                $scope.errorMessage = data.errorMessage;
                                $scope.movieList = [];
                            }
                        });
                }
            };

            $scope.$watch('searchPhrase', function(newVal, oldVal) {
                //if search phrase not valid do not call the backend
                if (oldVal && oldVal.length && oldVal.length > 0 && newVal.length < 3) {
                    $scope.list = commonConstants.numberMoviesPageLoad;
                    $scope.errorMessage = '';
                }

                //if the search phrase have changed do request
                if (oldVal !== newVal) {
                    proccessMovies($scope.list, $scope.currentPage, newVal, false, 'search');
                    return;
                }

                if (oldVal.length === 3 && newVal.length === 2) {
                    $scope.list = commonConstants.numberMoviesPageLoad;
                    $scope.currentPage = 1;
                    proccessMovies($scope.list, $scope.currentPage, '', false, 'search');
                }
            });

            $scope.$watch('list', function(newVal, oldVal) {
                //handling any bad input data
                if (!validationServices.isNumeric(newVal)) {
                    $scope.list = commonConstants.numberMoviesPageLoad;
                    $scope.totalfilteredMovies = 0;
                }

                if (newVal < 1) {
                    $scope.list = 1;
                }

                if (newVal > $scope.totalMoviesCount) {
                    $scope.list = $scope.totalMoviesCount;
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
                        (newVal > $scope.totalfilteredMovies && oldVal === $scope.totalfilteredMovies  ||
                         newVal >= $scope.totalfilteredMovies && oldVal >= $scope.totalfilteredMovies)) {
                        return;
                    }

                    //when no change do not update
                    if (newVal === oldVal){
                        return;
                    }
                    proccessMovies(newVal, $scope.currentPage, $scope.searchPhrase, false, 'list');
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

                if ($scope.finalPage < newVal) {
                    $scope.currentPage = $scope.finalPage;
                    return;
                }

                if (oldVal !== newVal && newVal <= $scope.finalPage && oldVal !== $scope.finalPage + 1) {
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
(function() {

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

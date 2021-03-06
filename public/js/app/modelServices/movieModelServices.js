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

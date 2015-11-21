//Detaching the middleware logic from the routes
//by isolating the logic we can test it, 
//not just testing the endpoints
(function() {
    'use strict';
    var Q = require('q');
    var path = require('path');
    var db = require(path.resolve(__dirname, '../data.json'));
    var validate = require(path.resolve(__dirname, 'modules/validate.js'));
    var filterMovies = require(path.resolve(__dirname, 'modules/filterMovies.js'));

    module.exports = function(req, res) {
        var deferred = Q.defer();

        //------------ Url Params ------------
        var params = {};
        params.list = req.query.list;
        params.page = req.query.page;
        params.query = req.query.q;

        //------------ Variables ------------
        var result = {};
        result.movies = [];
        result.errorMessage = "";
        var filteredMovies = [];

        //------------ Bullets ------------

        //break down the middleware logic into sub moduls to be tested
        validate.inputParams(params, db);

        filteredMovies = filterMovies.byPhrase(params, db);

        filterMovies.byPageAndList(params, db, res, result, filteredMovies, deferred);

        return deferred.promise;
    };
})();

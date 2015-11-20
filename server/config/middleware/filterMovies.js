//------ All Input Data Validation ------------

(function() {
    'use strict';
    var exports = module.exports;

    //-------------------- FilterResultsByPhrase --------------------
    var _filterByPhrase = function(params, db) {
    	var filteredMovies = [];

        if (params.query &&
            params.query.length &&
            params.query.length > 2) {

            for (var i = 0; i < db.movies.length; i++) {
                if (~db.movies[i].title.toLowerCase().indexOf(params.query)) {
                    filteredMovies.push(db.movies[i]);
                }
            }

        } else {
            filteredMovies = db.movies;
        }

        return filteredMovies;
    };

    //--------------------- Allow limiting the number of items returned --------------------
    //--------------------- Allow pagination of data, e.g. get 10 items from the 4th 'page' --------------------
    var _filterByPageAndList = function(params, db, res, result, filteredMovies, deferred) {
        if (!filteredMovies.length) {
            result.errorMessage = 'No matching items';
            result.totalfilteredMovies = filteredMovies.length;
            result.totalMoviesCount = db.movies.length;
            res.status(404).send(result);
            deferred.resolve(result);
            return;
        }

        var movieChunk = [];

        if (params.page * params.list > filteredMovies.length) {
            params.page = Math.ceil(filteredMovies.length / params.list);
        }

        var firstIndex = params.page * params.list - params.list;
        var lastIndex = params.page * params.list;

        if (lastIndex > filteredMovies.length) {
            lastIndex = filteredMovies.length;
        }

        for (var i = firstIndex; i < lastIndex; i++) {
            movieChunk.push(filteredMovies[i]);
        }

        result.movies = movieChunk;
        result.totalfilteredMovies = filteredMovies.length;
        result.totalMoviesCount = db.movies.length;

        res.status(200).send(result);
        deferred.resolve(result);
    };

    exports.byPhrase = _filterByPhrase;
    exports.byPageAndList = _filterByPageAndList;

})();

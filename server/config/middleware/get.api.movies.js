var Q = require('q');

module.exports = function(req, res, db) {
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

    //------------ Helpers ------------
    //isNumeric tests used by jQuery project http://run.plnkr.co/plunks/93FPpacuIcXqqKMecLdk/
    //more details: http://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric/1830844#1830844
    var isNumeric = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    //------------ Bullets ------------
    validateInput();

    filterByPhrase();

    filterByPageAndList();

    //------ All Input Data Validation ------------
    function validateInput() {
        if (params.list) {
            if (!isNumeric(params.list)) {
                params.list = 20;
            } else {
                if (params.list < 1 || params.list === undefined) {
                    params.list = 1;
                }
            }

            params.list = parseInt(params.list);
        } else {
            params.list = 20;
        }

        if (params.page) {
            if (!isNumeric(params.page)) {
                params.page = 1;
            } else {
                if (params.page < 1 || params.page === undefined) {
                    params.page = 1;
                }
            }

            params.page = parseInt(params.page);
        } else {
            params.page = 1;
        }

        if (params.query === undefined) {
            params.query = "";
        }

        if (params.query) {
            params.query = params.query.toLowerCase();
        }
    }

    //-------------------- FilterResultsByPhrase --------------------
    function filterByPhrase() {
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
    }

    //--------------------- Allow limiting the number of items returned --------------------
    //--------------------- Allow pagination of data, e.g. get 10 items from the 4th 'page' --------------------
    function filterByPageAndList() {
        if (!filteredMovies.length) {
            result.errorMessage = 'No matching items';
            result.totalfilteredMovies = filteredMovies.length;
            result.totalMoviesCount = db.movies.length;
            res.status(404).send(result);
            deferred.resolve();
            return;
        }

        var movieChunk = [];

        var firstIndex = params.page * params.list - params.list;
        var lastIndex = params.page * params.list;

        //preventing bad data from throwing exceptions
        if (firstIndex > filteredMovies.length) {
            firstIndex = firstIndex.length;
        }

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
        deferred.resolve();
    }

    return deferred.promise;
};

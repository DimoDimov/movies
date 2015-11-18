//Detaching the middleware logic from the routes
//by isolating the logic we can test it, 
//not just testing the endpoints

var Q = require('q');
var path = require('path');
var db = require(path.resolve('server/data.json'));
var validate = require(path.resolve('server/config/middleware/validate.js'));

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

    //------------ Helpers ------------
    //isNumeric tests used by jQuery project http://run.plnkr.co/plunks/93FPpacuIcXqqKMecLdk/
    //more details: http://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric/1830844#1830844
    var isNumeric = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    // params = validate.input(params);
    validateInput();
    filterByPhrase();

    filterByPageAndList();



    //------ All Input Data Validation ------------

    function validateInput() {
        var listPerPageConst = 20;
        var startPageConst = 1;
        var minimalValueForPageAndList = 1;

        if (params.list) {

            if (!isNumeric(params.list)) {

                params.list = listPerPageConst;
            } else {
                if (params.list < minimalValueForPageAndList ||
                    params.list > db.movies.length) {
                    params.list = listPerPageConst;
                }
            }

            params.list = parseInt(params.list);
        } else {
            params.list = listPerPageConst;
        }

        if (params.page) {
            if (!isNumeric(params.page)) {
                params.page = startPageConst;
            } else {
                if (params.page < minimalValueForPageAndList || 
                    params.list * params.page > db.movies.length) {
                    params.page = startPageConst;
                }
            }

            params.page = parseInt(params.page);
        } else {
            params.page = startPageConst;
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
            deferred.resolve(result);
            return;
        }

        var movieChunk = [];

        if (params.page * params.list > filteredMovies.length) {
            params.page = Math.ceil(filteredMovies.length / params.list);
        }

        var firstIndex = params.page * params.list - params.list;
        var lastIndex = params.page * params.list;

        //preventing bad data from throwing exceptions

        // if (firstIndex > filteredMovies.length) {
        //     firstIndex = filteredMovies.length;
        // }

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
    }

    return deferred.promise;
};

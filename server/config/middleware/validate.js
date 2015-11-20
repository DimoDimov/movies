//------ All Input Data Validation ------------

(function () {
    'use strict';
	var exports = module.exports;

	//------------ Helpers ------------
    //isNumeric tests used by jQuery project http://run.plnkr.co/plunks/93FPpacuIcXqqKMecLdk/
    //more details: http://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric/1830844#1830844
	var _isNumeric = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    var _validateInputParams = function (params, db) {
        var listPerPageConst = 20;
        var startPageConst = 1;
        var minimalValueForPageAndList = 1;

        if (params.list) {

            if (!_isNumeric(params.list)) {

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
            if (!_isNumeric(params.page)) {
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

        return params;
    };

    exports.inputParams = _validateInputParams;
    exports.isNumeric = _isNumeric;

})();

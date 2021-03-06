(function() {
    'use strict';
    appDep.Services.factory('validationServices', [function() {
        //isNumeric tests used by jQuery project http://run.plnkr.co/plunks/93FPpacuIcXqqKMecLdk/
        //more details: http://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric/1830844#1830844
        var _isNumeric = function(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };

        var _isObject = function(o) {
            return o !== null && typeof o === 'object';
        };

        var _isArray = function (arr) {
            return arr && arr.constructor === Array;
        };

        var _isFunction = function (functionToCheck) {
            var getType = {};
            return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
        };

        var _validateInput = function(numberOfItemsToReturn, pageNumber) {

            //------------------------- NumberOfItemsToReturn Validation -----------

            //if Not Valid numberOfItemsToReturn then throw ex
            if (numberOfItemsToReturn !== undefined && !_isNumeric(numberOfItemsToReturn)) {
                console.warn(numberOfItemsToReturn);
                throw "Please provide valid integer for number of items to return.";
            }

            //the numberOfItemsToReturn int should be >= 1

            numberOfItemsToReturn = numberOfItemsToReturn < 1 || numberOfItemsToReturn === undefined ? 1 : numberOfItemsToReturn;

            //we make sure we have a int for numberOfItemsToReturn
            numberOfItemsToReturn = parseInt(numberOfItemsToReturn);

            //---------------------------- PageNumber Validation -----------------

            //if Not Valid pageNumber then throw ex
            if (pageNumber !== undefined && !_isNumeric(pageNumber)) {
                console.warn(pageNumber);
                throw "Please provide valid integer for page number.";
            }

            //the pagenumber int should be >= 1
            pageNumber = pageNumber < 1 || pageNumber === undefined ? 1 : pageNumber;

            //we make sure we have a int for pageNumber
            pageNumber = parseInt(pageNumber);

            return {
                pageNumber: pageNumber,
                numberOfItemsToReturn: numberOfItemsToReturn
            };
        };

        return {
            validateInput: _validateInput,
            isNumeric: _isNumeric,
            isFunction: _isFunction,
            isArray:_isArray,
            isObject:_isObject
        };
    }]);
})();

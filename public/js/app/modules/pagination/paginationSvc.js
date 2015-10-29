(function() {

    var app = angular.module('app');

    app.factory('paginationService', ['validationServices',
        function(validationServices) {

            var Pagination = function(maxCount, current, nextcallback, previouscallback) {

                this.maxCount = maxCount;
                this.counter = current;

                this.max = function() {
                    return this.maxCount;
                };
                this.current = function() {
                    return this.counter;
                };
                this.next = function() {
                    if (this.hasNext()) {
                        this.counter++;
                        if (validationServices.isFunction(nextcallback)) {
                            nextcallback();
                        }
                        else{
                        	throw "Please provide a next callback function";
                        }
                    }
                };
                this.previous = function() {
                    if (this.hasPrevious()) {
                        this.counter--;

                        if (validationServices.isFunction(previouscallback)) {
                            previouscallback();
                        }
                        else{
                        	throw "Please provide a previous callback function";
                        }
                    }
                };
                this.hasPrevious = function() {
                    return this.counter > 1;
                };
                this.hasNext = function() {
                    return this.counter < this.maxCount;
                };
            };

            return {
                Pagination: function(maxCount, current, nextcallback, previouscallback) {
                    return new Pagination(maxCount, current, nextcallback, previouscallback);
                }
            };
        }
    ]);


})();

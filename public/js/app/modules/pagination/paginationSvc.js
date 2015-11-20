(function() {
    'use strict';
    appDep.Services.factory('paginationService', ['validationServices',
        function(validationServices) {

            var Pagination = function(maxCount, current, nextcallback, previouscallback) {

                var _maxCount = maxCount;
                var _counter = current;

                var self = this;

                self.nextcallback = nextcallback;
                self.previouscallback = previouscallback;

                if (!validationServices.isFunction(self.nextcallback) ||
                    !validationServices.isFunction(self.previouscallback)) {
                    throw "Please provide a next and previous callback functions";
                }

                self.max = function() {
                    return _maxCount;
                };
                self.current = function() {
                    return _counter;
                };
                self.next = function() {
                    if (self.hasNext()) {
                        _counter++;
                        nextcallback();

                    }
                };
                self.previous = function() {
                    if (self.hasPrevious()) {
                        _counter--;
                        self.previouscallback();
                    }
                };
                self.hasPrevious = function() {
                    return _counter > 1;
                };
                self.hasNext = function() {
                    return _counter < _maxCount;
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

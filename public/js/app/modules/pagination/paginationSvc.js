(function() {

    appDep.Services.factory('paginationService', ['validationServices',
        function(validationServices) {

            var Pagination = function(maxCount, current, nextcallback, previouscallback) {

                var _maxCount = maxCount;
                var _counter = current;

                this.nextcallback = nextcallback;
                this.previouscallback = previouscallback;

                if (!validationServices.isFunction(this.nextcallback) ||
                    !validationServices.isFunction(this.previouscallback)) {
                    throw "Please provide a next and previous callback functions";
                }

                this.max = function() {
                    return _maxCount;
                };
                this.current = function() {
                    return _counter;
                };
                this.next = function() {
                    if (this.hasNext()) {
                        _counter++;
                        nextcallback();

                    }
                };
                this.previous = function() {
                    if (this.hasPrevious()) {
                        _counter--;
                        this.previouscallback();
                    }
                };
                this.hasPrevious = function() {
                    return _counter > 1;
                };
                this.hasNext = function() {
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

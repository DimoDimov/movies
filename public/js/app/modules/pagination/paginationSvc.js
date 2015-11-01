(function() {

    app.Services.factory('paginationService', ['validationServices',
        function(validationServices) {

            var Pagination = function(maxCount, current, nextcallback, previouscallback) {

                var _maxCount = maxCount;
                var _counter = current;

                this.nextcallback = nextcallback;
                this.previouscallback = previouscallback;

                this.max = function() {
                    return _maxCount;
                };
                this.current = function() {
                    return _counter;
                };
                this.next = function() {
                    if (this.hasNext()) {
                        _counter++;
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
                        _counter--;

                        if (validationServices.isFunction(this.previouscallback)) {
                             this.previouscallback();
                        }
                        else{
                        	throw "Please provide a previous callback function";
                        }
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

(function() {

    var app = angular.module('app');

    app.factory('paginatonService', 
        ['$rootScope', 
        function($rootScope) {
        return {
            Pagination: function(maxCount, current) {
                return new Pagination(maxCount, current, $rootScope);
            }
        };
    }]);


    function Pagination(maxCount, current, $rootScope) {
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
                $rootScope.$broadcast("pagination:next", this.counter);
            }
        };
        this.previous = function() {
            if (this.hasPrevious()) {
                this.counter--;
                $rootScope.$broadcast("pagination:previous", this.counter);
            }
        };
        this.hasPrevious = function() {
            return this.counter > 1;
        };
        this.hasNext = function() {
            return this.counter < this.maxCount;
        };
    }    
})();

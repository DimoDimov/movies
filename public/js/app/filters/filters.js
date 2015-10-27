(function() {

    var app = angular.module('app');

    app.filter('filterActors', function() {
        return function(actors) {
            var result = "";
            //debugger //jshint ignore:line
            for (var i = 0; i < actors.list.length; i++) {
                if (actors.list.length - 1) {
                     result += actors.list[i].name + ", ";
                 }
            }

            return result;
        };
    });

    app.filter('filterDuration', function() {
        return function(duration) {
            var result = duration / 60;
            return result;
        };
    });

})();

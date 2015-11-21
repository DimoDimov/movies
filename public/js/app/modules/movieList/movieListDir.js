(function() {
    'use strict';
    appDep.Directives.directive('movieList', function() {
        return {
            restrict: 'E',
            transclude: true,
            controller: 'movieListCtrl',
            link: function(scope, element, attrs) {
            },
            templateUrl: 'views/movieListView.html'
        };
    });

})();

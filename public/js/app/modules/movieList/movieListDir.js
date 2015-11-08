(function() {

    appDep.Directives.directive('movieList', function() {
        return {
            restrict: 'E',
            transclude: true,
            controller: 'movieListCtrl',
            link: function(scope, element, attrs) {
            },
            templateUrl: 'js/app/modules/movieList/movieListView.html'
        };
    });

})();

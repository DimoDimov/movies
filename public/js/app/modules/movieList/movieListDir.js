(function() {

    appDep.Directives.directive('movieList', function() {
        return {
            restrict: 'E',
            transclude: true,
            controller: 'movieListCtrl',
            link: function(scope, element, attrs) {

                // scope.$watch('errorMessage', function(newVal, oldVal) {
                //     if (oldVal !== newVal && newVal) {
                //         $('.hide-if-error').hide();
                //     } else {
                //         $('.hide-if-error').show();
                //     }
                // });
            },
            templateUrl: 'js/app/modules/movieList/movieListView.html'
        };
    });

})();

(function() {
    'use strict';
    appDep.Directives.directive('paginationDir', [
        function() {
            return {
                restrict: 'E',
                transclude: true,
                controller: 'paginationCtrl',
                scope: {
                    nextcallback: "&",
                    previouscallback: "&",

                    finalPage: "=finalpage",
                    currentPage: "=currentpage"
                },
                link: function(scope, element, attrs) {

                    if (!attrs.nextcallback || !attrs.previouscallback) {
                        throw "You must provide nextcallback and previouscallback for pagination service";
                    }
                },
                templateUrl: 'views/paginationView.html'
            };
        }
    ]);
})();

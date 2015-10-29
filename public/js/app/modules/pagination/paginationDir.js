(function() {

    var app = angular.module('app');

    app.directive('paginationDir', [
        function() {
            return {
                restrict: 'E',
                transclude: true,
                controller: 'paginationCtrl',
                scope:{
                    nextcallback:"&",
                    previouscallback:"&",

                    finalPage:"=finalpage",
                    currentPage:"=currentpage"
                },
                link: function(scope, element, attrs) {

                },
                templateUrl: 'js/app/modules/pagination/paginationView.html'
            };
        }
    ]);

})();

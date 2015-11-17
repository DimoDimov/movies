(function() {

    appDep.Controllers.controller('paginationCtrl', ['$scope', 'paginationService',
        function($scope, paginationService) {

            //needs to have the next and previous callback functions defined on the scope
            $scope.$watch("finalPage", function(newVal, oldVal) {
                $scope.pagination = paginationService.Pagination($scope.finalPage, $scope.currentPage, $scope.nextcallback, $scope.previouscallback);
            });

            $scope.$watch("currentPage", function(newVal, oldVal) {
                $scope.pagination = paginationService.Pagination($scope.finalPage, $scope.currentPage, $scope.nextcallback, $scope.previouscallback);
            });
        }
    ]);
})();

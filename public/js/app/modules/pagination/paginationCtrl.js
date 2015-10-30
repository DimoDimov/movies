(function() {

    var app = angular.module('controllers');

    app.controller('paginationCtrl', 
    	['$scope', 'paginationService', 
        function($scope, paginationService) {  
        	$scope.$watch("finalPage", function (newVal, oldVal) {
        		$scope.pagination = paginationService.Pagination($scope.finalPage, $scope.currentPage, $scope.nextcallback, $scope.previouscallback);
        	});

        	$scope.$watch("currentPage", function (newVal, oldVal) {	
        		$scope.pagination = paginationService.Pagination($scope.finalPage, $scope.currentPage, $scope.nextcallback, $scope.previouscallback);
        	});
        }
    ]);
})();

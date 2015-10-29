describe("paginationService", function () {
	var pagination,
		finalPage,
		factory;

    //Controller Testing
	beforeEach(function () {
		module('app');

		inject(function ($injector) {
			factory = $injector.get('paginationService');
		});

		//pagination = paginationService.Pagination($scope.finalPage, $scope.currentPage, $scope);
	});

	describe("Initialization", function () {
		it("Should instantiate pagination", function () {



			expect($scope.list).toEqual(20);
		});

		// it("Should instantiate current page to equal 1", function () {
		// 	expect($scope.currentPage).toEqual(1);
		// });
	});
});
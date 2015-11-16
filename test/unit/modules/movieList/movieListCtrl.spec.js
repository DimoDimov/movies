//Controllers Testing

describe("movieListCtrl", function () {
	var $rootScope,
		$scope,
		controller;

    //Controller Testing
	beforeEach(function () {
		
		module.apply(module, appDep.TestDependencies);

		inject(function ($injector) {
			$rootScope = $injector.get('$rootScope');
			$scope = $rootScope.$new();
			controller = $injector.get('$controller')("movieListCtrl", {$scope:$scope});

		});
	});	

	describe("Initialization", function () {
		it("Should instantiate movie list to equal 20", function () {
			expect($scope.list).toEqual(20);
		});

		it("Should instantiate current page to equal 1", function () {
			expect($scope.currentPage).toEqual(1);
		});
	});


	describe("Method Testing", function () {
		it("Should increment currentPage when nextcallback() is being called", function () {
			//set final page for testing
			$scope.finalPage = 5;

			expect($scope.currentPage).toEqual(1);
			$scope.nextcallback();
			expect($scope.currentPage).toEqual(2);
			$scope.nextcallback();
			expect($scope.currentPage).toEqual(3);
		});

		it("Should increment currentPage when nextcallback() is being called but should not be able to go above the final page", function () {
			//set final page for testing
			$scope.finalPage = 5;
			expect($scope.currentPage).toEqual(1);

			//try to increment above the final page
			for (var i = 0; i < $scope.finalPage + 10; i++) {
				$scope.nextcallback();
			}

			expect($scope.currentPage).toEqual($scope.finalPage);
		});

		it("Should decrement currentPage when previouscallback() is being called but should not be able to go below 1", function () {
			//set final page for testing
			$scope.finalPage = 5;
			expect($scope.currentPage).toEqual(1);

			//increment to final page
			for (var i = 0; i < $scope.finalPage; i++) {
				$scope.nextcallback();
			}

			//try to decrement below 1
			for (var j = 0; j < $scope.finalPage + 10; j++) {
				$scope.previouscallback();
			}

			expect($scope.currentPage).toEqual(1);
		});

		it("Should decrement currentPage when previouscallback() is being called", function () {
			//set final page for testing
			$scope.finalPage = 5;

			expect($scope.currentPage).toEqual(1);
			$scope.nextcallback();
			$scope.nextcallback();
			$scope.nextcallback();
			expect($scope.currentPage).toEqual(4);
			$scope.previouscallback();
			expect($scope.currentPage).toEqual(3);
			$scope.previouscallback();
			expect($scope.currentPage).toEqual(2);
			$scope.previouscallback();
			expect($scope.currentPage).toEqual(1);
		});
	});
});
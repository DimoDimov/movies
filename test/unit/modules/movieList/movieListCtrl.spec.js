//Controllers Testing

describe("movieListCtrl", function () {
	var $rootScope,
		$scope,
		controller;

    //Controller Testing
	beforeEach(function () {
		//replace each dependency with a bulk => module('pie', 'desserts');
        // module.apply(this, app.Dependencies);
		module('app');

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
});
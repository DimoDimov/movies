//Controllers Testing

describe("paginationCtrl", function() {
    var $rootScope,
        $scope,
        controller;

    //Controller Testing
    beforeEach(function() {

        module.apply(module, appDep.TestDependencies);

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            controller = $injector.get('$controller')("paginationCtrl", {
                $scope: $scope
            });
        });
    });

    describe("Initialization", function() {
        it("Should not have defined pagination", function() {
            expect($scope.pagination).toBeUndefined();
        });

        it("Should not have defined finalPage", function() {
            expect($scope.finalPage).toBeUndefined();
        });

        it("Should not have defined currentPage", function() {
            expect($scope.currentPage).toBeUndefined();
        });
    });

    describe("Watchers", function() {
        it("Should instantiate pagination when currentPage and finalPage have been defined", function() {
            $scope.currentPage = 1;
            $scope.finalPage = 10;
            $scope.$digest();
            expect($scope.pagination).toBeDefined();
        });
    });
});

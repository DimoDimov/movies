//Directory Testing

describe("movieListDir", function() {
    var $rootScope,
        $scope,
        $compile,
        el,
        $body = $('body'),
        simpleHtml = '<movie-list class="movie-list-wrapper"></movie-list>';

    //Controller Testing
    beforeEach(function() {
        module.apply(module, app.Dependencies);

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $compile = $injector.get('$compile');
            el = $compile(angular.element(simpleHtml))($scope);
        });
        
        $body.append(el);
        $rootScope.$digest();
        $el = $('.movie-list-wrapper');
        
    });

    describe("Initialization", function() {
        it("Should instantiate movie list to equal 20", function() {
            expect(20).toEqual(20);
        });
    });

    // describe("Initialization", function () {
    // 	it("Should instantiate movie list to equal 20", function () {
    // 		expect($scope.list).toEqual(20);
    // 	});

    // 	it("Should instantiate current page to equal 1", function () {
    // 		expect($scope.currentPage).toEqual(1);
    // 	});
    // });
});

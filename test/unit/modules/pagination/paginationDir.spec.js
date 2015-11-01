//Directory Testing

describe("paginationDir", function() {
    var $rootScope,
        $scope,
        $compile,
        el,
        $body = $('body'),
        simpleHtml = '<pagination-dir class="pagination-wrapper" nextcallback="nextcallback()" previouscallback="previouscallback()" finalpage="10" currentpage="1"></pagination-dir>';

    //Controller Testing
    beforeEach(function() {
        module.apply(module, appDep.TestDependencies);

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $compile = $injector.get('$compile');
            el = $compile(angular.element(simpleHtml))($scope);                        
        });
        
        $body.append(el);
        $rootScope.$digest();
        
        $el = $('.pagination-wrapper');
    });

    afterEach(function () {
        $body.empty();
    });

    describe("Initialization", function() {
        it("Should compile el", function() {
            expect(el).not.toBeNull();
        });

        it("Should add el to DOM", function() {
            expect($el.length).toEqual(1);
        });
    });

    describe("throw exception if no callbacks declared", function() {
        
        it("Should try to compile element and to throw exception", function() {
            var $scope = $rootScope.$new();
            var wrongHtml = '<pagination-dir class="pagination-wrapper" finalpage="10" currentpage="1"></pagination-dir>';
            var compileFunc = function () {
               $compile(angular.element(wrongHtml))($scope);
               $rootScope.$digest();
            };

            expect(compileFunc).toThrow();
        });
    });
});

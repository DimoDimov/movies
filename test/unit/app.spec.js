//Controllers Testing

describe("Main application testing", function() {
    var $rootScope,
        $scope,
        $controller,
        controller,
        injector;

    //Controller Testing
    beforeEach(function() {

        module('app');

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $controller = $injector.get('$controller');
            controller = $controller('MainCtrl', {
                $scope: $scope
            });

        });
    });

    describe("Initialization", function() {
        it("Should have the 'MainCtrl' defined", function() {
            expect(controller).toBeDefined();
        });
    });
});

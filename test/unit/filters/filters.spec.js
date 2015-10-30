//Filters Testing

describe('Filter duration tests', function() {
    var filter, $filter;

    beforeEach(function() {
        //$inject
        //module('app');
        //replace each dependency with a bulk => module('pie', 'desserts');
        //console.log(app.Dependencies);
        //debugger //jshint ignore:line
        module.apply(module, app.Dependencies);

        //module('app');
        inject(function($injector) {
            $filter = $injector.get('$filter');

            filter = $filter('filterDuration');
        });

    });

    it("Should return undefined when undefined is passed in", function() {
        expect(filter(undefined)).toBeUndefined();
    });

    it("Should return null when null is passed in", function() {
        expect(filter(null)).toBeNull();
    });

    it("Should return empty string when empty string is passed in", function() {
        expect(filter("")).toEqual("");
    });

    it("Should return 120 min when 7200 seconds are passed in", function() {
        expect(filter(7200)).toEqual(120);
    });

    it("Should return integer 120 min when 7200.5 seconds are passed in", function() {
        expect(filter(7200.5)).toEqual(120);
    });
});

describe('Filter actors tests', function() {
    var filter, $filter;

    beforeEach(function() {
        module.apply(module, app.Dependencies);

        inject(function($injector) {
            $filter = $injector.get('$filter');
            //debugger;//jshint ignore:line
            filter = $filter('filterActors');
        });

    });

    it("Should return empty string when undefined is passed in", function() {
        expect(filter(undefined)).toEqual("");
    });

    it("Should return empty string when null is passed in", function() {
        expect(filter(null)).toEqual("");
    });

    it("Should return empty string when empty string is passed in", function() {
        expect(filter("")).toEqual("");
    });

    it("Should return 'John, Mary, Betty' when {list:[{name:'John'},{name:'Mary'},{name:'Betty'}]} passed in", function() {
        var actors = {
            list: [{
                name: "John"
            }, {
                name: "Mary"
            }, {
                name: "Betty"
            }]
        };
        expect(filter(actors)).toEqual("John, Mary, Betty");
    });

    it("Should return empty string when list is empty", function() {
        var actors = {
            list: []
        };
        expect(filter(actors)).toEqual("");

        actors = {};
        expect(filter(actors)).toEqual("");
    });
});

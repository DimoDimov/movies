describe("Movie list testing", function() {
    var tableRows,
        tableRowsCount,
        expected,
        notexpected,
        $filter,
        filterDuration,
        filterActors;

    beforeEach(function() {
        browser.get('http://127.0.0.1:8000/');
        // inject(function($injector) {
        //     $filter = $injector.get('$filter');

        //     filterDuration = $filter('filterDuration');
        //     filterActors = $filter('filterActors');
        // });
    });

    it("Should navigate to the correct page", function() {
        expect(browser.getCurrentUrl()).toContain('127.0.0.1:8000');
        expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:8000/');
    });

    //get the isolated logic for testing the movie list page
    var movieListPage = require('./movieListPage.js');

    describe("Should initialize the page with all needed data", function() {

        beforeEach(function() {

            tableRows = element.all(by.css('.movie-list-wrapper tbody tr'));

            //resolve the tableRows, means we have the movie data loaded
            tableRows.count().then(function(newCount) {
                tableRowsCount = newCount;
            });
        });

        it("Should contain message asking to input at least 3 charachters", function() {
            expected = "Enter at least three characters to begin search";
            existingEl = true;

            movieListPage.testInput3CharachtersMsg(expected, existingEl);
        });

        it("Should hide the custom error message", function() {
            expected = false;
            movieListPage.testCustomErrorMsg(expected);
        });

        it("Should have the 'items per page' counter set on 20", function() {
            expected = 20;
            notexpected = 21;

            movieListPage.testItemsPerPageCounter(expected, notexpected);
        });

        it("Should have the pages counter set on 1", function() {
            expected = 1;
            notexpected = 0;

            movieListPage.testPagesCounter(expected, notexpected);
        });

        it("Should have the total pages counter set on 8", function() {
            expected = 8;
            notexpected = 9;

            movieListPage.testTotalPagesCounter(expected, notexpected);
        });

        it("Should have the custom pagination counter set on 1", function() {
            expected = 1;
            notexpected = 0;

            movieListPage.testCustomPaginationCounter(expected, notexpected);
        });

        // it("Should have the 'matched movies' counter set on 160 as we match all of them", function() {
        //     expected = 160;
        //     notexpected = 159;

        //     movieListPage.testMatchedMoviesCounter(expected, notexpected);
        // });

        // it("Should have the 'total movies' counter set on 160 as all movies are matching empty string", function() {
        //     expected = 160;
        //     notexpected = 159;

        //     movieListPage.testTotalMoviesCounter(expected, notexpected);
        // });

        it("Should have loaded 20 movies", function() {
            expected = 20;
            notexpected = 19;

            movieListPage.testLoadedMoviesCount(tableRowsCount, expected, notexpected);
        });

        it("Should have loaded movies alphabetically. Test all fields for first movie from the page.", function() {
            expected = {
                "title": "2 Days in the Valley",
                "directors": {
                    "list": [{
                        "name": "John Herzfeld"
                    }]
                },
                "actors": {
                    "list": [{
                        "name": "James Spader"
                    }, {
                        "name": "Danny Aiello"
                    }, {
                        "name": "Eric Stoltz"
                    }, {
                        "name": "Teri Hatcher"
                    }, {
                        "name": "Glenne Headly"
                    }, {
                        "name": "Jeff Daniels"
                    }, {
                        "name": "Charlize Theron"
                    }, {
                        "name": "Keith Carradine"
                    }, {
                        "name": "Marsha Mason"
                    }]
                },
                "duration": 6000,
                "rating": 3,
                "year": 1996
            };

            movieListPage.testFirstLoadedMovie(expected, filterDuration, filterActors, tableRows);
        });
    });
});

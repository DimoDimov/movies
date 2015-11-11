describe("Movie list testing", function() {
    var tableRows,
        tableRowsCount,
        expected,
        notexpected,
        el;

    beforeEach(function() {
        browser.get('http://127.0.0.1:8000/');
    });

    it("Should navigate to the correct page", function() {
        expect(browser.getCurrentUrl()).toContain('127.0.0.1:8000');
        expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:8000/');
    });

    //get the isolated logic for testing the movie list page
    var movieListPage = require('./movieListPage.js');

    describe("Should initialize the first page with all needed data", function() {

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
                "actors": "James Spader, Danny Aiello, Eric Stoltz, Teri Hatcher, Glenne Headly, Jeff Daniels, Charlize Theron, Keith Carradine, Marsha Mason",
                "duration": 100,
                "rating": 3,
                "year": 1996
            };

            movieListPage.testFirstLoadedMovie(expected);
        });

    });

    //--------------------------------------------------------------
    describe("navigate to second page using 'next page' ", function() {
        var inputListEl,
            inputPageEl,
            paginationNextBtn;

        beforeEach(function() {

            paginationNextBtn = element(by.css('.pagination-next a'));

            //click to nextPage
            paginationNextBtn.click();

            //load the first page
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
            expected = 2;
            notexpected = 1;

            movieListPage.testPagesCounter(expected, notexpected);
        });

        it("Should have the total pages counter set on 8", function() {
            expected = 8;
            notexpected = 9;

            movieListPage.testTotalPagesCounter(expected, notexpected);
        });

        it("Should have the custom pagination counter set on 2", function() {
            expected = 2;
            notexpected = 1;

            movieListPage.testCustomPaginationCounter(expected, notexpected);
        });

        it("Should have loaded 20 movies", function() {
            expected = 20;
            notexpected = 19;

            movieListPage.testLoadedMoviesCount(tableRowsCount, expected, notexpected);
        });

        it("Should have loaded movies alphabetically. Test all fields for first movie from the page.", function() {
            expected = {
                "title": "The Rescuers Down Under",
                "actors": "Bob Newhart, Eva Gabor, John Candy, George C Scott, Tristan Rogers",
                "duration": 73,
                "rating": 3,
                "year": 1990
            };

            movieListPage.testFirstLoadedMovie(expected);
        });
    });

    //--------------------------------------------------------------
    describe("Should navigate to third page using the 'next page' and then to navigate back to the second page using 'previous page'", function() {
        var inputListEl,
            inputPageEl,
            paginationNextBtn;

        beforeEach(function() {

            paginationNextBtn = element(by.css('.pagination-next a'));
            paginationPreviousBtn = element(by.css('.pagination-previous a'));

            //click to nextPage
            paginationNextBtn.click();

            paginationNextBtn.click();

            paginationPreviousBtn.click();

            //load the first page
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
            expected = 2;
            notexpected = 1;

            movieListPage.testPagesCounter(expected, notexpected);
        });

        it("Should have the total pages counter set on 8", function() {
            expected = 8;
            notexpected = 9;

            movieListPage.testTotalPagesCounter(expected, notexpected);
        });

        it("Should have the custom pagination counter set on 2", function() {
            expected = 2;
            notexpected = 1;

            movieListPage.testCustomPaginationCounter(expected, notexpected);
        });

        it("Should have loaded 20 movies", function() {
            expected = 20;
            notexpected = 19;

            movieListPage.testLoadedMoviesCount(tableRowsCount, expected, notexpected);
        });

        it("Should have loaded movies alphabetically. Test all fields for first movie from the page.", function() {
            expected = {
                "title": "The Rescuers Down Under",
                "actors": "Bob Newhart, Eva Gabor, John Candy, George C Scott, Tristan Rogers",
                "duration": 73,
                "rating": 3,
                "year": 1990
            };

            movieListPage.testFirstLoadedMovie(expected);
        });
    });

    //--------------------------------------------------------------
    describe("Should not be able to navigate to 0 page", function() {
        var inputListEl,
            inputPageEl,
            paginationNextBtn;

        beforeEach(function() {
            //load the first page
            tableRows = element.all(by.css('.movie-list-wrapper tbody tr'));

            //resolve the tableRows, means we have the movie data loaded
            tableRows.count().then(function(newCount) {
                tableRowsCount = newCount;
            });

            paginationPreviousBtn = element(by.css('.pagination-previous a'));

            //click several times previous
            paginationPreviousBtn.click();
            paginationPreviousBtn.click();
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

        it("Should have loaded movies alphabetically. Test all fields for first movie from the page.", function() {
            expected = {
                "title": "2 Days in the Valley",
                "actors": "James Spader, Danny Aiello, Eric Stoltz, Teri Hatcher, Glenne Headly, Jeff Daniels, Charlize Theron, Keith Carradine, Marsha Mason",
                "duration": 100,
                "rating": 3,
                "year": 1996
            };

            movieListPage.testFirstLoadedMovie(expected);
        });
    });

    //--------------------------------------------------------------
    describe("Should not be able to navigate after the last page", function() {
        var inputListEl,
            inputPageEl,
            paginationNextBtn,
            finalPage;

        beforeEach(function() {
            //load the first page
            tableRows = element.all(by.css('.movie-list-wrapper tbody tr'));

            //resolve the tableRows, means we have the movie data loaded
            tableRows.count().then(function(newCount) {
                tableRowsCount = newCount;
            });

            paginationNextBtn = element(by.css('.pagination-next a'));

            element(by.binding('finalPage')).getText().then(function (data) {

                finalPage = parseInt(data);
            });

            var attemptsAfterHitTheLastPage = 5;

            for (var i = 0; i < finalPage + attemptsAfterHitTheLastPage; i++) {
                paginationNextBtn.click();
            }
        });

        it("Should have the 'items per page' counter set on 20", function() {
            expected = 20;
            notexpected = 21;

            movieListPage.testItemsPerPageCounter(expected, notexpected);
        });

        it("Should have the pages counter set on 1", function() {
            expected = 8;
            notexpected = 9;

            movieListPage.testPagesCounter(expected, notexpected);
        });

        it("Should have loaded movies alphabetically. Test all fields for first movie from the page.", function() {
            expected = {
                "title": "Without a Paddle",
                "actors": "Seth Green, Ethan Suplee, Burt Reynolds, Abraham Benrubi, Dax Shepard, Matthew Lillard",
                "duration": 94,
                "rating": 3,
                "year": 2004
            };

            movieListPage.testFirstLoadedMovie(expected);
        });
    });

    // describe("Should initialize the first page with all needed data", function() {

    //     beforeEach(function() {

    //         tableRows = element.all(by.css('.movie-list-wrapper tbody tr'));

    //         //resolve the tableRows, means we have the movie data loaded
    //         tableRows.count().then(function(newCount) {
    //             tableRowsCount = newCount;
    //         });
    //     });

    //     it("Should contain message asking to input at least 3 charachters", function() {
    //         expected = "Enter at least three characters to begin search";
    //         existingEl = true;

    //         movieListPage.testInput3CharachtersMsg(expected, existingEl);
    //     });

    //     it("Should hide the custom error message", function() {
    //         expected = false;
    //         movieListPage.testCustomErrorMsg(expected);
    //     });

    //     it("Should have the 'items per page' counter set on 20", function() {
    //         expected = 20;
    //         notexpected = 21;

    //         movieListPage.testItemsPerPageCounter(expected, notexpected);
    //     });

    //     it("Should have the pages counter set on 1", function() {
    //         expected = 1;
    //         notexpected = 0;

    //         movieListPage.testPagesCounter(expected, notexpected);
    //     });

    //     it("Should have the total pages counter set on 8", function() {
    //         expected = 8;
    //         notexpected = 9;

    //         movieListPage.testTotalPagesCounter(expected, notexpected);
    //     });

    //     it("Should have the custom pagination counter set on 1", function() {
    //         expected = 1;
    //         notexpected = 0;

    //         movieListPage.testCustomPaginationCounter(expected, notexpected);
    //     });

    //     // it("Should have the 'matched movies' counter set on 160 as we match all of them", function() {
    //     //     expected = 160;
    //     //     notexpected = 159;

    //     //     movieListPage.testMatchedMoviesCounter(expected, notexpected);
    //     // });

    //     // it("Should have the 'total movies' counter set on 160 as all movies are matching empty string", function() {
    //     //     expected = 160;
    //     //     notexpected = 159;

    //     //     movieListPage.testTotalMoviesCounter(expected, notexpected);
    //     // });

    //     it("Should have loaded 20 movies", function() {
    //         expected = 20;
    //         notexpected = 19;

    //         movieListPage.testLoadedMoviesCount(tableRowsCount, expected, notexpected);
    //     });

    //     it("Should have loaded movies alphabetically. Test all fields for first movie from the page.", function() {
    //         expected = {
    //             "title": "2 Days in the Valley",
    //             "actors": "James Spader, Danny Aiello, Eric Stoltz, Teri Hatcher, Glenne Headly, Jeff Daniels, Charlize Theron, Keith Carradine, Marsha Mason",
    //             "duration": 100,
    //             "rating": 3,
    //             "year": 1996
    //         };

    //         movieListPage.testFirstLoadedMovie(expected);
    //     });

    // });
});

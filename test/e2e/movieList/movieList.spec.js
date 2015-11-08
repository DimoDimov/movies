describe("Movie list testing", function() {
	var tableRows,
		tableRowsCount;

    beforeEach(function() {
        browser.get('http://127.0.0.1:8000/');

        tableRows = element.all(by.css('.movie-list-wrapper tbody tr'));

        //resolve the tableRows, means we have the movie data loaded
        tableRows.count().then(function (newCount) {
        	tableRowsCount = newCount;
        });
    });

    it("Should navigate to the correct page", function() {
        expect(browser.getCurrentUrl()).toContain('127.0.0.1:8000');
        expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:8000/');
    });

    //get the isolated logic for testing the movie list page
    var movieListPage = require('./movieListPage.js');

    describe("Should initialize the page with all needed data", function() {
        
        it("Should contain message asking to input at least 3 charachters", function() {
            movieListPage.testInput3CharachtersMsg();
        });

        it("Should hide the custom error message", function() {
            movieListPage.testCustomErrorMsg();
        });

        it("Should have the 'items per page' counter set on 20", function() {
            movieListPage.testItemsPerPageCounter();
        });

     	it("Should have the pages counter set on 1", function() {
            movieListPage.testPagesCounter();
        });

        it("Should have the total pages counter set on 8", function() {
            movieListPage.testTotalPagesCounter();
        });

        it("Should have the custom pagination counter set on 1", function() {
            movieListPage.testCustomPagesCounter();
        });

        it("Should have the 'matched movies' counter set on 160 as we match all of them", function() {
            movieListPage.testMatchedMoviesCounter();
        });

        it("Should have the 'total movies' counter set on 160 as all movies are matching empty string", function() {
            movieListPage.testTotalMoviesCounter();
        });

        it("Should have loaded 20 movies", function() {
            movieListPage.testLoadedMoviesCount(tableRowsCount);
        });

        //TODO
        // it("Should have loaded first movie alphabetically. Test all fields.", function() {
        //     movieListPage.testLoadedMoviesCount(tableRowsCount);
        // });
    });
});

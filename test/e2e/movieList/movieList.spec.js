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
        it("Should load 20 movies", function() {
            movieListPage.testLoadedMovied(tableRowsCount);
        });
    });
});

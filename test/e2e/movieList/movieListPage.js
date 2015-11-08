//isolate reusable logic for tests - easy to maintain and rewrite if necessary

var movieListPage = function() {

    //selected element
    var el,

        //actual value before being parsed
        actualText,

        //actual value being parsed successfully
        actual;

    //if the 'search phrase' length is < 3 Should contain message asking to input at least 3 charachters
    //if the 'search phrase' length is >= 3 the message is being hidden
    this.testInput3CharachtersMsg = function(expected, existingEl) {
        el = element(by.css('.errorMessage.leastThreeChar'));
        expect(el.isPresent()).toBe(existingEl);

        actual = el.getText();
        expect(actual).toBe(expected);
    };

    //Should hide the custom error message if no error to display
    this.testCustomErrorMsg = function(expected) {
        el = element(by.css('.errorMessage.errMessageGeneral'));
        expect(el.isPresent()).toBe(expected);
    };

    //Should have the 'items per page' counter set on expected
    this.testItemsPerPageCounter = function(expected, notexpected) {
        el = element(by.model('list'));
        expect(el.isPresent()).toBe(true);

        actualText = el.getAttribute('value');
        actualText.then(function(newValue) {
            actual = parseInt(newValue);
            expect(actual).toEqual(expected);
            expect(actual).not.toEqual(notexpected);
        });
    };

    //Should have the pages counter set on expected
    this.testPagesCounter = function(expected, notexpected) {
        el = element(by.model('currentPage'));
        expect(el.isPresent()).toBe(true);

        actualText = el.getAttribute('value');
        actualText.then(function(newValue) {
            actual = parseInt(newValue);
            expect(actual).toEqual(expected);
            expect(actual).not.toEqual(notexpected);
        });
    };

    //Should have the total pages counter set on expected
    this.testTotalPagesCounter = function(expected, notexpected) {
        el = element(by.binding('finalPage'));
        expect(el.isPresent()).toBe(true);

        actualText = el.getText();

        actualText.then(function(newValue) {
            actual = parseInt(newValue);
            expect(actual).toEqual(expected);
            expect(actual).not.toEqual(notexpected);
        });
    };

    //Should have the custom pagination counter set on expected
    this.testCustomPaginationCounter = function(expected, notexpected) {
        el = element(by.css('.customPaginationWrapper li.active a'));
        expect(el.isPresent()).toBe(true);

        actualText = el.getText();

        actualText.then(function(newValue) {
            actual = parseInt(newValue);
            expect(actual).toEqual(expected);
            expect(actual).not.toEqual(notexpected);
        });
    };

    //Should have the 'matched movies' counter set on expected
    this.testMatchedMoviesCounter = function(expected, notexpected) {
        el = element(by.binding('totalfilteredMovies'));
        expect(el.isPresent()).toBe(true);

        actualText = el.getText();

        actualText.then(function(newValue) {
            actual = parseInt(newValue);
            expect(actual).toEqual(expected);
            expect(actual).not.toEqual(notexpected);
        });
    };

    // Should have the 'total movies' counter set on expected
    this.testTotalMoviesCounter = function(expected, notexpected) {
        el = element(by.binding('totalMoviesCount'));
        expect(el.isPresent()).toBe(true);

        actualText = el.getText();

        actualText.then(function(newValue) {
            actual = parseInt(newValue);
            expect(actual).toEqual(expected);
            expect(actual).not.toEqual(notexpected);
        });
    };


    this.testLoadedMoviesCount = function(tableRowsCount) {

        expect(tableRowsCount).toBe(20);

        //checking border cases confirms that our test data is correct
        expect(tableRowsCount).not.toBe(19);
        expect(tableRowsCount).not.toBe(21);
    };
};

module.exports = new movieListPage();

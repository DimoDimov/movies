//isolate reusable logic for tests - easy to maintain and rewrite if necessary

var movieListPage = function() {

		//expected value
	var asserted,
		
		//not expected value	
		notAsserted,
		
		//expected value before being parsed
		expectedText,

		//expected value being parsed successfully
		expected;

    this.testLoadedMoviesCount = function(tableRowsCount) {

         expect(tableRowsCount).toBe(20);

         //checking border cases confirms that our test data is correct
         expect(tableRowsCount).not.toBe(19);
         expect(tableRowsCount).not.toBe(21);
    };

    this.testInput3CharachtersMsg = function () {
    	asserted = "Enter at least three characters to begin search";
    	expected = element(by.css('.errorMessage.leastThreeChar')).getText();

    	expect(expected).toBe(asserted);
    };

    this.testCustomErrorMsg = function () {
    	expected = element(by.css('.errorMessage.errMessageGeneral'));

    	expect(expected.isPresent()).toBeFalsy();
    };

    this.testItemsPerPageCounter = function () {
    	asserted = 20;
    	notAsserted = 21;

    	expectedText = element(by.model('list')).getAttribute('value');

    	expectedText.then(function (newValue) {
    		expected = parseInt(newValue || 0);
    		expect(expected).toEqual(asserted);
    		expect(expected).not.toEqual(notAsserted);
    	});    	
    };

    this.testPagesCounter = function () {
    	asserted = 1;
    	notAsserted = 0;

    	expectedText = element(by.model('currentPage')).getAttribute('value');
    	
    	expectedText.then(function (newValue) {
    		expected = parseInt(newValue || 0);
    		expect(expected).toEqual(asserted);
    		expect(expected).not.toEqual(notAsserted);
    	});
    };

    this.testTotalPagesCounter = function () {
    	// asserted = 1;
    	// expected = element(by.model('currentPage')).getText();

    	// expect(expected).toBe(asserted);
    };

    this.testCustomPagesCounter = function () {
    	// asserted = 1;
    	// expected = element(by.model('currentPage')).getText();

    	// expect(expected).toBe(asserted);
    };

    this.testMatchedMoviesCounter = function () {
    	// asserted = 1;
    	// expected = element(by.model('currentPage')).getText();

    	// expect(expected).toBe(asserted);
    };

    this.testTotalMoviesCounter = function () {
    	// asserted = 1;
    	// expected = element(by.model('currentPage')).getText();

    	// expect(expected).toBe(asserted);
    };

    this.testLoadedMoviesCount = function () {
    	// asserted = 1;
    	// expected = element(by.model('currentPage')).getText();

    	// expect(expected).toBe(asserted);
    };
};

module.exports = new movieListPage();

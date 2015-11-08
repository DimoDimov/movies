//isolate reusable logic for tests - easy to maintain and rewrite if necessary

var movieListPage = function() {

    this.testLoadedMoviesCount = function(tableRowsCount) {

         expect(tableRowsCount).toBe(20);
         //checking border cases confirms that our test data is correct
         expect(tableRowsCount).not.toBe(19);
         expect(tableRowsCount).not.toBe(21);
    };
};

module.exports = new movieListPage();

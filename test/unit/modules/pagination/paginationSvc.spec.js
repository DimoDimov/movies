describe("paginationService", function() {
    var pagination,
        finalPage,
        currentPage,
        nextCallback,
        previousCallback,
        factory;

    //Factory Testing
    beforeEach(function() {
        module('app');

        inject(function($injector) {
            factory = $injector.get('paginationService');
        });

        finalPage = 10;
        currentPage = 1;

        nextcallbackResult = "nextcallback";
        nextCallback = function() {
            return nextcallbackResult;
        };

        previousCallbackResult = "previousCallback";

        previousCallback = function() {
            return previousCallbackResult;
        };

        pagination = factory.Pagination(finalPage, currentPage, nextCallback, previousCallback);
    });

    describe("Method Testing", function() {
        it("Should change the current page (1) to next (2) and then back to previous(1).", function() {
            pagination.next();
            expect(pagination.current()).toEqual(2);

            pagination.previous();
            expect(pagination.current()).toEqual(1);
        });

        it("Should stop counting on the final page even if more pagination.next() clicks are being applied.", function() {
            //click counter, be sure we make more clicks than pages
            var clicksAfterFinalPage = finalPage + 1;

            for (var i = 0; i < clicksAfterFinalPage; i++) {
                pagination.next();
            }

            expect(pagination.current()).toEqual(finalPage);
        });

        it("The counter should not go below 1. Even if pagination.previous() is being applied", function() {
            expect(pagination.current()).toEqual(1);

            pagination.previous();
            expect(pagination.current()).toEqual(1);
            
            pagination.previous();
            expect(pagination.current()).toEqual(1);
        });

        it("Check the border cases for the pagination.hasPrevious and pagination.hasNext methods", function() {
            expect(pagination.current()).toEqual(1);

            expect(pagination.hasPrevious()).toBeFalsy();
            expect(pagination.hasNext()).toBeTruthy();

            for (var i = 0; i < finalPage; i++) {
                pagination.next();
            }

            expect(pagination.hasNext()).toBeFalsy();
            expect(pagination.hasPrevious()).toBeTruthy();

        });
    });

    describe("Initialization", function() {
        it("Should instantiate pagination", function() {
            expect(pagination).not.toBeNull();
        });

        it("Should set pagination.maxCount equal to final page", function() {
            expect(pagination.max()).toEqual(finalPage);
        });

        it("Should set pagination.current equal to current page", function() {
            expect(pagination.current()).toEqual(currentPage);
        });

        it("The nextcallback should return the expected result", function() {
            expect(pagination.nextcallback()).toEqual(nextcallbackResult);
        });

        it("The previouscallback should return the expected result", function() {
            expect(pagination.previouscallback()).toEqual(previousCallbackResult);
        });
    });
});

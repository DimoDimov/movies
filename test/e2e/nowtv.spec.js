describe('can visit nowtv.com', function(){

    beforeEach( function(){
        browser.driver.get('http://nowtv.com');
    });

    it('user can successfully navigate to nowtv.com', function(){
        expect( browser.driver.getCurrentUrl() ).toContain('nowtv');
    });

});
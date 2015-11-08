// describe('can visit nowtv.com', function(){

//     beforeEach( function(){
//         browser.driver.get('http://nowtv.com');
//     });

//     it('user can successfully navigate to nowtv.com', function(){
//         expect( browser.driver.getCurrentUrl() ).toContain('nowtv');
//     });

// });

describe('Protractor Demo App', function() {
  it('should have a title', function() {
    browser.get('http://juliemr.github.io/protractor-demo/');

    expect(browser.getTitle()).toEqual('Super Calculator');
  });
});

describe('My Demo', function() {
  it('should have a title', function() {
    browser.get('http://127.0.0.1:8000/');

    expect(browser.getTitle()).toEqual('Iceberg Search');
  });
});
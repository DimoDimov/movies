var expect = require('chai').expect;
describe('Sanity check', function(){
    
    it('nowtv.com contains nowtv', function(){
        expect('nowtv.com').to.contain('nowtv');
    });

});
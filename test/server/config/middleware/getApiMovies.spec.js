var httpMocks = require('node-mocks-http'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

var getApiMovies = require('../../../../server/config/middleware/getApiMovies.js'); 
var db = require('../../../../server/data.json');

var req, res;

beforeEach(function(done) {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
});
debugger;
describe('getApiMovies', function() {
    it('resolves', function() {
        return expect(getApiMovies(req, res))
            .to.be.fulfilled.then(function() {
                console.log("good");
                done();
            });
    });

    it('rejects', function() {
        return expect(getApiMovies(req, res))
            .to.be.rejected.then(function() {
                console.log("baad");
                done();
            });
    });
});

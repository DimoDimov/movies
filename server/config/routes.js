var path = require('path');

module.exports = function(app) {

	// - Backend
	// - The server should serve server/data.json when a request is made to /api/movies
    app.get('/api/movies', function(req, res, next) {
        var getApiMovies = require(path.join(__dirname, '/middleware/getApiMovies.js'));
 
        getApiMovies(req, res)
            .then(function () {
                next();
            })
            .catch(res.json)
            .done();
    });
};

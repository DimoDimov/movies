module.exports = function(app, db) {

	// - Backend
	// - The server should serve server/data.json when a request is made to /api/movies
    app.get('/api/movies', function(req, res, next) {
        var getApiMovies = require('./middleware/get.api.movies.js');
        
        getApiMovies(req, res, db)
            .then(function () {
                next();
            })
            .catch(res.json)
            .done();
    });
};

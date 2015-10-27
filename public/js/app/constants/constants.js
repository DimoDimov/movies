(function() {

    var app = angular.module('app');
    //Declaring routes that are being used by the API Services
    //Change of the routings will be easily updated for the whole application
    //White labeling or multitenancy friendly
    app.constant("routingConstants", {
        url: "http://localhost",
        port: "8000",
        moviesAPI: "/api/movies"
    });

    app.constant("commonConstants", {
        numberMoviesPageLoad: 20,
    });

})();

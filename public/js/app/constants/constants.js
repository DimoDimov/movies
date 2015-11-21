(function() {
    'use strict';
    //Declaring routes that are being used by the API Services
    //Change of the routings will be easily updated for the whole application
    //White labeling or multitenancy friendly
    appDep.Constants.constant("routingConstants", {
        url: "http://127.0.0.1",
        port: "8000",
        moviesAPI: "api/movies"
    });

    appDep.Constants.constant("commonConstants", {
        numberMoviesPageLoad: 20,
    });
})();

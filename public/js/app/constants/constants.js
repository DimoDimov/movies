(function() {

    //Declaring routes that are being used by the API Services
    //Change of the routings will be easily updated for the whole application
    //White labeling or multitenancy friendly
    appDep.Constants.constant("routingConstants", {
        url: "http://localhost",
        port: "8000",
        moviesAPI: "/api/movies"
    });

    appDep.Constants.constant("commonConstants", {
        numberMoviesPageLoad: 20,
    });
})();

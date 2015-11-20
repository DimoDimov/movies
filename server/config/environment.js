(function() {
    'use strict';
    module.exports = function(app, express) {
        //Application local variables are provided to all templates 
        //rendered within the application. This is useful 
        //for providing helper functions to templates, as well as
        //app-level data.
        app.locals = {
            title: "My App",
            phone: "1-250-858-9990",
            email: "me@myapp.com",

            routingConstants: {
                url: "http://localhost",
                port: "8000",
                moviesAPI: "/api/movies",
            }
        };
    };
})();

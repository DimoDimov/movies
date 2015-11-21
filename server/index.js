(function() {
    'use strict';

    var path = require('path');
    var express = require('express');

    var app = express();

    app.use(express.static(path.resolve(__dirname, '../public')));

    require(path.resolve(__dirname, 'config/environment.js'))(app, express);

    //Films, 
    //fs.readFile OR fs.readFileSync is better if data of the file is changing.
    //For the purpose of this example require will be used. The result will be cached!

    require(path.resolve(__dirname, 'config/routes.js'))(app);

    app.set('port', process.env.PORT || app.locals.routingConstants.port);

    app.listen(app.get('port'), function() {
        console.log('App started on port ' + app.get('port'));
    });

    module.exports = app;
})();

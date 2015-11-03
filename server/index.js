var path = require('path');
var express = require('express');

var app = express();

app.use(express.static(path.join(__dirname, '/../public')));

require(path.join(__dirname, '/config/environment.js'))(app, express);

//Films, 
//fs.readFile OR fs.readFileSync is better if data of the file is changing.
//For the purpose of this example require will be used. The result will be cached!

require(path.join(__dirname, '/config/routes.js'))(app);

app.listen(app.locals.routingConstants.port, function() {
    console.log('App started on port 8000!');
});

var express = require('express');

var app = express();

app.use(express.static(__dirname + '/../public'));

require('./config/environment.js')(app, express);

//Films, 
//fs.readFile OR fs.readFileSync is better if data of the file is changing.
//For the purpose of this example require will be used. The result will be cached!
var db = require('./data.json');
require('./config/routes.js')(app, db);

app.listen(app.locals.routingConstants.port, function() {
    console.log('App started on port 8000!');
});

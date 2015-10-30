//we are breaking down the dependencies for mid and huge applications
//in the current example we will just add all the dependecies in a bulk
var app = app || {};

app.Controllers = angular.module('app.constants', ['constants']);
app.Services = angular.module('app.services', ['APIServices', 'services']);
app.Filters = angular.module('app.filters', ['filters']);
app.Controllers = angular.module('app.controllers', ['controllers']);
app.Directives = angular.module('app.directives', ['directives']);
app.Tests = angular.module('app.tests', ['templates']);

app.Dependencies = Neosavvy.AngularCore.Dependencies.concat(
    [
        'app.constants',
        'app.services',
        'app.filters',
        'app.controllers',
        'app.directives',
        'app.tests'
    ]);

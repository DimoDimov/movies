(function() {
    //we are breaking down the dependencies for mid and huge applications
    //in the current example we will just add all the dependecies in a bulk
    var self = this;

    self.appDep = self.appDep || {};

    //namespacing
    self.appDep.Libs = angular.module('app.libs', ['ngRoute']);

    self.appDep.Constants = angular.module('app.constants', []);
    self.appDep.Services = angular.module('app.services', []);
    self.appDep.Filters = angular.module('app.filters', []);
    self.appDep.Controllers = angular.module('app.controllers', []);
    self.appDep.Directives = angular.module('app.directives', []);
    self.appDep.Tests = angular.module('app.tests', ['templates']);


    // app.Constants = angular.module('app.constants', ['constants']);
    // app.Services = angular.module('app.services', ['APIServices', 'services']);
    // app.Filters = angular.module('app.filters', ['filters']);
    // app.Controllers = angular.module('app.controllers', ['controllers']);
    // app.Directives = angular.module('app.directives', ['directives']);
    // app.Tests = angular.module('app.tests', ['templates']);

    self.appDep.AllDependencies = Neosavvy.AngularCore.Dependencies.concat(
        [
            'app.libs',
            'app.constants',
            'app.services',
            'app.filters',
            'app.controllers',
            'app.directives'
        ]);

    self.appDep.TestDependencies = Neosavvy.AngularCore.Dependencies.concat(
        [
            'app.libs',
            'app.constants',
            'app.services',
            'app.filters',
            'app.controllers',
            'app.directives',
            'app.tests'
        ]);
})();

(function() {
    'use strict';
    //we are breaking down the dependencies for mid and huge applications
    //in the current example we will just add all the dependecies in a bulk
    
    //in 'strict mode' used within IIF the 'this' key word was 
    //activley replaced by self. So strange.
    //setting global variable
    self.appDep = self.appDep || {};

    //namespacing
    self.appDep.Libs = angular.module('app.libs', ['ngRoute']);

    self.appDep.Constants = angular.module('app.constants', []);
    self.appDep.Services = angular.module('app.services', []);
    self.appDep.Filters = angular.module('app.filters', []);
    self.appDep.Controllers = angular.module('app.controllers', []);
    self.appDep.Directives = angular.module('app.directives', []);
    self.appDep.Tests = angular.module('app.tests', ['templates']);

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

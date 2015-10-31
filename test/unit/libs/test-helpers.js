spyOnAngularService = function (service, methodName, deferred) {
	return spyOn(service, methodName).and.returnValue(deferred.promise);
};

changeSpyReturn = function (spyObj, result) {
	return spyObj.and.returnValue({then: function (fn) {
		fn(result);
	}});
};

spyOnAngularServiceError = function (service, methodName, result) {
	return spyOn(service, methodName).and.returnValue({then: function (fn, errorFn) {
		errorFn(result);
	}});
};

changeSpyReturnErr = function (spyObj, resultErr) {
	return spyObj.and.returnValue({then: function (fn, errorFn) {
		errorFn(resultErr);
	}});
};

//jasmine.createSpyObj('authService', ['login', 'logout', 'currentUser']);

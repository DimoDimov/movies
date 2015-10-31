spyOnAngularService = function (service, methodName, deferred) {
	return spyOn(service, methodName).and.returnValue(deferred.promise);
};

changeSpyReturn = function (spyObj, deferred) {
	return spyObj.and.returnValue(deferred.promise);
};
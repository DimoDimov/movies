(function() {

    appDep.Filters.filter('filterActors', ['validationServices',
        function(validationServices) {

            return function(actors) {
                //debugger; //jshint ignore:line
                if (validationServices.isObject(actors) && validationServices.isArray(actors.list)) {
                    var result = "";
                    //debugger //jshint ignore:line
                    for (var i = 0; i < actors.list.length; i++) {
                        if (i < actors.list.length - 1) {
                            result += actors.list[i].name + ", ";
                        } else {
                            result += actors.list[i].name;
                        }
                    }

                    return result;
                } else {
                    return "";
                }
            };
        }
    ]);

    appDep.Filters.filter('filterDuration', ['validationServices',
        function(validationServices) {

            return function(duration) {

                if (validationServices.isNumeric(duration)) {
                    //make sure we always return integer
                    duration = parseInt(duration);
                    var result = duration / 60;
                    return result;
                } else {
                    return duration;
                }
            };
        }
    ]);
})();

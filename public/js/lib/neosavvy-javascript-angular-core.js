/*! neosavvy-javascript-angular-core - v0.2.4 - 2014-09-10
* Copyright (c) 2014 Neosavvy, Inc.; Licensed  */
var Neosavvy = Neosavvy || {};
Neosavvy.AngularCore = Neosavvy.AngularCore || {};
Neosavvy.AngularCore.Directives = angular.module('neosavvy.angularcore.directives', []);
Neosavvy.AngularCore.Filters = angular.module('neosavvy.angularcore.filters', []);
Neosavvy.AngularCore.Services = angular.module('neosavvy.angularcore.services', []);
Neosavvy.AngularCore.Dependencies = ['neosavvy.angularcore.directives', 'neosavvy.angularcore.filters', 'neosavvy.angularcore.services'];

Neosavvy.AngularCore.Directives
    .directive('nsInlineHtml',
        ['$compile',
            function ($compile) {
                return {
                    restrict:'E',
                    template:'<div></div>',
                    replace:true,
                    scope:false,
                    link:function (scope, element, attrs) {
                        if (!attrs.hasOwnProperty('value')) {
                            throw 'You must provide an html value on the scope in order to bind inline html!';
                        } else {
                            var dereg = attrs.$observe('value', function (val) {
                              if (val) {
                                  var thing = $compile(element.replaceWith(val))(scope);
                                  dereg();
                              }
                            });
                        }
                    }
                }
            }]);

Neosavvy.AngularCore.Directives.controller('nsModalCtrl', ['$scope', function ($scope) {

    // TO DO
    // make tooltip position customizable and/or 
    this.positionTooltip =  function (e, element) {
            if (e) {
                var localX = -0.75 * e.currentTarget.clientWidth;
                var localY = 0.65 * e.currentTarget.clientHeight;
                var containerCoords = $(e.target).offset();
                var xPos = localX + containerCoords.left;
                var yPos = localY + containerCoords.top;
            }
            
            element.css("position", "absolute");
            element.css("top", yPos);
            element.css("left", xPos);
            return element;
        }
}]);

Neosavvy.AngularCore.Directives.directive('nsModal', [
    'nsModal',
    function (nsModalService) {

        return {
            restrict: 'EA',
            transclude: 'element',
            replace: true,
            scope: false,
            controller: 'nsModalCtrl',
            compile: function (tElem, tAttr, transclude) {
                return function (scope, elem, attr, modalCtrl) {
                    var childScope = scope.$new(),
                        isTooltip = !!attr.tooltip;

                    if (typeof attr.open !== 'string') {
                        throw 'an open handler was not specified';
                    };

                    // close modal on route change
                    scope.$on('$routeChangeStart', function (e) {
                        nsModalService.close();
                    });

                    var closeCallback = scope[attr.callback] || angular.noop;

                    scope[attr.open] = function (e) {
                        transclude(childScope, function (clone) {
                            var element = isTooltip ? modalCtrl.positionTooltip(e, clone) : clone;
                            nsModalService.open(childScope, element, closeCallback);
                        });
                    };

                    scope[attr.close] = function () {
                        nsModalService.close();
                    };
                }
            }
        }
    }
]);


Neosavvy.AngularCore.Directives
    .directive('nsStaticInclude',
    ['$http', '$templateCache', '$compile',
        function ($http, $templateCache, $compile) {
            return {
                restrict:'E',
                template:'<div></div>',
                replace:true,
                scope:false,
                compile:function (tElement, tAttrs) {
                    if (_.isEmpty(tAttrs.src)) {
                        throw "You must pass in a source to render a Neosavvy static include directive.";
                    }

                    var waitFor = tAttrs.waitFor,
                        watchWaitFor = tAttrs.watchWaitFor,
                        waitForRender = tAttrs.waitForRender,
                        watchWaitForRender = tAttrs.watchWaitForRender;

                    //If there are no 'waiting' indicators, warm up the cache, by requesting the template
                    if (_.isEmpty(waitFor) && _.isEmpty(watchWaitFor)) {
                        $http.get(tAttrs.src, {cache:$templateCache});
                        if (!_.isEmpty(watchWaitForRender)) {
                            watchWaitFor = watchWaitForRender;
                        } else if (!_.isEmpty(waitForRender)) {
                            waitFor = waitForRender;
                        }
                    }

                    //Return link function
                    return function (scope, element, attrs) {
                        var replace = function (result) {
                            element.replaceWith($compile(angular.element(result.data))(scope));
                        };
                        var dereg, request = function (val) {
                            $http.get(attrs.src, {cache:$templateCache}).then(replace);
                            if (dereg) {
                                dereg();
                            }
                        };

                        if (!_.isEmpty(watchWaitFor)) {
                            dereg = scope.$watch(watchWaitFor, function(val) {
                                 if(angular.isDefined(val)) {
                                      request();
                                 }
                                 
                            });
                        }
                        else if (!_.isEmpty(waitFor) && parseFloat(waitFor) > 0) {
                            setTimeout(request, parseFloat(waitFor));
                        } else {
                            request();
                        }

                    };
                }
            }
        }]);

Neosavvy.AngularCore.Directives
    .directive('nsAnalyticsHook',
    function () {
        return {
            restrict: 'A',
            priority: 1000,
            link: function (scope, element, attrs) {
                if (Neosavvy.Core.Utils.StringUtils.isBlank(attrs.nsAnalyticsHook)) {
                    throw "You must provide a name for your analytics hook.";
                }
                var ar = attrs.nsAnalyticsHook.split(",");
                var fnName = ar[0].trim();
                var event = "click";
                if (ar.length > 1) {
                    event = ar[1].trim();
                }
                var propArgs = [];
                if (ar.length > 2) {
                    for (var i = 2; i < ar.length; i++) {
                        propArgs.push(ar[i].trim());
                    }
                }
                scope[fnName] = scope[fnName] || new Function();
                element.bind(event, function () {
                    scope.$apply(function () {
                        scope[fnName].apply(this, _.map(propArgs, function (arg) {
                            return Neosavvy.Core.Utils.MapUtils.highPerformanceGet(scope, arg);
                        }));
                    });
                })
            }
        }
    });
Neosavvy.AngularCore.Directives
    .directive('nsRetrieveElement',
    function () {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element, attrs) {
                var property = attrs.nsRetrieveElement;
                if (Neosavvy.Core.Utils.StringUtils.isBlank(attrs.nsRetrieveElement)) {
                    throw "You must specify a property or function to retrive and element with ns-retrieve-element!";
                }
                property = property.replace(/\(.*\)|\(\)/g, "");
                var prop = Neosavvy.Core.Utils.MapUtils.highPerformanceGet(scope, property);
                if (typeof prop === "function") {
                    prop(element);
                } else {
                    Neosavvy.Core.Utils.MapUtils.applyTo(scope, property, element);
                }
            }
        }
    });
Neosavvy.AngularCore.Directives
    .directive('nsSerialize', ['$injector',
        function ($injector) {
            return {
                restrict: 'EA',
                scope: false,
                link: function (scope, element, attrs) {
                    if (attrs.data === undefined) {
                        throw "You must provide a data attribute for the nsSerialize directive!";
                    }
                    if (attrs.property === undefined) {
                        throw "nsSerialize requires a property to place the data into!";
                    }
                    var data = JSON.parse(attrs.data);
                    var item = attrs.inject ? $injector.get(attrs.inject) : scope;
                    var property = Neosavvy.Core.Utils.MapUtils.highPerformanceGet(item, attrs.property.replace(/\(.*\)/g, ""));
                    if (typeof property === 'function') {
                        property.call(property, data);
                    } else {
                        Neosavvy.Core.Utils.MapUtils.applyTo(item, attrs.property, data);
                    }
                    if (attrs.clean !== "false" && attrs.clean !== "0") {
                        element.removeAttr("data");
                    }
                }
            }
        }]);
Neosavvy.AngularCore.Directives
    .directive('nsEvent', ['$rootScope', function ($rootScope) {
    return {
        restrict:'A',
        scope:false,
        link:function (scope, element, attrs) {
            var nsEvent = attrs.nsEvent.replace(/ /g, '').split(",");
            var bindFirst = (!_.isUndefined(attrs.nsEventHighPriority) ? true : false);
            if (nsEvent.length < 2) {
                throw "Specify an event and handler in order to use the ns-event directive!";
            }

            function matchKey(key) {
                return key.match(/.*?(?=\(|$)/i)[0];
            }

            function findScope(scope, name) {
                if (!_.isUndefined(scope[matchKey(name)])) {
                    return scope;
                } else if (scope.$parent) {
                    return findScope(scope.$parent, name);
                } else {
                    throw "Your handler method has not been found in the scope chain, please add " + name + " to the scope chain!";
                }
            }

            function handler(e) {
                var myScope = findScope(scope, nsEvent[1]);
                myScope.$event = e;
                myScope.$apply(function() {
                    myScope[nsEvent[1]]();
                });
            }

            //Initialize event listeners
            if (nsEvent.length === 2) {
                if (bindFirst) {
                    element.bindFirst(nsEvent[0], handler);
                } else {
                    element.bind(nsEvent[0], handler);
                }
            } else {
                for (var i = 2; i < nsEvent.length; i++) {
                    var selector = $(element).find(nsEvent[i]);
                    if (bindFirst) {
                        selector.bindFirst(nsEvent[0], handler);
                    } else {
                        selector.bind(nsEvent[0], handler);
                    }
                }
            }
        }
    }
}]);

Neosavvy.AngularCore.Directives
    .directive('nsModelOnBlur', function () {
        return {
            restrict:'A',
            require:'ngModel',
            link:function (scope, elm, attr, ngModelCtrl) {
                if (attr.type === 'radio' || attr.type === 'checkbox') return;

                elm.unbind('input').unbind('keydown').unbind('change');
                elm.bind('blur', function () {
                    scope.$apply(function () {
                        ngModelCtrl.$setViewValue(elm.val());
                    });
                });
            }
        };
    });

Neosavvy.AngularCore.Directives
    .directive('nsRequiredIfShown',
    function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {
                    var valid = (!element.is(':visible') || !Neosavvy.Core.Utils.StringUtils.isBlank(viewValue));
                    ctrl.$setValidity('nsRequiredIfShown', valid);
                    return valid ? viewValue : undefined;
                })
            }
        }
    });
Neosavvy.AngularCore.Directives
    .directive('nsZurbCheckbox',
    function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<label for="{{id}}-checkbox" ng-click="_onClick()"><input type="checkbox" ' +
                'id="{{id}}-checkbox" style="display: none;"><span class="custom checkbox">' +
                '</span><span ng-bind="label"></span></label>',
            scope: {
                'label': '@',
                'onClick': '&',
                'value': '=ngModel'
            },
            link: function (scope, element, attrs) {
                //Initialization
                var modifiedOnClick = false
                var $checkbox = element.find('span.checkbox');
                scope.id = attrs.id || uuid.v1();

                //Watchers
                scope.$watch('value', function (val) {
                    if (!modifiedOnClick) {
                        if (val) {
                            if (!$checkbox.hasClass('checked')) {
                                $checkbox.addClass('checked');
                            }
                        } else {
                            $checkbox.removeClass('checked');
                        }
                    }
                    modifiedOnClick = false;
                });

                //Action Handlers
                scope._onClick = function () {
                    //The class will switch after the click method has fired
                    modifiedOnClick = true;
                    scope.value = !$checkbox.hasClass('checked');
                    if (scope.onClick) {
                        scope.onClick({value: scope.value})
                    }
                };
            }
        }
    });
Neosavvy.AngularCore.Filters.filter('nsCollectionFilterProperties', function () {
    return function (collection, property, values) {
        if (collection && values) {
            return collection.filter(function (item) {
                return (values.indexOf(Neosavvy.Core.Utils.MapUtils.get(item, property)) !== -1);
            });
        }
        return collection;
    };
});
Neosavvy.AngularCore.Filters.filter('nsCollectionFilterPropertyContains', function () {
    return function (collection, property, value) {
        if (collection && value) {
            return collection.filter(function (item) {
                return (String(Neosavvy.Core.Utils.MapUtils.get(item, property)).toLowerCase().indexOf(String(value).toLowerCase()) !== -1);
            });
        }
        return collection;
    };
});
Neosavvy.AngularCore.Filters.filter('nsCollectionFilterProperty', function () {
    return function (collection, property, value) {
        if (collection && value) {
            return collection.filter(function (item) {
                return (Neosavvy.Core.Utils.MapUtils.get(item, property) === value);
            });
        }
        return collection;
    };
});
Neosavvy.AngularCore.Filters.filter('nsCollectionKeyedNumericExpression', ['$parse', function ($parse) {
    return function (data, propertyToExpressions, property) {
        if (data && data.length) {
            if (propertyToExpressions && _.keys(propertyToExpressions).length) {
                return data.filter(function (item) {
                    for (var key in propertyToExpressions) {
                        if (!Neosavvy.Core.Utils.StringUtils.isBlank(propertyToExpressions[key])) {
                            var expression = propertyToExpressions[key];
                            if (!(/</.test(expression)) && !(/>/.test(expression))) {
                                expression = expression.replace(/=/g, "==");
                            }
                            if (expression && /\d/.test(expression) &&
                                !$parse(String(Neosavvy.Core.Utils.MapUtils.highPerformanceGet(item, (property || key))) + expression)()) {
                                return false;
                            }
                        }
                    }
                    return true;
                });
            }
            return data;
        }
        return [];
    };
}]);
Neosavvy.AngularCore.Filters.filter('nsCollectionNumericExpression', ['$parse', function ($parse) {
    return function (data, expressionsAndIndexes, property) {
        if (data && data.length) {
            if (expressionsAndIndexes && expressionsAndIndexes.length) {
                return data.filter(function (item) {
                    for (var i = 0; i < expressionsAndIndexes.length; i++) {
                        var expressionAndProperty = expressionsAndIndexes[i];
                        var expression = expressionAndProperty.expression;
                        if (!(/</.test(expression)) && !(/>/.test(expression))) {
                            expression = expression.replace(/=/g, "==");
                        }
                        var value = (property ? item[parseInt(expressionAndProperty.index)][property] : item[parseInt(expressionAndProperty.index)]);
                        if (expression && /\d/.test(expression) && !$parse(String(value) + expression)()) {
                            return false;
                        }
                    }
                    return true;
                });
            }
            return data;
        }
        return [];
    };
}]);
Neosavvy.AngularCore.Filters.filter('nsCollectionPage', function () {
    return function (collection, page, count) {
        if (collection && collection.length) {
            if (page !== undefined && count) {
                var start = page * count;
                return collection.slice(start, Math.min(start + count, collection.length));
            }
        } else {
            collection = [];
        }
        return collection;
    };
});
Neosavvy.AngularCore.Filters.filter('nsDateFormatToUnix', function () {
    return function (val, format) {

        if( Neosavvy.Core.Utils.StringUtils.isBlank(val) ) {
            return val
        }

        val = moment(val, (format || undefined));

        if (!Neosavvy.Core.Utils.StringUtils.isBlank(val) && val.isValid()) {
            return val.unix();
        } else {
            throw "You have passed invalid input to nsDateFormatToUnix filter";
        }


    };
});
Neosavvy.AngularCore.Filters.filter('nsDateUnixToFormat', function () {
    return function (val, format) {
        if (!Neosavvy.Core.Utils.StringUtils.isBlank(val)) {
            format = format || 'MMMM Do, YYYY';
            var myMoment = moment.unix(val);
            if (myMoment.isValid()) {
                return myMoment.utc().format(format);
            } else {
                throw "You have passed an invalid epoch time to the date filter.";
            }
        }
        return val;
    };
});
Neosavvy.AngularCore.Filters.filter('nsLogicalIf', function () {
    return function (input, trueValue, falseValue) {
        return input ? trueValue : falseValue;
    };
});
Neosavvy.AngularCore.Filters.filter('nsNumericClamp', function () {
    return function (val, min, max) {
        if (_.isNumber(val)) {
            min = (min || min === 0) ? parseFloat(min) : undefined;
            max = (max || max === 0) ? parseFloat(max) : undefined;
            val = parseFloat(val);
            if (_.isNumber(max) && _.isNumber(min) && max < min) {
                throw "You have created an impossible clamp with this filter.";
            }
            if (min || min === 0) {
                val = Math.max(min, val);
            }
            if (max || max === 0) {
                val = Math.min(max, val);
            }
        }
        return val
    };
});
Neosavvy.AngularCore.Filters.filter('nsTextMarkdown',
    ['$sce', function ($sce) {
        return function (value) {
            if (/<[a-z][\s\S]*>/i.test(value) == false) {
                var converter = new Showdown.converter();
                var html = converter.makeHtml(value || '');
            } else {
                var html = value;
            }
            return $sce.trustAsHtml(html);
        };
    }]);
Neosavvy.AngularCore.Filters.filter("nsTextReplace", function() {
    return function(val) {
        if (!_.isEmpty(val) && arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
                val = val.replace(new RegExp(arguments[i], 'g'), "");
            }
        }
        return val;
    };
});

Neosavvy.AngularCore.Filters.filter("nsTruncate", function () {
    return function (val, length) {
        if (!_.isEmpty(val) && length < val.length) {
            val = val.slice(0, length) + "...";
        }
        return val;
    };
});
(function($) {
    var splitVersion = $.fn.jquery.split(".");
    var major = parseInt(splitVersion[0]);
    var minor = parseInt(splitVersion[1]);

    var JQ_LT_17 = (major < 1) || (major == 1 && minor < 7);

    function eventsData($el) {
        return JQ_LT_17 ? $el.data('events') : $._data($el[0]).events;
    }

    function moveHandlerToTop($el, eventName, isDelegated) {
        var data = eventsData($el);
        var events = data[eventName];

        if (!JQ_LT_17) {
            var handler = isDelegated ? events.splice(events.delegateCount - 1, 1)[0] : events.pop();
            events.splice(isDelegated ? 0 : (events.delegateCount || 0), 0, handler);

            return;
        }

        if (isDelegated) {
            data.live.unshift(data.live.pop());
        } else {
            events.unshift(events.pop());
        }
    }

    function moveEventHandlers($elems, eventsString, isDelegate) {
        var events = eventsString.split(/\s+/);
        $elems.each(function() {
            for (var i = 0; i < events.length; ++i) {
                var pureEventName = $.trim(events[i]).match(/[^\.]+/i)[0];
                moveHandlerToTop($(this), pureEventName, isDelegate);
            }
        });
    }

    $.fn.bindFirst = function() {
        var args = $.makeArray(arguments);
        var eventsString = args.shift();

        if (eventsString) {
            $.fn.bind.apply(this, arguments);
            moveEventHandlers(this, eventsString);
        }

        return this;
    };

    $.fn.delegateFirst = function() {
        var args = $.makeArray(arguments);
        var eventsString = args[1];

        if (eventsString) {
            args.splice(0, 2);
            $.fn.delegate.apply(this, arguments);
            moveEventHandlers(this, eventsString, true);
        }

        return this;
    };

    $.fn.liveFirst = function() {
        var args = $.makeArray(arguments);

        // live = delegate to document
        args.unshift(this.selector);
        $.fn.delegateFirst.apply($(document), args);

        return this;
    };

    if (!JQ_LT_17) {
        $.fn.onFirst = function(types, selector) {
            var $el = $(this);
            var isDelegated = typeof selector === 'string';

            $.fn.on.apply($el, arguments);

            // events map
            if (typeof types === 'object') {
                for (var type in types)
                    if (types.hasOwnProperty(type)) {
                        moveEventHandlers($el, type, isDelegated);
                    }
            } else if (typeof types === 'string') {
                moveEventHandlers($el, types, isDelegated);
            }

            return $el;
        };
    }

})(jQuery);

Neosavvy.AngularCore.Services.factory('nsLoadingStatusService', function () {

    var indicators = {},
        wrapFunction = function (wrapFn, identifier) {
            if (!identifier)
                throw 'a valid identifier was not provided, did you forget to include one?';

            return _.partial(function (fn) {
                indicators[identifier] = true;
                return fn.apply(null, _.rest(arguments))['finally'](function () {
                        indicators[identifier] = false; 
                    });
            }, wrapFn)
        };

    return {
        wrapService: wrapFunction,
        registeredIndicators: indicators
    }
});

Neosavvy.AngularCore.Services.factory('nsModal', 
    [
        '$compile',
        '$document',
        '$animate',
        '$timeout',
        function($compile, $document, $animate, $timeout) {

    var body = $document.find('body'),
        backdrop,
        overlay,
        callback;

    function open (scope, template, closeCallback) {

        var positionWrapper;

        if (!scope || typeof scope !== 'object') {
            throw 'missing scope parameter';
        }

        if (template) {
            callback = closeCallback || undefined;

            backdrop = $compile(angular.element('<div ng-click="close()" class="modal-backdrop" style="background:rgba(10,10,10, 0.6); position:fixed; top:0px;right:0px;left:0px;bottom:0px;"></div>'))(scope);

            // add the inner modal-position wrapper in order to center dynamically sized modals
            positionWrapper = angular.element('<div class="modal-position"></div>');

            // accept angular.element objects and template URLs
            if (typeof template === 'object') {
                positionWrapper.append(template);
            } else if (typeof template === 'string') {
                var cTemplate = $compile(angular.element('<ng-include src="\'' + template + '\' "></ng-include>'))(scope);
                positionWrapper.append(cTemplate);
            } else {
                throw "template parameter must be of type object or string";
            }

            overlay = $compile(angular.element('<div class="modal-overlay" ng-class="modalOverlayClass"></div>'))(scope);
            overlay.append(positionWrapper);

            scope.close = close;

            $timeout(function () {
                scope.$apply(function () {
                    body.append(backdrop);
                    body.append(overlay);
                });
            }, 0);

        } else {
            throw 'missing template parameter';
        }
    };

    function close () {
        if (overlay) {
            $animate.leave(overlay, function () {
                backdrop.remove();
            });

            if (typeof callback === 'function') {
                callback();
            }
        }
    };

    return {

        /**
         * @ngdoc method
         * @name neosavvy.angularcore.services.services:nsModal#open
         * @methodOf neosavvy.angularcore.services.services:nsModal
         *
         * @description
         * Calling nsModal.open will open a modal on the screen. 
         *
         * @param {Object} scope (required) the scope to use inside the modal. can pass in $scope.$new() for new child scope.
         * @param {String|Object} template (required) the location of the template to include in the modal OR an angular.element to include
         * @param {Function} closeCallback (optional) a function call when the modal closes
         */
        open: open,

        /**
         * @ngdoc method
         * @name neosavvy.angularcore.services.services:nsModal#close
         * @methodOf neosavvy.angularcore.services.services:nsModal
         *
         * @description
         * Calling nsModal.close will close all open modals
         *
         */
        close: close
    }
}]);

Neosavvy.AngularCore.Services.factory('nsServiceExtensions',
    ['$q', '$http',
        function ($q, $http) {
            /**
             * Parse headers into key value object
             *
             * @param {string} headers Raw headers as a string
             * @returns {Object} Parsed headers as key value object
             */
            function parseHeaders(headers) {
                var parsed = {}, key, val, i;

                if (!headers) return parsed;

                _.forEach(headers.split('\n'), function (line) {
                    i = line.indexOf(':');
                    key = _.lowercase(_.trim(line.substr(0, i)));
                    val = _.trim(line.substr(i + 1));

                    if (key) {
                        if (parsed[key]) {
                            parsed[key] += ', ' + val;
                        } else {
                            parsed[key] = val;
                        }
                    }
                });

                return parsed;
            }

            function getFromCache(params) {
                if (params.cache && params.method === 'GET') {
                    var cached = params.cache.get(params.url);
                    if (cached && cached.length) {
                        return cached;
                    }
                }
                return undefined;
            }

            function storeInCache(params, status, response, headers) {
                if (params.cache && params.method === 'GET') {
                    params.cache.put(params.url, [status, response, headers]);
                }
            }

            return {
                /**
                 * @ngdoc method
                 * @name neosavvy.angularcore.services.services:nsServiceExtensions#request
                 * @methodOf neosavvy.angularcore.services.services:nsServiceExtensions
                 *
                 * @description
                 * The standard $http request method helper with error handling, transformers, and added response handlers.
                 *
                 * @param {Object} parameters all service parameters
                 * @param {Function} additionalSuccess additional success method
                 * @param {function} additionalError additonal error method
                 * @returns {Promise} $q promise object
                 */
                request: function (params, additionalSuccess, additionalError) {
                    if (!params.method) {
                        throw "You must provide a method for each service request.";
                    }
                    if (!params.url) {
                        throw "You must provide a url for each service request.";
                    }

                    var deferred = $q.defer();
                    $http(params).
                        success(function (data, status, headers, config) {
                            deferred.resolve(data);
                            if (additionalSuccess) {
                                additionalSuccess(data);
                            }
                        }).
                        error(function (data, status, headers, config) {
                            deferred.reject(data);
                            if (additionalError) {
                                additionalError(data);
                            }
                        });

                    return deferred.promise;
                },
                /**
                 * @ngdoc method
                 * @name neosavvy.angularcore.services.services:nsServiceExtensions#xhr
                 * @methodOf neosavvy.angularcore.services.services:nsServiceExtensions
                 *
                 * @description
                 * The native XHR request method helper with error handling, transformers, and added response handlers.
                 *
                 * @param {Object} params all service params
                 * @returns {Promise} Q promise object
                 */
                xhr: function (params) {
                    if (!params.method) {
                        throw "You must provide a method for each service request.";
                    }
                    if (!params.url) {
                        throw "You must provide a url for each service request.";
                    }

                    // use Q by default, use angular $q if specified
                    var deferred = (params.$q) ? $q.defer() : Q.defer();

                    var cached = getFromCache(params);
                    if (cached) {
                        //cached[0] is status, cached[1] is response, cached[2] is headers
                        deferred.resolve(cached[1]);
                    } else {
                        var xhr = new XMLHttpRequest();
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === 4) {
                                var resp = xhr.responseText;
                                if (xhr.status === 200) {
                                    storeInCache(params, xhr.status, resp, parseHeaders(xhr.getAllResponseHeaders()));

                                    if (params.transformResponse) {
                                        resp = params.transformResponse(resp);
                                    } else if (xhr.getResponseHeader("Content-Type") === "application/json") {
                                        resp = JSON.parse(resp);
                                    }

                                    deferred.resolve(resp, xhr.status, xhr.getAllResponseHeaders());
                                } else {
                                    deferred.reject(resp, xhr.status, xhr.getAllResponseHeaders());
                                }
                            }
                        };

                        xhr.onerror = function () {
                            deferred.reject(xhr, xhr.status, xhr.getAllResponseHeaders());
                        };

                        var data = params.data;
                        if (data) {
                            if (params.transformRequest) {
                                data = params.transformRequest(data);
                            } else if (!_.isString(data)) {
                                data = JSON.stringify(data);
                            }
                        }

                        xhr.withCredentials = params.cors || false;
                        xhr.open(params.method, params.url, true);
                        xhr.send(data);
                    }

                    return deferred.promise;
                },
                /**
                 * @ngdoc method
                 * @name neosavvy.angularcore.services.services:nsServiceExtensions#jqRequest
                 * @methodOf neosavvy.angularcore.services.services:nsServiceExtensions
                 *
                 * @description
                 * ThejQuery xDomain supporting request method helper with error handling, transformers, and added response handlers.
                 *
                 * @param {Object} params all service params
                 * @returns {Promise} Q promise object
                 */
                jqRequest: function (params) {
                    if (!params.method) {
                        throw "You must provide a method for each service request.";
                    }
                    if (!params.url) {
                        throw "You must provide a url for each service request.";
                    }

                    //use Angular $q by default, big Q if specified
                    var deferred = (params.q) ? Q.defer() : $q.defer();

                    var cached = getFromCache(params);
                    if (cached) {
                        //cached[0] is status, cached[1] is response, cached[2] is headers
                        if (params.transformResponse) {
                            deferred.resolve(params.transformResponse(cached[1]));
                        } else {
                            try {
                                deferred.resolve(JSON.parse(cached[1]));
                            } catch (e) {
                                deferred.resolve(cached[1]);
                            }
                        }
                    } else {
                        var request = {type: params.method, url: params.url};
                        if (params.data) {
                            request.data = params.transformRequest ? params.transformRequest(params.data) : params.data;
                        }
                        if (params.ajax) {
                            request = _.merge(request, params.ajax);
                        }
                        var jqXhr = $.ajax(request);
                        jqXhr.done(function (data, textStatus) {
                            storeInCache(params, textStatus, jqXhr.responseText, (jqXhr.getAllResponseHeaders() || {}));
                            if (params.transformResponse) {
                                //responseJSON for IE9 compatibility
                                data = params.transformResponse(
                                    jqXhr.responseText || JSON.stringify(jqXhr.responseJSON));
                            }
                            deferred.resolve(data);
                        })
                            .fail(function (data) {
                                deferred.reject(data);
                            });
                    }

                    return deferred.promise;
                }
            };
        }]);

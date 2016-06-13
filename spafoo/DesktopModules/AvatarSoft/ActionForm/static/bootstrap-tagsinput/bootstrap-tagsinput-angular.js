angular.module('bootstrap-tagsinput', [])
.directive('bootstrapTagsinput', ['$timeout', '$parse', function ($timeout, $parse) {

    //function getItemProperty(scope, property) {
    //    if (!property)
    //        return undefined;

    //    if (angular.isFunction(scope.$parent[property]))
    //        return scope.$parent[property];

    //    return function (item) {
    //        return item[property];
    //    };
    //}

    return {
        restrict: 'A',
        scope: {
            model: '=ngModel',
            suggestions: '=suggestions',
            maxTags: '@limit'
            //typeaheadSource: '=typeaheadSource'
        },
        //template: '<select multiple></select>',
        //replace: false,
        link: function (scope, element, attrs) {
            $timeout(function () {

                var $ = dnnsfjQuery; // otherwise we'll get window.$
                $(element)
                    .attr('placeholder', 'Type and press enter...')
                    .tagsinput({
                        itemValue: attrs.itemvalue,
                        itemText: attrs.itemtext,
                        maxTags: scope.maxTags
                    });
                $(element).on('itemAdded itemRemoved', function () {
                        if (scope.maxTags && scope.maxTags <= $(element).tagsinput('items').length)
                            $(element).tagsinput('input').hide();
                        else
                            $(element).tagsinput('input').show();
                    });

                //var suggestions = $parse(attrs['suggestions']);
                //console.log(suggestions);
                //console.log(suggestions());

                // Adding custom typeahead support using http://twitter.github.io/typeahead.js
                $(element).tagsinput('input').typeahead({
                    local: []
                }).bind('typeahead:selected', $.proxy(function (obj, datum) {
                    var $ = dnnsfjQuery;
                    $(element).tagsinput('add', { text: datum.value, value: datum.realValue });
                    $(this).typeahead('setQuery', '');
                }, $('input')));

                scope.$watch('suggestions', function () {
                    if (!scope.suggestions)
                        return;

                    var s = [];
                    for (var i = 0; i < scope.suggestions.length; i++)
                        s.push({
                            value: scope.suggestions[i].text ? scope.suggestions[i].text : scope.suggestions[i],
                            realValue: scope.suggestions[i].value ? scope.suggestions[i].value : scope.suggestions[i]
                        });

                    window.dnnsfjQuery(element)
                        .tagsinput('input')
                        .typeahead({ local: s })
                        .blur(function () {
                            var _this = $(this);
                            if (!_this.val().length)
                                return;

                            //console.log('here' + _this.val());

                            $timeout(function () {
                                $.each(scope.suggestions, function (i, s) {
                                    $.each(_this.val().split(','), function (ii, v) {
                                        if (v && s.value == v) {
                                            $(element).tagsinput('add', { text: s.value, value: s.realValue });
                                        }
                                    });
                                });

                                // todo: we changed model from string to object, this will throw error
                                _this.val('');
                            }, 100);
                            
                        })
                    ;
                });

                scope.$watch('model', function () {

                    // todo: we changed model from string to object, this will throw error
                    //window.dnnsfjQuery(element).tagsinput('add', scope.model);
                    var items = $(element).tagsinput('items');
                    $.each(scope.suggestions, function (i, s) {
                        var a = $.isArray(scope.model) ? scope.model : scope.model.split(',');
                        $.each(a, function (ii, v) {
                            if (v && s.value == v) {
                                for (var i = 0; i < items.length; i++) {
                                    if (items[i].value == s.value)
                                        return;
                                }
                                $(element).tagsinput('add', s);
                            }
                        });
                    });
                });

            });


            //$(function () {
            //    if (!angular.isArray(scope.model))
            //        scope.model = [];

            //    var select = $('select', element);

            //    select.tagsinput({
            //        typeahead: {
            //            source: angular.isFunction(scope.$parent[attrs.typeaheadSource]) ? scope.$parent[attrs.typeaheadSource] : null
            //        },
            //        itemValue: getItemProperty(scope, attrs.itemvalue),
            //        itemText: getItemProperty(scope, attrs.itemtext),
            //        tagClass: angular.isFunction(scope.$parent[attrs.tagclass]) ? scope.$parent[attrs.tagclass] : function (item) { return attrs.tagclass; }
            //    });

            //    for (var i = 0; i < scope.model.length; i++) {
            //        select.tagsinput('add', scope.model[i]);
            //    }

            //    select.on('itemAdded', function (event) {
            //        if (scope.model.indexOf(event.item) === -1)
            //            scope.model.push(event.item);
            //    });

            //    select.on('itemRemoved', function (event) {
            //        var idx = scope.model.indexOf(event.item);
            //        if (idx !== -1)
            //            scope.model.splice(idx, 1);
            //    });

            //    // create a shallow copy of model's current state, needed to determine
            //    // diff when model changes
            //    var prev = scope.model.slice();
            //    scope.$watch("model", function () {
            //        var added = scope.model.filter(function (i) { return prev.indexOf(i) === -1; }),
            //            removed = prev.filter(function (i) { return scope.model.indexOf(i) === -1; }),
            //            i;

            //        prev = scope.model.slice();

            //        // Remove tags no longer in binded model
            //        for (i = 0; i < removed.length; i++) {
            //            select.tagsinput('remove', removed[i]);
            //        }

            //        // Refresh remaining tags
            //        select.tagsinput('refresh');

            //        // Add new items in model as tags
            //        for (i = 0; i < added.length; i++) {
            //            select.tagsinput('add', added[i]);
            //        }
            //    }, true);
            //});
        }
    };
}]);
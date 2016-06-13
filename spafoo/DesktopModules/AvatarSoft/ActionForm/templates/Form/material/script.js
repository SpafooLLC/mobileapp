


/*
Masked Input plugin for jQuery
Copyright (c) 2007-2013 Josh Bush (digitalbush.com)
Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
Version: 1.3.1
*/
(function (e) { function t() { var e = document.createElement("input"), t = "onpaste"; return e.setAttribute(t, ""), "function" == typeof e[t] ? "paste" : "input" } var n, a = t() + ".mask", r = navigator.userAgent, i = /iphone/i.test(r), o = /android/i.test(r); e.mask = { definitions: { 9: "[0-9]", a: "[A-Za-z]", "*": "[A-Za-z0-9]" }, dataName: "rawMaskFn", placeholder: "_" }, e.fn.extend({ caret: function (e, t) { var n; if (0 !== this.length && !this.is(":hidden")) return "number" == typeof e ? (t = "number" == typeof t ? t : e, this.each(function () { this.setSelectionRange ? this.setSelectionRange(e, t) : this.createTextRange && (n = this.createTextRange(), n.collapse(!0), n.moveEnd("character", t), n.moveStart("character", e), n.select()) })) : (this[0].setSelectionRange ? (e = this[0].selectionStart, t = this[0].selectionEnd) : document.selection && document.selection.createRange && (n = document.selection.createRange(), e = 0 - n.duplicate().moveStart("character", -1e5), t = e + n.text.length), { begin: e, end: t }) }, unmask: function () { return this.trigger("unmask") }, mask: function (t, r) { var c, l, s, u, f, h; return !t && this.length > 0 ? (c = e(this[0]), c.data(e.mask.dataName)()) : (r = e.extend({ placeholder: e.mask.placeholder, completed: null }, r), l = e.mask.definitions, s = [], u = h = t.length, f = null, e.each(t.split(""), function (e, t) { "?" == t ? (h--, u = e) : l[t] ? (s.push(RegExp(l[t])), null === f && (f = s.length - 1)) : s.push(null) }), this.trigger("unmask").each(function () { function c(e) { for (; h > ++e && !s[e];); return e } function d(e) { for (; --e >= 0 && !s[e];); return e } function m(e, t) { var n, a; if (!(0 > e)) { for (n = e, a = c(t) ; h > n; n++) if (s[n]) { if (!(h > a && s[n].test(R[a]))) break; R[n] = R[a], R[a] = r.placeholder, a = c(a) } b(), x.caret(Math.max(f, e)) } } function p(e) { var t, n, a, i; for (t = e, n = r.placeholder; h > t; t++) if (s[t]) { if (a = c(t), i = R[t], R[t] = n, !(h > a && s[a].test(i))) break; n = i } } function g(e) { var t, n, a, r = e.which; 8 === r || 46 === r || i && 127 === r ? (t = x.caret(), n = t.begin, a = t.end, 0 === a - n && (n = 46 !== r ? d(n) : a = c(n - 1), a = 46 === r ? c(a) : a), k(n, a), m(n, a - 1), e.preventDefault()) : 27 == r && (x.val(S), x.caret(0, y()), e.preventDefault()) } function v(t) { var n, a, i, l = t.which, u = x.caret(); t.ctrlKey || t.altKey || t.metaKey || 32 > l || l && (0 !== u.end - u.begin && (k(u.begin, u.end), m(u.begin, u.end - 1)), n = c(u.begin - 1), h > n && (a = String.fromCharCode(l), s[n].test(a) && (p(n), R[n] = a, b(), i = c(n), o ? setTimeout(e.proxy(e.fn.caret, x, i), 0) : x.caret(i), r.completed && i >= h && r.completed.call(x))), t.preventDefault()) } function k(e, t) { var n; for (n = e; t > n && h > n; n++) s[n] && (R[n] = r.placeholder) } function b() { x.val(R.join("")) } function y(e) { var t, n, a = x.val(), i = -1; for (t = 0, pos = 0; h > t; t++) if (s[t]) { for (R[t] = r.placeholder; pos++ < a.length;) if (n = a.charAt(pos - 1), s[t].test(n)) { R[t] = n, i = t; break } if (pos > a.length) break } else R[t] === a.charAt(pos) && t !== u && (pos++, i = t); return e ? b() : u > i + 1 ? (x.val(""), k(0, h)) : (b(), x.val(x.val().substring(0, i + 1))), u ? t : f } var x = e(this), R = e.map(t.split(""), function (e) { return "?" != e ? l[e] ? r.placeholder : e : void 0 }), S = x.val(); x.data(e.mask.dataName, function () { return e.map(R, function (e, t) { return s[t] && e != r.placeholder ? e : null }).join("") }), x.attr("readonly") || x.one("unmask", function () { x.unbind(".mask").removeData(e.mask.dataName) }).bind("focus.mask", function () { clearTimeout(n); var e; S = x.val(), e = y(), n = setTimeout(function () { b(), e == t.length ? x.caret(0, e) : x.caret(e) }, 10) }).bind("blur.mask", function () { y(), x.val() != S && x.change() }).bind("keydown.mask", g).bind("keypress.mask", v).bind(a, function () { setTimeout(function () { var e = y(!0); x.caret(e), r.completed && e == x.val().length && r.completed.call(x) }, 0) }), y() })) } }) })(dnnsfjQuery);


/* IE Placeholder fix
*/
(function ($) {
    // @todo Document this.
    $.extend($, {
        placeholder: {
            browser_supported: function () {
                return this._supported !== undefined ?
                  this._supported :
                  (this._supported = !!('placeholder' in $('<input type="text">')[0]));
            },
            shim: function (opts) {
                var config = {
                    color: '#888',
                    cls: 'placeholder',
                    selector: 'input[placeholder], textarea[placeholder]'
                };
                $.extend(config, opts);
                return !this.browser_supported() && $(config.selector)._placeholder_shim(config);
            }
        }
    });

    $.extend($.fn, {
        _placeholder_shim: function (config) {
            function calcPositionCss(target) {
                var op = $(target).offsetParent().offset();
                var ot = $(target).offset();

                return {
                    top: ot.top - op.top,
                    left: ot.left - op.left,
                    width: $(target).width()
                };
            }
            function adjustToResizing(label) {
                var $target = label.data('target');
                if (typeof $target !== "undefined") {
                    label.css(calcPositionCss($target));
                    $(window).one("resize", function () { adjustToResizing(label); });
                }
            }
            return this.each(function () {
                var $this = $(this);

                if ($this.is(':visible')) {

                    if ($this.data('placeholder')) {
                        var $ol = $this.data('placeholder');
                        $ol.css(calcPositionCss($this));
                        return true;
                    }

                    var possible_line_height = {};
                    if (!$this.is('textarea') && $this.css('height') != 'auto') {
                        possible_line_height = { lineHeight: $this.css('height'), whiteSpace: 'nowrap' };
                    }

                    var ol = $('<label />')
                      .text($this.attr('placeholder'))
                      .addClass(config.cls)
                      .css($.extend({
                          position: 'absolute',
                          display: 'inline',
                          'float': 'none',
                          overflow: 'hidden',
                          textAlign: 'left',
                          color: config.color,
                          cursor: 'text',
                          paddingTop: $this.css('padding-top'),
                          paddingRight: $this.css('padding-right'),
                          paddingBottom: $this.css('padding-bottom'),
                          paddingLeft: $this.css('padding-left'),
                          fontSize: $this.css('font-size'),
                          fontFamily: $this.css('font-family'),
                          fontStyle: $this.css('font-style'),
                          fontWeight: $this.css('font-weight'),
                          textTransform: $this.css('text-transform'),
                          backgroundColor: 'transparent',
                          zIndex: 99
                      }, possible_line_height))
                      .css(calcPositionCss(this))
                      .attr('for', this.id)
                      .data('target', $this)
                      .click(function () {
                          $(this).data('target').focus();
                      })
                      .insertBefore(this);
                    $this
                      .data('placeholder', ol)
                      .focus(function () {
                          ol.hide();
                      }).blur(function () {
                          ol[$this.val().length ? 'hide' : 'show']();
                      }).triggerHandler('blur');
                    $(window).one("resize", function () { adjustToResizing(ol); });
                }
            });
        }
    });
})(dnnsfjQuery);

dnnsfjQuery(document).add(window).bind('ready load', function () {
    if (dnnsfjQuery.placeholder) {
        dnnsfjQuery.placeholder.shim();
    }
});


/*!
 * jQuery Cookie Plugin v1.4.0
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define(['dnnsfjQuery'], factory);
    } else {
        // Browser globals.
        factory(dnnsfjQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch (e) { }
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }

    var config = $.cookie = function (key, value, options) {

        // Write
        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path ? '; path=' + options.path : '',
				options.domain ? '; domain=' + options.domain : '',
				options.secure ? '; secure' : ''
            ].join(''));
        }

        // Read

        var result = key ? undefined : {};

        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling $.cookie().
        var cookies = document.cookie ? document.cookie.split('; ') : [];

        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');

            if (key && key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }

            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }

        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };

}));

// --------------------------------------------------------------------------------------------------------------------------------
/// Start Action Form template specific code

function ActionFormCtrl($scope, $http, $timeout, $sce, $cookieStore, dataSources, dnnsf) {

    var $ = dnnsfjQuery;
    $scope.dnnsf = dnnsf;
    $scope.$sce = $sce;
    $scope.Math = Math;

    $scope.testTags = [];

    $scope.form = {
        fields: []
    };

    $scope.init = function (data) {

        // append all current query string to the url
        //if (location.search)
        //    url += location.search.trim('?');

        // request the for data from the server
        //$http({
        //    method: 'GET',
        //    url: url,
        //    cache: true
        //}).success(function (data, status) {
        //    $scope.load(data);
        //});

        $scope.load(data);

    };

    $scope.parse = function (val) {
        if ($.isNumeric(val))
            return parseFloat(val);

        // remove comma - this only works for locales that use comma for thousands
        val = val.toString().replace(/,(\d{3})/g, '$1');
        if ($.isNumeric(val))
            return parseFloat(val);

        return val;
    };

    $scope.load = function (data) {

        if (data.error) {
            alert('Error: ' + data.error);
            return;
        }

        // todo: handle errors
        $scope.form = data;
        $scope.$$ = $; // just a hack to bypass angular

        if (data.response) {
            parseFormResponse2($('#' + data.baseId + "root"), undefined, data.response);
        }

        $.each($scope.form.fields, function (k, o) {

            // try to cast type to numbers, otherwise they won't fit in the HTML number field
            //if ($.isNumeric(o.value))
            //    o.value = parseFloat(o.value);

            if (o.onChange) {
                // bind onChange, handle false to remove form-button class which will prevent postback - a bit of a hackish solution until we migrate everything to angular
                o.onChange = eval(
                    '( function(form, item) { ' +
                    '   try { ' +
                    '       var scope = angular.element(\'#' + data.baseId + 'root\').scope(); ' +
                    '       var refresh = function() { if (!scope.$$phase) scope.$apply(); }; ' +
                    '       var r = (function() { ' + o.onChange + ' }).call($(\'#' + o.id + '\')); ' +
                    '       $(\'#' + o.id + '\')[0].preventSubmit = false;' +
                    '       if (o.actionCount == 0 || r === false) { ' +
                    '           $(\'#' + o.id + '\')[0].preventSubmit = true; return false; ' +
                    '       } ' +
                    '   } catch (e) { console.log(\'Error running Action Form on change script\', e); }' +
                    '})');
            }

            if (o.options) {
                // this is a dropdown, initialize ddValue and tbValue
                o.ddValue = o.tbValue = o.value;

                for (var i = 0; i < o.options.length; i++)
                    if (o.options[i].value == o.value) {
                        o.selected = o.options[i]; break;
                    }

                // cast option values to numbers
                //$.each(o.options, function (i, opt) {
                //    if ($.isNumeric(opt.value))
                //        opt.value = parseFloat(opt.value);
                //});

                // if it has "other" option and value doesn't exist in dropdown, switch dd to other
                var other = $.grep(o.options, function (oOpt, iOpt) { return oOpt.filter == 'other'; });
                other = other.length ? other[0] : null;

                if (other && o.value && $.grep(o.options, function (oOpt, iOpt) { return oOpt.value == o.value; }).length == 0)
                    o.ddValue = other.value;
                // if it's a checkbox list, this is also needed
                if (o.type == 'closed-multiple-checkbox' || o.type == 'dropdown-checkboxes') {
                    $scope.concatValues(o);
                    // also, watch for changes

                    $scope.$watch('form.fields.' + o.name + '.value', function () {
                        var selItems = o.value.split(',');

                        $.each(o.options, function (k, oItem) {
                            oItem.selected = $.inArray(oItem.value, selItems) != -1;
                        });
                    });

                    o.checkAll = function () {
                        $.each(o.options, function (k, oItem) {
                            oItem.selected = true;
                        });
                    };

                    o.uncheckAll = function () {
                        $.each(o.options, function (k, oItem) {
                            oItem.selected = false;
                        });
                    };
                } else {
                    $scope.$watch('form.fields.' + o.name + '.value', function (newValue, oldValue) {
                        // this allows setting the value of dropdown directly in the model
                        // but watch out if we have multiple entries with same value filtered away
                        var fnFilter = o.linkedTo ? $scope.fnFactoryFilterByField(o.name, o.linkedTo) : function () { return true; };
                        for (var i = 0; i < o.options.length; i++)
                            if (fnFilter(o.options[i]) && o.options[i].value == newValue) {
                                o.selected = o.options[i]; break;
                            }
                    });
                }

                // also group options by filters for easy iteration
                if (o.options.length) {

                    // this is used by the permission grid
                    o.optionsFilters = []; // the object below loses order, so we're going to use this one for iterations
                    //o.optionsByFilterPath = {};
                    $.each(o.options, function (ii, oo) {
                        if ($.inArray(oo.filter, o.optionsFilters) == -1)
                            o.optionsFilters.push(oo.filter);
                        //o.optionsByFilterPath[(oo.filter || '') + '/' + oo.value] = oo;
                    });

                    o.optionsNames = [];// the object below loses order, so we're going to use this one for iterations
                    o.optionsByName = {};
                    $.each(o.options, function (ii, oo) {
                        if (!o.optionsByName[oo.text]) {
                            o.optionsNames.push(oo.text);
                            o.optionsByName[oo.text] = [];
                        }
                        o.optionsByName[oo.text].push(oo);
                    });
                }

            }
        });

        // done intializing fields, call on load handler if any
        if ($scope.form.onLoad) {
            eval('( function(form) { try { ' + $scope.form.onLoad + '; } catch (e) { console.log(\'Error running Action Form on load script\', e); } } )').call($scope, $scope.form);
        }

        if ($scope.form.SaveInCookie) {
            var saveInCookiesTimer;
            function saveInCookies() {
                $timeout.cancel(saveInCookiesTimer);
                saveInCookiesTimer = $timeout(function () {
                    var saveData = {};
                    $.each($scope.form.fields, function (k, o) {
                        if (o.hasValue)
                            saveData[k] = o.value;
                    });

                    $http({
                        method: 'POST',
                        url: $scope.form.submitUrl + "&event=autosave&submission=" + ($scope.form.submissionKey || ''),
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: $.param(saveData)
                    }).success(function (data, status) {
                        $cookieStore.put($scope.form.SaveInCookie, data.submissionKey, { path: '/', expires: 365 });
                    });

                }, 500);
            }

            $scope.$watch('form.fields', saveInCookies, true);
        }
    };

    var _find = function (v, callback) {
        var n = v.length;
        for (var i = 0; i < n; i++){
            if (callback(v[i]))
                return v[i];
        };
        return undefined;
    };

    $scope.fnFactoryFilterByField = function (thisFieldName, filterByFieldName) {

        return function (o) {

            var thisField = $scope.form.fields[thisFieldName];
            var filterByField = $scope.form.fields[filterByFieldName];

            // if field has no value, it means it's the default option
            if (!filterByField.value) {
                thisField.value = thisField.ddValue = thisField.tbValue = '';
                thisField.selected = null;
                return false;
            }

            // validate that the parent item is actually visible and not filtered away by it's linked to parent
            var parentItem = filterByField.selected;
            if (parentItem == null)
                return false;

            if ((thisField.selected && thisField.selected.filter != 'other' && '/' + thisField.selected.filter != parentItem.path && thisField.selected.filter != parentItem.value.toString().replace('/', '\\/')) || (parentItem.filter && filterByField.linkedTo && $scope.form.fields[filterByField.linkedTo].selected.path != "/" + parentItem.filter && $scope.form.fields[filterByField.linkedTo].selected.value.toString().replace('/', '\\/') != parentItem.filter)) {
                var sameText = _find(thisField.options, function(o2){
                    return (thisField.selected.text == o2.text) && (o2.filter == parentItem.path || o2.filter == parentItem.value.toString().replace('/', '\\/'));
                });
                if (sameText) {
                    thisField.selected = sameText;
                }
                else{
                    thisField.value = thisField.ddValue = thisField.tbValue = '';
                    thisField.selected = null;
                    return false;
                };
            }


            //if (!parentItem.selected) {
            //    thisField.value = '';
            //    return false;
            //}

            var parentFilter = parentItem.value;
            if (parentItem.filter)
                parentFilter = parentItem.filter + '/' + parentFilter.toString().replace('/', '\\/');
            return o.filter == 'other' || o.filter == parentFilter || o.filter === parentItem.value.toString().replace('/', '\\/');
        };
    };

    $scope.concatValues = function (ctl) {
        if (!ctl.options)
            return; // don't know what this is

        var vals = [];
        var texts = [];
        $.each(ctl.options, function (k, o) {
            if (o.selected) {
                vals.push(o.value);
                texts.push(o.text);
            }
        });
        ctl.value = vals.join(',');
        ctl.text = texts.join(', ');
    };

    // holds a list of region fields bound to each country
    $scope.countries = {};

    $scope.wireRegion = function (regionField, countryField) {
        if (!$scope.countries[countryField])
            $scope.countries[countryField] = { regionFields: [] };
        $scope.countries[countryField].regionFields.push(regionField);
        $scope.loadRegions(countryField, function () {

            // select current region by code or by name
            var val = $scope.form.fields[regionField].value;
            var regions = $scope.countries[countryField].regions;
            if (regions.length) {
                for (var i = 0; i < regions.length; i++)
                    if (regions[i].value == val) {
                        //$scope.form.fields[regionField].selected = regions[i];
                        return; 
                    }

                // check by text
                for (var i = 0; i < regions.length; i++)
                    if (regions[i].text == val) {
                        $scope.form.fields[regionField].ddValue = regions[i].value;
                        //$scope.form.fields[regionField].selected = regions[i];
                        return;
                    }
            }
        });
    }

    $scope.loadRegions = function (countryField, fnDone) {

        dnnsf.log('loadRegions', countryField, $scope.countries[countryField], $scope.form.fields[countryField]);
        // check if we actually have regions mapped to this country
        //if (!$scope.countries[countryField] || !$scope.form.fields[countryField])
        //    return;

        $scope.$watch('form.fields.' + countryField, function () {

            if (!$scope.countries[countryField] || !$scope.form.fields[countryField])
                return;

            $scope.countries[countryField].loading = true;
            dataSources.get({
                'DataSource': 'Regions',
                'ListId': $scope.form.fields[countryField].value,
                'JsonLowercaseNames': true
            }, function (data) {
                $scope.countries[countryField].loading = false;
                $scope.countries[countryField].regions = data;

                if ($scope.countries[countryField].regions.length) {
                    // reset all textboxes values
                    $.each($scope.countries[countryField].regionFields, function (i, o) {
                        if ($scope.form.fields[o])
                            $scope.form.fields[o].tbValue = "";
                    });
                } else {
                    // reset all dropdown values
                    $.each($scope.countries[countryField].regionFields, function (i, o) {
                        if ($scope.form.fields[o])
                            $scope.form.fields[o].ddValue = "";
                    });
                }
                fnDone && fnDone();
            });
        }, true);

    };


}

function initForm(formRoot, options, localization) {
    var $ = dnnsfjQuery;
    formRoot = $(formRoot);
    formRoot[0].onFormSubmit = formRoot[0].onFormSubmit || [];

    // check either the form has already been initialized. This could happen for example when the module is moved to a different pane,
    // and the browsers will execute the js again
    if (!formRoot.length || formRoot[0].initialized)
        return;

    formRoot[0].initialized = true;

    // init common features
    dnnsf.init($, options);

    var app = angular.module('ActionForm' + formRoot.attr('id'), ['ngAnimate', 'siyfion.sfTypeahead', 'bootstrap-tagsinput', 'ngSanitize', 'dnnsf']);

    app.factory('dataSources', ['$http', 'dnnsf', function ($http, dnnsf) {
        return {
            get: function (settings, fnReady) {
                var p = $.extend({}, settings, { Method: 'GetData', tabId: options.tabId, mid: options.moduleId, alias: options.alias });
                $http({
                    method: 'GET',
                    url: options.apiUrl + '?' + $.param(p),
                    cache: true
                }).success(function (data, status) {
                    fnReady && fnReady(data);
                });
            }
        };
    }]);

    // the default cookieStore does not support path or expiration
    app.provider('$cookieStore', [function () {
        var self = this;
        self.defaultOptions = {};

        self.setDefaultOptions = function (options) {
            self.defaultOptions = options;
        };

        self.$get = function () {
            return {
                get: function (name) {
                    var jsonCookie = $.cookie(name);
                    if (jsonCookie) {
                        return angular.fromJson(jsonCookie);
                    }
                },
                put: function (name, value, options) {
                    options = $.extend({}, self.defaultOptions, options);
                    $.cookie(name, angular.toJson(value), options);
                },
                remove: function (name, options) {
                    options = $.extend({}, self.defaultOptions, options);
                    $.removeCookie(name, options);
                }
            };
        };
    }]);

    // wrapper for masked input
    app.directive('inputMask', function () {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {

                // on android, there seems to be some problems with the mask plugin
                // http://stackoverflow.com/questions/19886593/jquery-mask-input-plugin-on-android-samsung-galaxy-the-keycode-returned-is-al
                if (navigator.userAgent.match(/Android/))
                    return;

                $(el).mask(attrs.inputMask);
                $(el).on('change', function () {
                    scope.$eval(attrs.ngModel + "='" + el.val() + "'");
                    scope.$apply();
                });
            }
        };
    });

    // wrapper for masked input
    app.directive('onblur', function () {
        return {
            restrict: 'A',
            scope: {
                onblur: '&'
            },
            link: function (scope, el, attrs) {
                $(el).parents('.element-area:first').click(function (e) {
                    e.stopPropagation();
                });
                $(document).click(function () {
                    scope.onblur();
                    scope.$apply();
                });
            }
        };
    });

    // DOM wathcher
    app.directive('domWatch', function () {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {

                $(el).on(attrs.domWatch, function () {
                    scope.$eval(attrs.ngModel + "='" + el.val() + "'");
                    scope.$apply();
                });
            }
        };
    });

    // this directive knows to bind a value to a html control, but only when this value exists
    app.directive('afBindvalue', ['$compile', '$timeout', '$parse', function ($compile, $timeout, $parse) {
        return {
            restrict: 'A',
            scope: false,
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {

                var options = null;
                if (attrs.afBindfrom)
                    options = scope.$eval(attrs.afBindfrom);
                //console.log(attrs.afBindvaluefrom);
                //console.log(options);

                // if it's not an input element, define a new render function
                if (element.filter(':input').length == 0) {
                    ngModel.$render = function () {

                        if (!ngModel.$viewValue)
                            return;

                        element.html(ngModel.$viewValue || '');
                    };
                }

                scope.$watch(attrs.afBindvalue, function (value) {

                    if (!scope.form.fields || !scope.form.fields[attrs.afField])
                        return;

                    var field = scope.form.fields[attrs.afField];
                    if (field.touched)
                        return;

                    if (attrs.afBindfrom) {
                        var options = scope.$eval(attrs.afBindfrom);
                        if (!options)
                            return;
                        var optionsFound = $.grep(options, function (o) { return o.value === value });
                        if (optionsFound.length > 0) {
                            ngModel.$setViewValue(optionsFound[0]);
                        };
                    }
                    else {
                        ngModel.$setViewValue(value);
                    }
                    ngModel.$render();
                });
            }
        };
    }]);

    // initialize rich edits
    app.directive('afRichedit', ['$compile', '$timeout', '$parse', function ($compile, $timeout, $parse) {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ngModel) {
                var fnInitRichEdit = function () {

                    if (!$(elm).is(':visible')) {
                        $timeout(fnInitRichEdit, 200);
                        return;
                    }

                    $(elm).wysiwyg({
                        autoGrow: false,
                        maxHeight: 600,
                        initialMinHeight: 50,
                        initialContent: '',
                        brIE: false,
                        replaceDivWithP: true,
                        events: {
                            save: function () {
                                try {
                                    ngModel.$setViewValue(this.getContent());
                                } catch (e) {
                                }
                            }
                        }
                    });

                    // localize wysiwyg
                    $('.wysiwyg [role="menuitem"]').each(function () {
                        var l = localization['wysiwyg.' + $(this).attr('class')];
                        l && $(this).attr('title', l);
                    });


                    ngModel.$render = function () {
                        $(elm).wysiwyg('setContent', ngModel.$viewValue || '');
                    };
                };

                $timeout(fnInitRichEdit, 100);

            }
        };
    }]);

    // dnnsfAngularLock is just a quick hack to skip angualr initialization in some situations
    !window.dnnsfAngularLock && angular.bootstrap(formRoot, ['ActionForm' + formRoot.attr('id')]);

    // --------------------------------------------------------------------------------------------------------------------------------
    // Start jquery plugin intitialization
    $.fn.popover && formRoot.find('span.popupOnHover').popover({ trigger: 'hover' });

    // setup validation plugin
    formRoot.validate && formRoot.validate({
        errorElement: 'span',
        errorClass: 'text-danger',
        highlight: function (element, errorClass) {
            $(element).parents('.field-container:first').addClass('has-error');
        },
        unhighlight: function (element, errorClass) {
            $(element).parents('.field-container:first').removeClass('has-error')
                .find('.text-danger').hide();
        },
        errorPlacement: function (error, element) {
            var errPlace = element.find('.err-placeholder');
            if (!errPlace.size())
                errPlace = element.closest('.field-container').find('.err-placeholder');

            if (errPlace.size()) {
                errPlace.append(error);
            } else {
                if (element.is(':checkbox') || element.is(':radio')) {
                    element.parent().append(error);
                } else {
                    error.insertAfter(element.filter(':visible'));
                }
            }

        },
        ignore: '.ignore,:hidden,:disabled'
    });

    // validate required upload files
    $.validator && $.validator.addMethod("required-file", function (value, element) {
        return $(element).hasClass('has-file');
    });

    // validate required upload files
    $.validator && $.validator.addMethod("required-fromclass", function (value, element) {
        return $(element).hasClass('afvalid');
    });

    $.validator && $.validator.addMethod("required-cblist", function (value, element) {
        var group = $(element).attr('data-validation-group');
        var valid = false;
        $('[data-validation-group="' + group + '"]').each(function () {
            if (this.checked)
                valid = true;
        })
        return valid;
    });

    // initialize password confirm
    formRoot.find('[data-password-confirm]').each(function () {
        $(this).rules("add", {
            equalTo: '#' + $(this).attr('data-password-confirm'),
            messages: {
                equalTo: localization['validation.passwordNoMatch']
            }
        });
    });

    // fix width when printing
    if (formRoot.closest('#Table1')) {
        formRoot.closest('#Table1').addClass('container')
        .parent().addClass('bstrap30');
    }

    function parseVar(strVar) {
        if (!isNaN(parseInt(strVar)))
            return parseInt(strVar);

        if (!isNaN(parseFloat(strVar)))
            return parseFloat(strVar);

        if (strVar[0] == '[') {
            // looks like an array
            return eval(strVar.replace('\n', ''));
        }

        if (strVar == "false")
            return false;

        if (strVar == "true")
            return true;

        // just return it as string
        return strVar;
    }


    // load localized error messages
    for (var key in localization) {
        if (key.indexOf('validation.') == 0) {
            var relKey = key.substr('validation.'.length);
            if ($.validator)
                $.validator.messages[relKey] = localization[key].indexOf('{0}') == -1 ? localization[key] : $.validator.format(localization[key]);
        } else if (key.indexOf('jquery.datepicker.') == 0 && $.datepicker) {
            var relKey = key.substr('jquery.datepicker.'.length);
            var s = {};
            s[relKey] = parseVar(localization[key]);
            $.datepicker.setDefaults(s);
        }
    }

    //// load strings from the server
    //$.getJSON(formRoot.attr("")

    // fix for datepicker, onchange does not trigger validation, so call onkeyup manually
    formRoot.find('.datepicker').change(function () {
        $(this).keyup();
    });

    setInterval(function() {
        // make sure modals are visible
        $('.modal:visible').each(function () {
            var popup = $(this);
            popup.find('.modal-dialog:first').css('z-index', popup.find('.modal-backdrop:first').css('z-index') + 1);
            popup.after(popup.find('.modal-dialog:first').siblings('.modal-backdrop'));
        });
    }, 100);

    //// initialize input masks
    //formRoot.find('[data-mask]').each(function () {
    //    $(this).mask($(this).attr('data-mask'));
    //});


    // support for IE7&8
    dnnsfModernizr.load({
        test: dnnsfModernizr.mq('only all'),
        nope: options.appUrl + '/static/respond.js'
    });

    // intialize date pickers
    formRoot.find(".datepicker").each(function () {
        var opts = {
            dateFormat: $(this).attr('data-dateformat'),
            changeMonth: $(this).attr('data-changemonth') == 'true',
            changeYear: $(this).attr('data-changeyear') == 'true',
            //Fix of IE
            fixFocusIE: false,
            onSelect: function (dateText, inst) {
                this.fixFocusIE = true;
                $(this).blur().change().focus();
            },
            onClose: function (dateText, inst) {
                this.fixFocusIE = true;
                this.focus();
            },
            beforeShow: function (input, inst) {
                var result = bowser.msie ? !this.fixFocusIE : true;
                this.fixFocusIE = false;
                return result;
            }
        };

        if ($(this).attr('data-yearrange'))
            opts["yearRange"] = $(this).attr('data-yearrange');


        // merge other options
        if ($(this).attr('data-opts')) {
            opts = $.extend(opts, eval('(' + $(this).attr('data-opts') + ')'));
        }

        $(this).datepicker(opts);
        var theme = $(this).attr('data-theme');
        $('#ui-datepicker-div').each(function () {
            if ($(this).parent("." + theme).size() == 0)
                $(this).wrap('<div class="' + theme + '"></div>');
        });
    });

    //colorpicker to .colorpickertext class to add colorpicker to text 
    formRoot.find(".colorpickertext").each(function () {
        $(this).ColorPicker({
            onSubmit: function (hsb, hex, rgb, el) {
                $(el).val('#' + hex);
                $(el).ColorPickerHide();
            },
            onBeforeShow: function () {
                $(this).ColorPickerSetColor(this.value);
            }
        });
    });


    // initialize autocomplete
    $('[data-autocomplete]').each(function () {
        $(this).autocomplete({
            paramName: 'query',
            serviceUrl: $(this).attr('data-autocomplete'),
            transformResult: function (response) {
                return {
                    suggestions: $.map($.parseJSON(response), function (dataItem) {
                        return { value: dataItem.Text, data: dataItem.Value };
                    })
                };
            },
            onSelect: function (suggestion) {
                angular.element(formRoot).scope().form.fields[$(this).attr('data-af-field')].value = suggestion.value;
                angular.element(formRoot).scope().form.fields[$(this).attr('data-af-field')].data = suggestion.data;
                angular.element(formRoot).scope().$apply();
            }
        });
    });

    // init file upload
    formRoot.find('.file-upload').each(function () {
        this["aform"] = formRoot;
    });

    yepnope({
        test: window.aform_incFileUplad,
        yep: [
            options.appUrl + '/templates/Form/bootstrap/fileupload/js/vendor/jquery.ui.widget.js',
            options.appUrl + '/templates/Form/bootstrap/fileupload/js/jquery.iframe-transport.js',
            options.appUrl + '/templates/Form/bootstrap/fileupload/js/jquery.fileupload.js'
        ],
        complete: function () {

            if (!$().fileupload)
                return;

            $('.file-upload').each(function () {

                if (!this.aform)
                    return; // not one of our fields

                var $root = $(this).parents('.fileupload-root:first');

                // redefined formRoot in this context
                var formRoot = this.aform;
                var _this = $(this);
                $root.find('.files').empty().append($('<p/>').text(angular.element(formRoot).scope().form.fields[_this.attr('data-af-field')].value));

                $(this).fileupload({
                    url: $(this).attr('data-uploadurl'),
                    dataType: 'json',
                    //autoUpload: false,
                    add: function (e, data) {
                        //if (data.autoUpload || (data.autoUpload !== false &&
                        //        $(this).fileupload('option', 'autoUpload'))) {
                        //    data.process().done(function () {
                        //        data.submit();
                        //    });
                        //}
                        this.upldata = data;
                        $.each(data.files, function (index, file) {
                            if (_this.attr('data-ext')) {
                                var ext = _this.attr('data-ext').toLowerCase().split(',');
                                data.validext = false;
                                var x;
                                for (x in ext)
                                    if (file.name.split('.').pop().toLowerCase() == ext[x]) {
                                        data.validext = true;
                                    }
                                if (!data.validext) {
                                    $root.find('.files').empty().append($('<p/>').text('File type not allowed'));
                                    $root.find('.files').show();
                                    $root.find('.files').css("color", "red");
                                    return;
                                }
                            }
                            else data.validext = true;
                            var fext = file.name.split('.').pop().toLowerCase();
                            if (false && (fext == 'jpg' || fext == 'png')){
                                var reader = new FileReader();
                                reader.onload = function (e) {
                                    $root.find('.files').empty().append($('<span class="glyphicon glyphicon-trash"></span><img width="180" />'));
                                    $root.find('.files img').attr('src', e.target.result);
                                    $root.find('.files span').click(function(){
                                        data.files[index] = undefined;
                                    });
                                }
                                reader.readAsDataURL(file);
                                //console.log('poza');
                            }
                            else{
                                //console.log('altceva');
                                $root.find('.files').css("color", "black");
                                $root.find('.files').empty().append($('<p/>').text(file.name));
                                $root.find('.files').show();
                                $root.find('.file-upload').addClass('has-file').valid();
                            }
                            //$root.find('.relative-url').text(file.relativeurl);
                            if (_this.attr('data-limit') != null) {
                                data.validlimit = true;
                                if (file.size >= parseFloat(_this.attr('data-limit')) * 1048576)
                                    data.validlimit = false;
                                if (!data.validlimit) {
                                    $root.find('.files').empty().append($('<p/>').text(localization['validation.invalidfilesize']));
                                    $root.find('.files').show();
                                    $root.find('.files').css("color", "red");
                                    return;
                                }
                            }
                            else data.validext = true;
                            //$root.find('.files').css("color", "black");
                            //$root.find('.files').empty().append($('<p/>').text(file.name));
                            //$root.find('.files').show();
                            //$root.find('.file-upload').addClass('has-file').valid();

                        });
                    },
                    done: function (e, data) {
                        $.each(data.result, function (index, file) {
                            $root.find('.files').empty().append($('<p/>').text(file.name));
                            //$root.find('.relative-url').text(file.relativeurl);
                            angular.element(formRoot).scope().form.fields[_this.attr('data-af-field')].value = file.relativeurl;
                            angular.element(formRoot).scope().$apply();
                        });
                        $root.find('.progress').fadeOut('fast', function () {
                            $root.find('.files').show();
                        });
                        formRoot[0].toUpload--;

                        if (formRoot[0].toUpload == 0)
                            formRoot[0].submitData(formRoot[0].$btn);
                    },
                    progressall: function (e, data) {
                        $root.find('.files').hide();
                        $root.find('.progress').fadeIn('fast');
                        var progress = parseInt(data.loaded / data.total * 100, 10);
                        $root.find('.progress .progress-bar').css(
                            'width',
                            progress + '%'
                        );
                    }
                });


                // hack for DNN 7 to leave our upload field alone
                var btn = $root.find('.fileinput-button');
                if (btn.find('.dnnInputFileWrapper').size() > 0) {
                    btn.find('input').appendTo(btn);
                    btn.find('.dnnInputFileWrapper').remove();
                } else {
                    if (btn.find('input')[0])
                        btn.find('input')[0].wrapper = 'hack';
                }

            })
        }
    });

    // once is enough
    window.aform_incFileUplad = false;

    formRoot.find('input:text,input:password').keydown(function (evt) {
        if (evt.keyCode == 13) {
            formRoot.find('.submit[data-default-button=on]:first').click();
            evt.preventDefault();
        }
    });

    // reset buttons, sometimes firefox leaves them disabled after refresh
    try { formRoot.find('.button').button('reset'); } catch (e) { }

    formRoot.on('click', ".form-button", function () {

        if (this.preventSubmit)
            return;

        // reset
        formRoot.find(".server-error").html("").hide();

        var causesValidation = $(this).attr('data-validation') == 'on';

        var fieldsToValidate = formRoot.find('input,textarea,select,.checkbox-list').not(':hidden,:disabled,.ignore');
        if (causesValidation && fieldsToValidate.size() && !fieldsToValidate.valid()) {
            formRoot.find('.has-error:first').find('input,textarea,select').focus();
            return false;
        }

        // check if we need to start uploads
        formRoot[0].toUpload = 0;
        formRoot[0].$btn = $(this);
        formRoot.find('.file-upload').each(function () {

            $(this).fileupload("option", "formData", getFormData(formRoot));

            var data = this.upldata;
            if (data && data.validext && data.validlimit) {
                formRoot[0].toUpload++;
                data.process().done(function () {
                    data.submit();
                });
            }
        });

        formRoot.find('.delay-submit').each(function () {
            formRoot[0].toUpload++;
        });

        var $btn = $(this);
        try { $btn.hasClass('af-btn-loading') && $btn.button('loading'); } catch (e) { }
        formRoot.find('.submit').not($btn).attr('disabled', 'disabled');
        formRoot.find('.submit-progress').css('visibility', 'visible').stop(true, true).fadeIn();

        if (formRoot[0].onFormSubmit)
            for (var i in formRoot[0].onFormSubmit)
                formRoot[0].onFormSubmit[i]($btn);

        if (!formRoot[0].toUpload)
            formRoot[0].submitData($btn);

        return false;
    });

    function getFormData(formRoot) {
        var data = {};
        formRoot.find(':input,[data-val],.value-node').each(function () {
            //formRoot.find('input').filter(':text,:password,:hidden').add(formRoot.find("select,textarea")).each(function () {
            if (!$(this).attr("name") || !$(this).closest('.ng-hide'))
                return;

            // initialize to empty
            var name = $(this).attr("name").replace(/dnn\d+/, "");
            if (!data[name])
                data[name] = '';

            // for radios, only set if selected
            if ($(this).attr('type') == 'radio') {
                if (this.checked)
                    data[name] = $(this).val();
            } else if ($(this).attr('data-val') || $(this).attr('data-val') === '') {
                data[name] = $(this).attr('data-val');
            }
            else if ($(this).hasClass('value-node')) {
                data[name] = $(this).html();
            } else {
                data[name] = $(this).val();
            }

        });

        formRoot.find('.fileupload-root:visible').each(function () {
            data[$(this).find('input').attr("name").replace(/dnn\d+/, "")] = $(this).find('.relative-url').text();
        });

        formRoot.find(":checkbox:visible").each(function () {
            if (!$(this).attr("name"))
                return;
            var name = $(this).attr("name").replace(/dnn\d+/, "");
            if (name.indexOf('-') > 0) {
                // this is a checkbox list
                name = name.substr(0, name.indexOf('-'));
                if (!data[name])
                    data[name] = '';

                if ($(this).is(':checked'))
                    data[name] += (data[name].length ? ',' : '') + $(this).val();

            } else {
                data[name] = $(this).is(':checked') ? 'True' : 'False';
            }
        });
        formRoot.find(":radio:checked:visible").each(function () {
            data[$(this).attr("name").replace(/dnn\d+/, "")] = $(this).val();
        });

        formRoot.find(".itemwithqty input:visible").each(function () {
            data[$(this).attr("name").replace(/dnn\d+/, "")] = $('#' + $(this).attr("id") + 'Qty').val() + ' ' + $(this).val();
        });

        formRoot.find('iframe').each(function () {
            if (this.contentWindow.getContent)
                data[$(this).attr("name").replace(/dnn\d+/, "")] = this.contentWindow.getContent();
        });

        return data;
    }

    formRoot[0].submitData = function ($btn) {

        if (formRoot[0].submitting)
            return;

        var data = getFormData(formRoot);

        //formRoot.find('.cancel').hide();
        formRoot[0].submitting = true;
        $.ajax({
            url: $btn.attr("data-submiturl") + '&referrer=' + encodeURIComponent(document.referrer) + '&_url=' + encodeURIComponent(document.URL),
            type: "post",
            data: data,
            dataType: "json"
        }).done(function (data) {
            formRoot[0].submitting = false;
            parseFormResponse2(formRoot, $btn, data);
        });

    };
}


function parseFormResponse2(formRoot, $btn, data) {

    //var someIframe = window.parent.document.getElementById('iframe_callback');
    //someIframe.parentNode.removeChild(window);
    //window.parent.closeIframe(window.frameElement);
    //window.top.dnnsfjQuery(window.frameElement).closest('.modal').modal('hide');
    //return;
    var $ = dnnsfjQuery;

    function resetButton(formRoot, $btn) {
        if ($btn) {
            try { $btn.button('reset'); } catch (e) { }
            formRoot.find('.submit').not($btn).removeAttr('disabled');
        }
        formRoot.find('.submit-progress').stop(true, true).fadeOut(function () {
            $(this).css('visibility', 'hidden');
        });
    }

    parseFormResponse(data, {
        executeJsFunction: function (fnName) {
            window.parent[fnName](window.frameElement);
        },
        error: function (err) {
            formRoot.find(".server-error").html(data.error).show();
            resetButton(formRoot, $btn);
        },
        redirect: function (url) {
            if (!data.popup && !data.newTab) {
                window.location = url;
                if (url.indexOf('#') == 0) {
                    setTimeout(function () {
                        resetButton(formRoot, $btn);
                    }, 500);
                }
                return;
            }

            // handle new tab
            if (data.newTab) {
                window.open(url, '_blank');
                setTimeout(function () {
                    resetButton(formRoot, $btn);
                }, 500);
                return;
            }

            // open popup
            var popup = $('<div class="af-modal modal fade">' +
                              '<div class="modal-dialog modal-lg">' +
                                '<div class="modal-content">' +
                                  '<div class="modal-header">' +
                                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                                    '<h4 class="modal-title">' + data.popupTitle + '</h4>' +
                                  '</div>' +
                                  '<div class="modal-body">' +
                                    '<iframe width="100%" src="' + url + '" frameborder="0" scrolling="yes"></iframe>' +
                                  '</div>' +
                                '</div><!-- /.modal-content -->' +
                              '</div><!-- /.modal-dialog -->' +
                            '</div><!-- /.modal -->').appendTo('body');
            console.log(popup.modal);
            popup.modal({
                backdrop: true
            });

            setInterval(function () {
                var iframe = $('.af-modal:visible').find('iframe');

                try {
                    var bodyHeight = $(iframe[0].contentDocument.body).height();
                    if (bodyHeight != __prevHeight) {
                        __prevHeight = bodyHeight;
                        iframe.height(Math.max(200, bodyHeight));
                    }
                } catch (e) {
                    iframe.height(window.innerHeight - 240);
                }
            }, 200);

            setTimeout(function () {
                resetButton(formRoot, $btn);
            }, 500);
        },

        message: function (msg, type) {
            if (!type || type == 'success') {
                formRoot.find(".c-form").slideUp();
                formRoot.find(".submit-confirm2").hide();
                $('html, body').animate({
                    scrollTop: formRoot.offset().top - 200
                }, 500);
            }
            formRoot.find(".submit-confirm").html(msg).show();

            resetButton(formRoot, $btn);
        },
        appendHtml: function (appendHtml, appendTo, reset) {
            $(appendTo).append(appendHtml);
            reset && resetButton(formRoot, $btn);
        },
        data: function (data) {
            angular.element(formRoot).scope().load(data);
            angular.element(formRoot).scope().$apply();
            resetButton(formRoot, $btn);
        }
    });
}

function parseFormResponse(data, handlers) {

    var $ = dnnsfjQuery;

    // initialize with default handlers, unless provieded by caller
    handlers = $.extend({
        keepOnPage: function (url) {
            window.location.reload(true);
        },
        redirect: function (url) {
            window.location = url;
        },
        appendHtml: function (appendHtml, appendTo) {
            $(appendTo).append(appendHtml);
        },
        error: function (err) { },
        message: function (msg, type) { },
        data: function (msg, type) { }
    }, handlers);

    // parse response and call handlers
    if (data.functionName) {
        handlers.executeJsFunction && handlers.executeJsFunction(data.functionName);
    } else if (data.error) {
        handlers.error && handlers.error(data.error);
    } else if (data.messageHtml) {
        handlers.message && handlers.message(data.messageHtml, data.type);
    } else if (data.keepOnPage) {
        handlers.keepOnPage && handlers.keepOnPage(data.redirect);
    } else if (data.redirect) {
        handlers.redirect && handlers.redirect(data.redirect);
    } else if (data.appendHtml) {
        handlers.appendHtml && handlers.appendHtml(data.appendHtml, data.appendTo, data.reset);
    } else if (data.data) {
        handlers.data && handlers.data(data.data);
    }
}


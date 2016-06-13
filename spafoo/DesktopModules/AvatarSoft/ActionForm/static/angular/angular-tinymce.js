/**
 * Binds a TinyMCE widget to <textarea> elements.
 */
angular.module('ui.tinymce', [])
  .value('uiTinymceConfig', {})
  .directive('uiTinymce', ['uiTinymceConfig', '$timeout', function (uiTinymceConfig, $timeout) {
      uiTinymceConfig = uiTinymceConfig || {};
      var generatedIds = 0;
      return {
          require: 'ngModel',
          scope: {
              model: '=ngModel'
          },
          link: function (scope, elm, attrs, ngModel) {
              var expression, options, tinyInstance;
              // generate an ID if not present
              if (!attrs.id) {
                  attrs.$set('id', 'uiTinymce' + generatedIds++);
              }
              options = {
                  mode: "exact",
                  convert_urls: false,

                  // Update model on button click
                  onchange_callback: function (inst) {
                      if (inst.isDirty() && !scope.manualUpdate) {
                          inst.save();
                          ngModel.$setViewValue(elm.val());
                          if (!scope.$$phase) {
                              scope.$apply();
                          }
                      }
                  },
                  // Update model on keypress
                  handle_event_callback: function (e) {
                      if (this.isDirty()) {
                          this.save();
                          ngModel.$setViewValue(elm.val());
                          if (!scope.$$phase) {
                              scope.$apply();
                          }
                      }
                      return true; // Continue handling
                  },
                  // Update model when calling setContent (such as from the source editor popup)
                  setup: function (ed) {
                      ed.onInit.add(function (ed) {
                          ngModel.$render();
                      });
                      ed.onSetContent.add(function (ed, o) {
                          if (ed.isDirty()) {
                              ed.save();
                              if (!scope.manualUpdate) {
                                  ngModel.$setViewValue(elm.val());
                                  if (!scope.$$phase) {
                                      scope.$apply();
                                  }
                              }
                          }
                      });
                  },
                  elements: attrs.id
              };
              if (attrs.uiTinymce) {
                  expression = scope.$eval(attrs.uiTinymce);
              } else {
                  expression = {};
              }
              angular.extend(options, uiTinymceConfig, expression);
              setTimeout(function () {
                  tinymce.init(options);
              });


              ngModel.$render = function () {
                  if (!tinyInstance) {
                      tinyInstance = tinymce.get(attrs.id);
                  }
                  if (tinyInstance) {
                      tinyInstance.setContent(ngModel.$viewValue || '');
                  }
              };

              // watch the model
              scope.$watch('model', function () {
                  var inst = tinymce.get(attrs.id);
                  if (inst && scope.model != inst.getContent()) {
                      scope.manualUpdate = true;
                      inst.setContent(scope.model);
                      scope.manualUpdate = false;
                  }
              });

              // resize the tinymce every 2 seconds, since the size is not et properly when element is initially hidden
              var fnRefreshSize = function () {
                  $timeout(function () {
                      var inst = tinymce.get(attrs.id);
                      if (inst && elm.parent().width()) {
                          inst.theme.resizeTo(elm.parent().width(), 200);
                      } 
                      fnRefreshSize();
                  }, 1000);

              };
              fnRefreshSize();

          }
      };
  }]);

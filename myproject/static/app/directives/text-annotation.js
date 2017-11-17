/**
 * Created by crawler on 17/11/2017.
 */
'use strict';
app.directive('textAnnotation', textAnnotation);


function textAnnotation() {
  return {
    restrict: 'E',
    scope: {
      callback: '&'
    },
    link: function (scope, element, attr) {
      var type = attr.type;
      scope.$on('getDataSuccess', function (event, args) {
        $(element).find("#" + type).remove();
        $(element).append("<div id='" + type + "'></div>");
        $(element).find("#" + type).bind("DOMSubtreeModified", function () {
          $(element).find("#" + type).find("g.span").click(function (e) {
            scope.callback({element: type, position: e});
          });
        });

        // Util.embed(type, scope.config, scope.doc, []);
      });
    }
  }
};
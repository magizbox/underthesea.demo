/**
 * Created by crawler on 17/11/2017.
 */
'use strict';
app.directive('textAnnotation', textAnnotation);
function textAnnotation() {
  return {
    restrict: 'E',
    scope: {
      config: '=',
      doc: '=',
      editable: '@',
      multilabel: '@',
      confirm: '@'
    },
    controller: function ($scope, $element, $uibModal) {
      $scope.openModal = {};
      var id = null;
      if (!id) {
        id = Math.random().toString(36).substring(7);
      }

      var path = $("script[component='text-annotation-script']").attr("src");
      var index = path.indexOf("text-annotation.js");
      var subPath = path.substring(0, index);

      $scope.updateAnnotationModal = function (rectId) {
        $scope.openModal["update"] = true;
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: subPath + 'update-annotation-modal.html',
          controller: 'UpdateAnnotationModalCtrl',
          size: 'lg',
          resolve: {
            data: function () {
              return {
                "rectId": rectId,
                "config": $scope.config,
                "doc": $scope.doc,
                "confirm": $scope.confirm
              };
            }
          }
        });

        modalInstance.result.then(function (data) {
          $scope.openModal["update"] = false;
          var action = data.action;
          var listEntities = $scope.doc.entities;
          var entity = _.find(listEntities, function (item) {
            return item[0] == rectId;
          });

          if (action == 'update') {
            if (data.entity && data.entity.type) {
              var entitySelected = data.entity.type;
              if (entity) {
                entity[1] = entitySelected;
              }
            }
          }
          else if (action == 'delete') {
            var annotation = data.annotation;
            $scope.doc.entities = _.filter(listEntities, function (item) {
              return item[0] != annotation[0];
            });
          }
        }, function () {
          $scope.openModal["update"] = false;
        });
      };

      $scope.newAnnotationModal = function (textSelected, startIndex, endIndex) {
        $scope.openModal["new"] = true;
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: subPath + 'new-annotation-modal.html',
          controller: 'NewAnnotationModalCtrl',
          size: 'lg',
          resolve: {
            data: function () {
              return {
                "config": $scope.config,
                "doc": $scope.doc,
                "textSelected": textSelected,
                "startIndex": startIndex,
                "endIndex": endIndex
              };
            }
          }
        });

        modalInstance.result.then(function (data) {
          var listEntities = $scope.doc.entities;
          var newIdEntities =
            _.chain(listEntities)
              .map(function (item) {
                return Number(item[0].substring(1, item[0].length));
              })
              .max(function (number) {
                return number;
              })
              .value() + 1;
          if (data.entity && data.entity.type) {
            var entity = data.entity.type;
            var newAnnotation = [];
            newAnnotation.push("T" + newIdEntities.toString());
            newAnnotation.push(entity);
            newAnnotation.push([[data.startIndex, data.endIndex]]);

            $scope.doc.entities.push(newAnnotation);
          }
          $scope.openModal["new"] = false;
        }, function () {
          $scope.openModal["new"] = false;
        });
      };

      $scope.$watch('doc', function (newValue, oldValue) {
        if (newValue) {
          var editable = $scope.editable;
          var multilabel = $scope.multilabel;
          var config = $scope.config;
          var doc = $scope.doc;
          $($element).find("#" + id).remove();
          $($element).append("<div id='" + id + "'></div>");
          $($element).find("#" + id).bind("DOMSubtreeModified", function () {

            if (editable == "true") {
              // open update annotation modal
              $($element).find("#" + id).find("g.span").click(function (e) {
                if (!$scope.openModal["update"]) {

                  var rectId = $(this).find("rect").data("span-id");
                  $scope.updateAnnotationModal(rectId);
                }
              });

              // open new annotation modal
              $($element).find("#" + id).find("g.text").on('mouseup', function () {
                if (!$scope.openModal["new"]) {
                  if (window.getSelection) {
                    var sel = window.getSelection();
                    var div = $(this);

                    if (sel.rangeCount) {
                      var range = sel.getRangeAt(0);
                      var textSelected = sel.toString();
                      var precedingRange = document.createRange();
                      precedingRange.setStartBefore(div[0].firstChild);
                      precedingRange.setEnd(range.startContainer, range.startOffset);
                      var textPrecedingSelection = precedingRange.toString();
                      var a = textPrecedingSelection.replace(/\n/g, ' ');
                      var r = a.replace(/^\s+/g, '');
                      var e = r.replace(/\s+$/g, ' ');
                      var startIndex = e.length;
                      var endIndex = e.length + textSelected.length;

                      var listExistEntity = _.filter($scope.doc.entities, function (item) {
                        var indexItem = item[2];
                        var indexItemChild = indexItem[0];
                        return indexItemChild[0] == startIndex && indexItemChild[1] == endIndex;
                      });

                      if (textSelected.trim().length > 0) {
                        if (multilabel == "true" || (multilabel == "false" && listExistEntity.length <= 0)) {
                          $scope.newAnnotationModal(textSelected, startIndex, endIndex);
                        }
                      }
                    }
                  }
                }
              });
            }
          });

          Util.embed(id, config, doc, []);
        }
      }, true);
    }
  }
};
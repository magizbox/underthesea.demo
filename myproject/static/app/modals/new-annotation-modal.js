/**
 * Created by crawler on 23/11/2017.
 */
'use strict';
app.controller('NewAnnotationModalCtrl', function ($scope, $uibModalInstance, data) {
  if (data) {
    $scope.selected = {};
    if (data.textSelected) {
      $scope.selected["text"] = data.textSelected;
    }
    var startIndex = data.startIndex;
    var endIndex = data.endIndex;
    $scope.existAnnotation = _.find(data.doc.entities, function (item) {
      var indexItem = item[2];
      var indexItemChild = indexItem[0];
      return indexItemChild[0] == startIndex && indexItemChild[1] == endIndex;
    });

    $scope.listAnnotation = data.config.entity_types;

    $scope.listAnnotation = _.map($scope.listAnnotation, function (item) {
      var borderColor = Util.adjustColorLightness(item.bgColor, -0.6);
      item["border"] = borderColor;
      return item;
    });
  }

  $scope.selectEntity = function (item) {
    $scope.entitySelected = item;
  };

  $scope.ok = function () {
    $uibModalInstance.close({
      entity: $scope.entitySelected,
      startIndex: data.startIndex,
      endIndex: data.endIndex
    });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss();
  };
});
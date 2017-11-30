/**
 * Created by crawler on 18/11/2017.
 */
'use strict';
app.controller('UpdateAnnotationModalCtrl', function ($scope, $uibModalInstance, data) {
  if (data) {
    $scope.selected = {};
    if (data.rectId) {
      $scope.itemTextSelected = _.find(data.doc.entities, function (item) {
        return item[0] == data.rectId;
      });
      var arr = $scope.itemTextSelected[2];
      var arr2 = arr[0];
      $scope.selected["text"] = data.doc.text.substring(arr2[0], arr2[1]);
      $scope.selected["entity"] = $scope.itemTextSelected[1];
    }

    $scope.listAnnotation = _.map(data.config.entity_types, function (item) {
      var borderColor = Util.adjustColorLightness(item.bgColor, -0.6);
      item["border"] = borderColor;
      return item;
    });
  }

  $scope.selectEntity = function (item) {
    $scope.entitySelected = item;
  };

  $scope.delete = function () {
    var confirmDelete = data.confirm;
    if (confirmDelete == "true") {
      var result = confirm("Do you want to delete this annotation!");
      if (result == true) {
        $uibModalInstance.close({
          entity: $scope.entitySelected,
          annotation: $scope.itemTextSelected,
          action: 'delete'
        });
      }
    }
    else if(confirmDelete == "false") {
      $uibModalInstance.close({
        entity: $scope.entitySelected,
        annotation: $scope.itemTextSelected,
        action: 'delete'
      });
    }

  };

  $scope.ok = function () {
    $uibModalInstance.close({
      entity: $scope.entitySelected,
      annotation: $scope.itemTextSelected,
      action: 'update'
    });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss();
  };
});
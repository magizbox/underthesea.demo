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
      $scope.selected["entity"] =$scope.itemTextSelected[1];
    }

    $scope.listAnnotation = data.config.entity_types;
  }

  $scope.selectEntity = function (item) {
    $scope.entitySelected = item;
  };

  $scope.delete = function () {
    var result = confirm("Do you want to delete this annotation!");
    if (result == true) {
      $uibModalInstance.close({
        entity: $scope.entitySelected,
        annotation: $scope.itemTextSelected,
        action: 'delete'
      });
    } else {

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
/**
 * Created by crawler on 18/11/2017.
 */
'use strict';
app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, entity) {
  if(entity){
    $scope.listAnnotation = entity.entity_types;
  }


  $scope.selectEntity = function (item) {
    console.log(item);
    $scope.entitySelected = item;
  };

  $scope.ok = function () {
    $uibModalInstance.close({entity: $scope.entitySelected});
  };
});
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
      name: '@'
    },
    controller: function ($scope, $element, $uibModal) {
      $scope.openModal = false;
      var id = null;
      if (!id) {
        id = Math.random().toString(36).substring(7);
      }

      $scope.openComponentModal = function () {
        $scope.openModal = true;
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: './static/app/modals/text-annotation-modal.html',
          controller: 'ModalInstanceCtrl',
          size: 'lg',
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          windowTopClass: 'top-modal',
          resolve: {
            entity: function () {
              return $scope.config;
            }
          }
        });

        modalInstance.opened.then(function () {
          $(".modal").css("top", $scope.posY);
          $(".modal").css("left", $scope.posX);
        }, function () {

        });

        modalInstance.result.then(function (data) {
          $scope.openModal = false;
          console.log(data);
        }, function () {
          $scope.openModal = false;
        });
      };

      $scope.$watch('doc', function (newValue, oldValue) {

        if (newValue) {
          var config = $scope.config;
          var doc = $scope.doc;


          $($element).find("#" + id).remove();
          $($element).append("<div id='" + id + "'></div>");
          $($element).find("#" + id).bind("DOMSubtreeModified", function () {
            $($element).find("#" + id).find("g.span").click(function (e) {
              if (!$scope.openModal) {
                $scope.posX = e.pageX;
                $scope.posY = e.pageY + 20;
                $scope.openComponentModal();
              }
            });
          });

          Util.embed(id, config, doc, []);
        }
      }, true);
    }
  }
};